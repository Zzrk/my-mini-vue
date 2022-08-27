## steps

1. 写单测
2. 让单测通过
3. 重构
4. 优化


## tips
1. 将一些语义化不是很好的函数抽离出来，如 createActiveObject、extend 等
2. 注意一致性，对 get、set 同时进行封装
3. 注意缓存一些常量，如 get、set 等
4. 面向对象的形式，可以将一些东西抽象成类，如 ReactiveEffect 等
