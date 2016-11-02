---

layout: post
category: terminus
title: mapperconfig

---

## introduction  

本公司的通用mapper，功能不详。代码如下：  

{% highlight java %}
@Configuration
public class MapperConfig implements EnvironmentAware {
    private static final Pattern PATTERN_PACKAGE = Pattern.compile("([a-zA-Z\\.]*)\\(([a-zA-Z\\.\\|]*)\\)([a-zA-Z\\.]*)");
    private static final Joiner JOINER_PACKAGE = Joiner.on(",").skipNulls();
    private static final Splitter SPLITTER_COMMA = Splitter.on(",").trimResults().omitEmptyStrings();
    private static final Splitter SPLITTER_VERTICAL = Splitter.on("|").trimResults().omitEmptyStrings();
    private static final String CONFIGURATION_PROPERTY_SOURCES_NAME = "org.springframework.boot.context.config.ConfigFileApplicationListener$ConfigurationPropertySources";
    private String basePackage;
    private Properties properties = new Properties();

    public MapperConfig() {
    }

    @Bean
    @ConditionalOnProperty(
        prefix = "mapper",
        name = {"basePackage"}
    )
    //如果上面的mapper.basePackage属性存在，才会实例化下面的bean
    public MapperScannerConfigurer mapperScannerConfigurer() {
        if(Strings.isNullOrEmpty(this.basePackage)) {
            throw new RuntimeException("property mapper.basePackage is not exists");
        } else {
            MapperScannerConfigurer mapperScannerConfigurer = new MapperScannerConfigurer();
            mapperScannerConfigurer.setSqlSessionFactoryBeanName("sqlSessionFactory");
            mapperScannerConfigurer.setBasePackage(getBasePackages(this.basePackage));
            mapperScannerConfigurer.setProperties(this.properties);
            return mapperScannerConfigurer;
        }
    }
}
{% endhighlight %}

实例化MapperScannerConfiguer.  

{% highlight java %}
public class MapperScannerConfigurer extends org.mybatis.spring.mapper.MapperScannerConfigurer {
    private MapperHelper mapperHelper = new MapperHelper();
    private PageHelper pageHelper = new PageHelper();

    public MapperScannerConfigurer() {
    }
}
{% endhighlight %}
MapperScannerConfiguer其实扩展了spring-mybatis中的MapperScannerConfigurer.MapperScannerConfigurer的作用就是帮助实例化mapper。
{% highlight java %}
//设置SessionFactory实例的名称，这个作用下面讲
mapperScannerConfigurer.setSqlSessionFactoryBeanName("sqlSessionFactory");
//basePackage就是mapper存放的路径，因为如果要实例化mapper，需要指导他们的路径
mapperScannerConfigurer.setBasePackage(getBasePackages(this.basePackage));
//目前为止这个Properties是空的
mapperScannerConfigurer.setProperties(this.properties);
{% endhighlight %}
貌似到这里线索已经断了，因为MapperScannerConfiguer只有一个空空的构造函数。
继续深入发现继承类也是这样：  

{% highlight java %}
public class MapperScannerConfigurer implements BeanDefinitionRegistryPostProcessor, InitializingBean, ApplicationContextAware, BeanNameAware {
    public MapperScannerConfigurer() {
    }
}
{% endhighlight  %}  
也是有一个空空的构造函数，但是明显感觉到它实现的接口很不一般,回在实例化的时候有一些“小动作“。 

按照顺序来吧，BeanDefinitionRegistryPostProcessor  

{% highlight java %}
public interface BeanDefinitionRegistryPostProcessor extends BeanFactoryPostProcessor {

	/**
	 * Modify the application context's internal bean definition registry after its
	 * standard initialization. All regular bean definitions will have been loaded,
	 * but no beans will have been instantiated yet. This allows for adding further
	 * bean definitions before the next post-processing phase kicks in.
	 * @param registry the bean definition registry used by the application context
	 * @throws org.springframework.beans.BeansException in case of errors
	 */
	void postProcessBeanDefinitionRegistry(BeanDefinitionRegistry registry) throws BeansException;

}
{% endhighlight %}
简单来说就是在标准的初始化之后改变自己。
{% highlight java  %}
    public void postProcessBeanDefinitionRegistry(BeanDefinitionRegistry registry) {
        super.postProcessBeanDefinitionRegistry(registry);
        this.mapperHelper.ifEmptyRegisterDefaultInterface();
        String[] names = registry.getBeanDefinitionNames();
        String[] var4 = names;
        int var5 = names.length;

        for(int var6 = 0; var6 < var5; ++var6) {
            String name = var4[var6];
            BeanDefinition beanDefinition = registry.getBeanDefinition(name);
            if(beanDefinition instanceof GenericBeanDefinition) {
                GenericBeanDefinition definition = (GenericBeanDefinition)beanDefinition;
                if(StringUtil.isNotEmpty(definition.getBeanClassName()) && definition.getBeanClassName().equals("org.mybatis.spring.mapper.MapperFactoryBean")) {
                    definition.setBeanClass(MapperFactoryBean.class);
                    definition.getPropertyValues().add("mapperHelper", this.mapperHelper);
                    definition.getPropertyValues().add("pageHelper", this.pageHelper);
                }
            }
        }

    }
{% endhighlight  %}
这段代码的作用就是找到“org.mybatis.spring.mapper.MapperFactoryBean”类型的bean，然后将BeanClass替换为本公司自己的MapperFactoryBean.
并且加入了mapperHelper和pageHelper。

