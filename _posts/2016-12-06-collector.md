---
layout: post
title: collector
category: stream
---
## Collector
A mutable reduction operation that accumulates input elements into a mutable result container, optionally transforming the accumulated result into a final representation after all input elements have been processed. Reduction operation can be performed either sequentially or in paralle.
Examples of mutable reduction operations include: accumulating elements into a Collection;
concatenating strings using a StringBuilder;computing summary information about elements such as sum, min, max, or average; computing "pivot table" summaries such as "maximum valued transaction by seller", etc. The class Collectors provides implementations of may common mutable reductions.
A Collector is specified by four functions that work together to accumulate entries into mutable result container, and optionally perform a final transform on the result. They are:
- creation of a new result container(supplier())
- incorporating a new data element into a result container(accumulator())
- combining two result containers into one(combiner())
- performing an optional final transform on the container(finisher())
Collecotrs also have a set of characteristics, such as Collector.Characteristics.CONCURRENT,

A sequential implementation of a reduction using a collector would create a single result container using the supplier function, and invoke the accumulator function once for each input element. A parallel implementation would partition the input, create a result container for each partition, accumulate the contents of each partition into a subresult for that partition, and then use the combiner function to merge the subresults into a combined result.
To ensure that sequentail and paralle executions produce equivalent results, the collector functions must satisfy an identitiy and an associativity constraints.
The identity constraint says that for any partially accumulated result, combining it with an empty result container must product an equivalent result. This is, for a partially accumulated result a that is the result of any series of accumulator and combiner invocations, a must be equivalent to combiner.apply(a, supplier.get()). 
The associativity constraint says that splitting the computation must product an equivalent result. That is, for any input elements t1 and t2, the result r1 and r2 in the computation below must be equivalent:

A a1 = supplier.get();
accumulator.accept(a1, t1);
accumulator.accept(a1, t2);
R r1 = finisher.apply(a1);  //result without splitting

A a2 = supplier.get();
accumulator.accept(a2, t1);
A a3 = supplier.get();





























