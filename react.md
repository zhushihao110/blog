# React    [（core、renderer、reconciler)](https://zh-hans.reactjs.org/docs/implementation-notes.html)

### 1.简述React diff [算法的实现机制和使用场景](https://zhuanlan.zhihu.com/p/20346379)

React diff的三大策略：

- Web UI中DOM节点跨层级的移动操作特别少，可以忽略不计（**tree diff**）
- 拥有相同类的两个组件将会生成相似的树形结构，拥有不同类的两个组件将会生成不同的树形结构（**component diff**）
- 对于同一层级的一组子节点，它们可以通过唯一 id 进行区分（**element diff**）

常见问题 key值， 其原理就是因为diff策略对于子节点的优化

------

### 2.简述虚拟 dom 实现原理

**虚拟dom是真实dom的映射**

- 用JS对象模拟DOM树，
- 比较两棵虚拟DOM树的差异，
- 把差异应用到真正的DOM树上

虚拟DOM的流程是**数据->模版/算法/语法糖->虚拟dom->一系列js操作->真实dom**

------

### 3.React Fiber[原理](https://segmentfault.com/a/1190000018250127) 

React15的问题，在页面元素很多，且要频繁刷新的场景下，出现掉帧的现象，根本原因是大量的同步计算阻塞了浏览器渲染

采用Fiber：

- **能够把可中断的任务切片处理（每执行一段时间就把控制权交回给浏览器）**
- 能够调整优先级，重置并复用任务
- 能够在父元素与子元素之间交错处理，以支持 React 中的布局
- 能够在 `render()` 中返回多个元素
- 更好地支持错误边界

------

### 4.React如何把组件挂载到非父组件上

Portal  是一种将子节点渲染到存在于父组件以外的 DOM 节点方法

```
ReactDOM.createPoRtal(child, container) /* 第一个参数是任何可渲染的React子元素，第二个参数是一个DOM元素*/
```

------

### 5.受控组件与非受控组件

表单元素(input, select, ...)，有自己的状态管理，为非受控组件，获取组价数据使用Ref

```
this.input = React.createef();
<input type="text" ref={this.input} />  
console.log(this.input.current.value)
```