InitializingBean
{% highlight java %}
public interface InitializingBean {

	/**
	 * Invoked by a BeanFactory after it has set all bean properties supplied
	 * (and satisfied BeanFactoryAware and ApplicationContextAware).
	 * <p>This method allows the bean instance to perform initialization only
	 * possible when all bean properties have been set and to throw an
	 * exception in the event of misconfiguration.
	 * @throws Exception in the event of misconfiguration (such
	 * as failure to set an essential property) or if initialization fails.
	 */
	void afterPropertiesSet() throws Exception;

}
{% endhighlight %}
在所有属性注入之后，回进行一些初始化操作。
{% highlight java %}
    public void afterPropertiesSet() throws Exception {
        Assert.notNull(this.basePackage, "Property \'basePackage\' is required");
    }
{% endhighlight  %}
其实只做了一个动作，判断basePackage属性是否为空.

ApplicationContextAware
{% highlight java %}
public interface ApplicationContextAware extends Aware {

	/**
	 * Set the ApplicationContext that this object runs in.
	 * Normally this call will be used to initialize the object.
	 * <p>Invoked after population of normal bean properties but before an init callback such
	 * as {@link org.springframework.beans.factory.InitializingBean#afterPropertiesSet()}
	 * or a custom init-method. Invoked after {@link ResourceLoaderAware#setResourceLoader},
	 * {@link ApplicationEventPublisherAware#setApplicationEventPublisher} and
	 * {@link MessageSourceAware}, if applicable.
	 * @param applicationContext the ApplicationContext object to be used by this object
	 * @throws ApplicationContextException in case of context initialization errors
	 * @throws BeansException if thrown by application context methods
	 * @see org.springframework.beans.factory.BeanInitializationException
	 */
	void setApplicationContext(ApplicationContext applicationContext) throws BeansException;

}
{% endhighlight %}
又是进行一些初始化操作。

{% highlight java %}
public void setApplicationContext(ApplicationContext applicationContext) {
        this.applicationContext = applicationContext;
}
{% endhighlight %}
就是将ApplicationContext传递过来.

{% highlight java %}
public interface BeanNameAware extends Aware {

	/**
	 * Set the name of the bean in the bean factory that created this bean.
	 * <p>Invoked after population of normal bean properties but before an
	 * init callback such as {@link InitializingBean#afterPropertiesSet()}
	 * or a custom init-method.
	 * @param name the name of the bean in the factory.
	 * Note that this name is the actual bean name used in the factory, which may
	 * differ from the originally specified name: in particular for inner bean
	 * names, the actual bean name might have been made unique through appending
	 * "#..." suffixes. Use the {@link BeanFactoryUtils#originalBeanName(String)}
	 * method to extract the original bean name (without suffix), if desired.
	 */
	void setBeanName(String name);

}
{% endhighlight %}
设置在Bean facotry中的名字。
进过上面的分析有用的大概就是找到“org.mybatis.spring.mapper.MapperFactoryBean”类型的bean，然后将BeanClass替换为本公司自己的MapperFactoryBean.
并且加入了mapperHelper和pageHelper了。感觉线索又断了。
那就分析MyBatis吧。
{% highlight java %}
    public static void main(String[] arg)throws Exception{
        InputStream inputStream = Resources.getResourceAsStream("mybatis.xml");
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
        SqlSession session = sqlSessionFactory.openSession();
        try {
            Blog temp = new Blog();
            temp.setId(1l);
            Map<String, Object> map = new HashMap();
            map.put("blog", temp);
            Blog blog = (Blog) session.selectOne("org.liu.mybatis.mapper.BlogMapper.selectOne", map);
            System.out.println(blog.getContent());
        } finally {
            session.close();
        }
    }
{% endhighlight %}

