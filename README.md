## steps

1. 写单测
2. 让单测通过
3. 重构
4. 优化


## TPP
先去写一个特定的行为 -> 重构成通用的行为


## tips
1. 将一些语义化不是很好的函数抽离出来，如 createActiveObject、extend 等
2. 注意一致性，对 get、set 同时进行封装
3. 注意缓存一些常量，如 get、set 等
4. 面向对象的形式，可以将一些东西抽象成类，如 ReactiveEffect 等
5. Object.assign()
6. Object.is()
7. 5..toString('2) -> '101'
8. ShapeFlags 位运算 & |
9. component.emit = emit.bind(null, component)
10. 作用域插槽
11. currentInstance = instance; 用函数包裹起来，方便调试
12. parentComponent 为父组件实例，根组件为 null
13. container 为容器 Dom，根组件的容器为 #app 的 div，其 children 的容器为父元素
14. vnode 的 el 为根元素的 Dom