而在 React 中，可变状态（mutable state）通常保存在组件的 state 属性中，并且只能通过使用 [`setState()`](https://zh-hans.Reactjs.oRg/docs/React-component.html#setstate)来更新

------

### 6.React事件处理

在 React 中你不能通过返回 `false` 的方式阻止默认行为。你必须显式的使用 `pReventDefault` 

React 根据 [W3C 规范](https://www.w3.oRg/TR/DOM-Level-3-Events/)来定义这些合成事件，所以不需要担心跨浏览器的兼容性问题。React 事件与原生事件不完全相同。 [`SyntheticEvent`](https://zh-hans.Reactjs.oRg/docs/events.html) 参考指南

合成事件挂 载到 document 上

------

### 7.React代码分割

除去webpack等打包工具外，React.lazy 可以动态引入组件

`React.lazy` 和 `Suspense ` 搭配使用

路由级别： React.lazy和React-RouteR来配置基于路由的代码分割

------

### 8.hooks与class，纯函数的区别及优点

class类组件，可维护自己的state，内部this，逻辑复用低

纯函数组件，内部无自己的state，无生命周期，逻辑复用高

hooks组件， 可维护自己的state，可调用副作用（effect），逻辑复用高

总结而言，hook更像是class与纯函数的优点结合

------

### 9.React渲染dom是在哪里进行的

React渲染dom是 react-dom库完成，React 核心只包含定义组件必要的 API。它不包含算法或者其他平台特定的代码

合成事件 在 渲染库中

------

### 10.React的setState()是同步还是异步

在React中，**如果是由React引发的事件处理（比如通过onClick引发的事件处理），调用setState不会同步更新this.state，除此之外的setState调用会同步执行this.state** 。所谓“除此之外”，指的是绕过React通过addEventListener直接添加的事件处理函数，还有通过setTimeout/setInterval产生的异步调用

**原因：** 在React的setState函数实现中，会根据一个变量isBatchingUpdates判断是直接更新this.state还是放到队列中回头再说，而isBatchingUpdates默认是false，也就表示setState会同步更新this.state，但是，**有一个函数batchedUpdates，这个函数会把isBatchingUpdates修改为true，而当React在调用事件处理函数之前就会调用这个batchedUpdates，造成的后果，就是由React控制的事件处理过程setState不会同步更新this.state**

**注意：**这里所说的同步异步， 并不是真正的同步异步， 它还是同步执行的。这里的异步指的是多个state会合成到一起进行批量更新

------

### 11.React的context理解

在React中数据传递方式：

- 父子组件传递 Props
- 子组件之间通信通过Props中传递函数来达到目的（书写复杂）
- 使用事件监听实现数据传递（维护成本高）

context实现组件之间共享数据方式，用来处理类似 **全局数据**，避免通过中间元素传递 props

常用数据状态管理工具：

redux: Action、Reducer和Store三大元素组成，通过connect来连接state， store

mobx: 底层通过Object.defineProperty或Proxy来劫持数据

------

### 12.React 中各种组件复用的优劣势（mixin、render props、hoc、hook）

**mixin:** 

- 组件与`Mixin`之间存在隐式依赖,
- 多个`Mixin`之间可能产⽣冲突
- `Mixin`倾向于增加更多状态，这降低了应⽤的可预测性
- 隐式依赖导致依赖关系不透明，维护成本和理解成本迅速攀升

**hoc:** 

​	缺点

  - 扩展性限制,`HOC`⽆法从外部访问⼦组件的`State`因此⽆法通过`shouldComponentUpdate`滤掉不必要的更新,`React`在⽀持`ES6 Class`之后提供了`React.PureComponent`来解决这个问题

  - `Ref`传递问题: `Ref`被隔断,后来的`React.forwardRef`来解决这个问题

  - 不可⻅性: `HOC`相当于在原有组件外层再包装⼀个组件,你压根不知道外层的包装是啥,对于你是⿊盒

  - 命名冲突: 如果⾼阶组件多次嵌套,没有使⽤命名空间的话会产⽣冲突,然后覆盖⽼属性

  - ` Wrapper Hell`:`HOC`可能出现多层包裹组件的情况,多层抽象同样增加了复杂度和理解成本 

    优点：

    `HOC`通过外层组件通过`Props`影响内层组件的状态，⽽不是直接改变其`State`不存在冲突和互相⼲扰

    不同于`Mixin`的打平+合并,`HOC`具有天然的层级结构（组件树结构）

**Render Props：**

	  - 使⽤繁琐：`HOC`使⽤只需要借助装饰器语法通常⼀⾏代码就可以进⾏复⽤,`Render Props`⽆法做到如此简单
	  - 嵌套过深: `Render Props`虽然摆脱了组件多层嵌套的问题,但是转化为了函数回调的嵌套

**hooks：**

  - 写法上有限制（不能出现在条件、循环中），并且写法限制增加了重构成本

  - 破坏了`PureComponent`、`React.memo`浅⽐较的性能优化效果（为了取最新的`props`和`state`，每次`render()`都要重新创建事件处函数）

  - `React.memo`并不能完全替代`shouldComponentUpdate`（因为拿不到`state change`，只针对 `props change`）

    优点： 简洁，**解耦，组合**，函数友好

### 13.老版本的 React 的某些生命周期被废弃的理由

- componentWillMount()：如果使用服务端渲染的话，willMount会在服务端和客户端各自执行一次，这会导致请求两次，**在Fiber之后， 由于任务可中断，willMount可能会被执行多次**
- componentWillUpdate()：回调函数也有可能会被调用多次
- componentWillReceiveProps(nextProps)：判断前后两个 props 是否相同，如果不同再将新的 props 更新到相应的 state 上去。这样做一来会破坏 state 数据的单一数据源，导致组件状态变得不可预测，另一方面也会增加组件的重绘次数

### 14.React 性能优化

- 使用memo来缓存组件：只有当传入组件的状态只发生变化时才会重新渲染，如果传入的只和上一次没有发生变化，则返回缓存的组件（只能检测Props）
- useMemo缓存大量计算：我们达到空间换时间的策略，减少在一帧的工作时间内，js 线程执行时间不影响 GUI 线程，从而提高性能
- PureComponent,：PureComponent 会进行浅比较判断组件是否需要重新渲染，对于引用类型，只会判断是否是同一份引用
- shouldComponentUpdate：优化diff 是否需要重新渲染当前组件
- 避免使用内联对象：在 JSX 中创建一个内联对象的时候，每次重新渲染都会重新生成一个新的对象，如果这里还存在了引用关系的话，会大大增加性能损耗
- 延迟加载不是立即需要的组件：通过利用 `React.lazy` 和 `React.Suspense` 可以轻松完成按需加载
- 调整 CSS 而不是强制组件加载和卸载： 有时在保持组件加载的同时通过 CSS 隐藏可能是有益的，而不是通过卸载来隐藏。对于具有显著的加载/卸载时序的重型组件而言，这是有效的性能优化手段
- 使用 Fragment 来避免添加额外的 DOM 节点
- React-window: 虚拟滚动库，应对长列表