这段代码非常简单首先从SqlSessionFactory开始：
{% highlight java %}
public interface SqlSessionFactory {

  SqlSession openSession();

  SqlSession openSession(boolean autoCommit);
  SqlSession openSession(Connection connection);
  SqlSession openSession(TransactionIsolationLevel level);

  SqlSession openSession(ExecutorType execType);
  SqlSession openSession(ExecutorType execType, boolean autoCommit);
  SqlSession openSession(ExecutorType execType, TransactionIsolationLevel level);
  SqlSession openSession(ExecutorType execType, Connection connection);

  Configuration getConfiguration();

}
{% endhightlight  %}
SqlSessionFactory非常简单，只是一个接口，定义了获取Session的各种方式。
SqlSession:
{% highlight java %}
public interface SqlSession extends Closeable {

  <T> T selectOne(String statement);

  <T> T selectOne(String statement, Object parameter);

  <E> List<E> selectList(String statement);

  <E> List<E> selectList(String statement, Object parameter);

  <E> List<E> selectList(String statement, Object parameter, RowBounds rowBounds);

  <K, V> Map<K, V> selectMap(String statement, String mapKey);

  <K, V> Map<K, V> selectMap(String statement, Object parameter, String mapKey);

  <K, V> Map<K, V> selectMap(String statement, Object parameter, String mapKey, RowBounds rowBounds);
  
  <T> Cursor<T> selectCursor(String statement);

  <T> Cursor<T> selectCursor(String statement, Object parameter);
  
  <T> Cursor<T> selectCursor(String statement, Object parameter, RowBounds rowBounds);

  void select(String statement, Object parameter, ResultHandler handler);

  void select(String statement, ResultHandler handler);

  void select(String statement, Object parameter, RowBounds rowBounds, ResultHandler handler);

  int insert(String statement);

  int insert(String statement, Object parameter);

  int update(String statement);

  int update(String statement, Object parameter);

  int delete(String statement);

  int delete(String statement, Object parameter);

  void commit();

  void commit(boolean force);

  void rollback();

  void rollback(boolean force);

  List<BatchResult> flushStatements();

  @Override
  void close();

  void clearCache();

  Configuration getConfiguration();
  <T> T getMapper(Class<T> type);
  Connection getConnection();
}
{% endhighlight %}
也只是定义了一些增删改查的方法，看来重点就是这些方法的实现了。
SqlSessionFactory的默认实现是DefaultSqlSessionFactory
SqlSession的默认实现是DefaulSqlSession
{% highlight java %}
public class DefaultSqlSession implements SqlSession {

  private Configuration configuration;
  private Executor executor;

  private boolean autoCommit;
  private boolean dirty;
  private List<Cursor<?>> cursorList;

  public DefaultSqlSession(Configuration configuration, Executor executor, boolean autoCommit) {
    this.configuration = configuration;
    this.executor = executor;
    this.dirty = false;
    this.autoCommit = autoCommit;
  }
}
{% endhighlight %}
重要的参数是Configuration, Executor.
Configuration正如其名，就是一个配置类，配置类类各种配置，比如用什么日志，连接类型是jdbc还是jndi等等，非常多。
Executor :
{% highlight java %}
public interface Executor {

  ResultHandler NO_RESULT_HANDLER = null;

  int update(MappedStatement ms, Object parameter) throws SQLException;

  <E> List<E> query(MappedStatement ms, Object parameter, RowBounds rowBounds, ResultHandler resultHandler, CacheKey cacheKey, BoundSql boundSql) throws SQLException;

  <E> List<E> query(MappedStatement ms, Object parameter, RowBounds rowBounds, ResultHandler resultHandler) throws SQLException;

  <E> Cursor<E> queryCursor(MappedStatement ms, Object parameter, RowBounds rowBounds) throws SQLException;

  List<BatchResult> flushStatements() throws SQLException;

  void commit(boolean required) throws SQLException;

  void rollback(boolean required) throws SQLException;

  CacheKey createCacheKey(MappedStatement ms, Object parameterObject, RowBounds rowBounds, BoundSql boundSql);

  boolean isCached(MappedStatement ms, CacheKey key);

  void clearLocalCache();

  void deferLoad(MappedStatement ms, MetaObject resultObject, String property, CacheKey key, Class<?> targetType);

  Transaction getTransaction();

  void close(boolean forceRollback);

  boolean isClosed();

  void setExecutorWrapper(Executor executor);

}
{% endhighlight %}
