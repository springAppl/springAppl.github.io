//点击一下只有当前变色，其它不变色
window.onload = tryTest;
function tryTest(){
$('#p').panel({
    width:400,
    height:150,
    title:'My Panel',
    tools:[{
        iconCls:'icon-add',
        handler:function(){alert('new')}
    },{
        iconCls:'icon-save',
        handler:function(){alert('save')}
    }]
});
	
	
}
