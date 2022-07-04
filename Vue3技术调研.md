## **Vue 3.0 的新特性**

**Vue3.0的几个亮点：**

- Performance：性能优化
- Tree-shaking support：支持摇树优化
- Composition API：组合API
- Fragment，Teleport，Suspense：新增的组件
- Better TypeScript support：更好的TypeScript支持
- Custom Renderer API：自定义渲染器

在性能方面，对比Vue2.x，性能提升了1.3~2倍左右；打包后的体积也更小了，如果单单写一个HelloWorld进行打包，只有13.5kb；加上所有运行时特性，也不过22.5kb。

**重写Vdom**

- patch flag 优化静态树
- patch flag 优化静态属性
- 静态提升
- 事件侦听器缓存

**Tree-shaking**

Tree-Shaking带来的bundle体积更小是显而易见的。在2.x版本中，很多函数都挂载在全局Vue对象上，比如nextTick、set、observable等函数，因此虽然我们用不到，但打包时只要引入了vue这些全局函数仍然会打包进bundle中。

而在Vue3中，所有的API都通过ES6模块化的方式引入，这样就能让webpack或rollup等打包工具在打包时对没有用到API进行剔除，最小化bundle体积；我们在main.js中就能发现这样的变化：

```javascript
import { createApp } from "vue"
import App from "./app.vue"
import router from "./router"

const app = createApp(App)
app.use(router).mount("#app")
```

创建app实例方式从原来的new Vue()变为通过createApp函数进行创建；我们通过创建的实例来调用，带来的好处就是一个应用可以有多个Vue实例，不同实例之间的配置也不会相互影响：

```javascript
import { createApp } from "vue"
const app = createApp(App)
app.use(/********/)
app.component(/********/)
```

因此Vue2.x的以下全局API也需要改为ES6模块化引入：

- Vue.nextTick
- Vue.observable不再支持，改为reactive
- Vue.version
- Vue.compile (仅全构建)
- Vue.set (仅兼容构建)
- Vue.delete (仅兼容构建)

除此之外，vuex和vue-router也都使用了Tree-Shaking进行了改进，不过api的语法改动不大

# **生命周期函数**

我们都知道，在Vue2.x中有8个生命周期函数：

- beforeCreate
- created
- beforeMount
- mounted
- beforeUpdate
- updated
- beforeDestroy
- destroyed

在vue3中，新增了一个setup生命周期函数，setup执行的时机是在beforeCreate生命函数之前执行，因此在这个函数中是不能通过this来获取实例的；同时为了命名的统一，将beforeDestroy改名为beforeUnmount，destroyed改名为unmounted，因此vue3有以下生命周期函数：

- beforeCreate（建议使用setup代替）
- created（建议使用setup代替）
- setup
- beforeMount
- mounted
- beforeUpdate
- updated
- beforeUnmount
- unmounted

同时，vue3新增了生命周期钩子，我们可以通过在生命周期函数前加on来访问组件的生命周期，我们可以使用以下生命周期钩子：

- onBeforeMount
- onMounted
- onBeforeUpdate
- onUpdated
- onBeforeUnmount
- onUnmounted
- onErrorCaptured
- onRenderTracked
- onRenderTriggered

那么这些钩子函数如何来进行调用呢？我们在setup中挂载生命周期钩子，当执行到对应的生命周期时，就调用对应的钩子函数：

```vue
<script lang="ts">
    import { onMounted } from "vue"
    export default {
        name: ""
        setup() {
            onMounted( () => {
            // moutend TODO
        	})
        }
    }
</script>
```



## **响应式API**

我们可以使用reactive来为JS对象创建响应式状态：

```vue
<script lang="ts">
    import { reactive } from "vue"
    export default {
        name: ""
        setup() {
            const state = reactive({
                name: "张三",
                age: 18
            })
        }
    }
</script>
```

reactive相当于Vue2.x中的Vue.observable。

reactive函数只接收object和array等复杂数据类型。

对于一些基本数据类型，比如字符串和数值等，我们想要让它变成响应式，我们当然也可以通过reactive函数创建对象的方式，但是Vue3提供了另一个函数ref

ref返回的响应式对象是只包含一个名为value参数的RefImpl对象，在js中获取和修改都是通过它的value属性；但是在模板中被渲染时，自动展开内部的值，因此不需要在模板中追加.value

当我们处理一些大型响应式对象的property时，我们很希望使用ES6的解构来获取我们想要的值

但是这样会消除它的响应式；对于这种情况，我们可以将响应式对象转换为一组ref，这些ref将保留与源对象的响应式关联

对于一些只读数据，我们希望防止它发生任何改变，可以通过readonly来创建一个只读的对象

有时我们需要的值依赖于其他值的状态，在vue2.x中我们使用computed函数来进行计算属性，在vue3中将computed功能进行了抽离，它接受一个getter函数，并为getter返回的值创建了一个**不可变**的响应式ref对象

或者我们也可以使用get和set函数创建一个可读写的ref对象

## **响应式侦听**

和computed相对应的就是watch，computed是多对一的关系，而watch则是一对多的关系；vue3也提供了两个函数来侦听数据源的变化：watch和watchEffect。

watch的用法和组件的watch选项用法完全相同，它需要监听某个数据源，然后执行具体的回调函数

我们也可以把多个值放在一个数组中进行侦听，最后的值也以数组形式返回

如果我们来侦听一个深度嵌套的对象属性变化时，需要设置deep:true

一般侦听都会在组件销毁时自动停止，但是有时候我们想在组件销毁前手动的方式进行停止，可以调用watch返回的stop函数进行停止

watchEffect和watch的用法主要有以下几点不同：

1.watchEffect不需要手动传入依赖

2.每次初始化时watchEffect都会执行一次回调函数来自动获取依赖

3.watchEffect无法获取到原值，只能得到变化后的值

watchEffect会在页面加载时自动执行一次，追踪响应式依赖；在加载后定时器每隔1s执行时，watchEffect都会监听到数据的变化自动执行，每次执行都是获取到变化后的值。

## **组合API**

Composition API（组合API）也是Vue3中最重要的一个功能了，之前的2.x版本采用的是Options API（选项API），即官方定义好了写法：data、computed、methods，这样带来的问题就是随着功能增加，代码也越来复杂

Options API就是将同一类型的东西放在同一个选项中，当我们的数据比较少的时候，这样的组织方式是比较清晰的；但是随着数据增多，我们维护的功能点会涉及到多个data和methods，但是我们无法感知哪些data和methods是需要涉及到的，经常需要来回切换查找，甚至是需要理解其他功能的逻辑，这也导致了组件难以理解和阅读。

而Composition API做的就是把同一功能的代码放到一起维护，这样我们需要维护一个功能点的时候，不用去关心其他的逻辑，只关注当前的功能；Composition API通过setup选项来组织代码，它接收了两个参数props和context，props就是父组件传入的一些数据，

context是一个上下文对象，是从2.x暴露出来的一些属性：attrs、slots、emit

## **Fragment**

所谓的Fragment，就是片段；在vue2.x中，要求每个模板必须有一个根节点，在Vue3中我们可以直接不需要根节点，这样就少了很多没有意义的div元素。

## **Teleport**

Teleport一个常见的使用场景，就是在一些嵌套比较深的组件来转移模态框的位置。虽然在逻辑上模态框是属于该组件的，但是在样式和DOM结构上，嵌套层级较深后不利于进行维护（z-index等问题）；因此我们需要将其进行剥离出来

这里的Teleport中的modal div就被传送到了body的底部；虽然在不同的地方进行渲染，但是Teleport中的元素和组件还是属于父组件的逻辑子组件，还是可以和父组件进行数据通信。Teleport接收两个参数to和disabled：

- to - string：必须是有效的查询选择器或 HTMLElement，可以id或者class选择器等。
- disabled - boolean：如果是true表示禁用teleport的功能，其插槽内容将不会移动到任何位置，默认false不禁用。

## **Suspense（实验阶段）**

Suspense是Vue3推出的一个内置组件，它允许我们的程序在等待异步组件时渲染一些后备的内容，可以让我们创建一个平滑的用户体验；Vue中加载异步组件其实在Vue2.x中已经有了，我们用的vue-router中加载的路由组件其实也是一个异步组件

在Vue3中重新定义，异步组件需要通过defineAsyncComponent来进行显示的定义

同时对异步组件的可以进行更精细的管理：

这样我们对异步组件加载情况就能掌控，在加载失败也能重新加载或者展示异常的状态。它主要是在组件加载时渲染一些后备的内容，它提供了两个slot插槽，一个default默认，一个fallback加载中的状态

# **非兼容的功能**

非兼容的功能主要是一些和Vue2.x版本改动较大的语法，已经在Vue3上可能存在兼容问题了。

## **data、mixin和filter**

在Vue2.x中，我们可以定义data为object或者function，但是我们知道在组件中如果data是object的话会出现数据互相影响，因为object是引用数据类型；在Vue3中，data只接受function类型，通过function返回对象；同时Mixin的合并行为也发生了改变，当mixin和基类中data合并时，vue2.x会进行深拷贝，对data中的数据向下深入合并拷贝；而vue3只进行浅层拷贝，对data中数据发现已存在就不合并拷贝。

在vue2.x中，我们还可以通过过滤器filter来处理一些文本内容的展示，然而在vue3中，过滤器filter已经删除，不再支持了，官方建议使用方法调用或者计算属性computed来进行代替。

## **v-model**

Vue3中将v-model和.sync进行了功能的整合，抛弃了.sync，表示：多个双向绑定value值直接用多个v-model传就好了；同时也将v-model默认传的prop名称由value改成了modelValue

如果我们想通过v-model传递多个值，可以将一个argument传递给v-model

## **v-for和key**

在Vue2.x中，我们都知道v-for每次循环都需要给每个子节点一个唯一的key，还不能绑定在template标签上，而在Vue3中，key值应该被放置在template标签上，这样我们就不用为每个子节点设一遍

## **v-for中ref**

vue2.x中，在v-for上使用ref属性，通过this.$refs会得到一个数组

但是这样可能不是我们想要的结果；因此vue3不再自动创建数组，而是将ref的处理方式变为了函数，该函数默认传入该节点

## **v-for和v-if优先级**

在vue2.x中，在一个元素上同时使用v-for和v-if，v-for有更高的优先级，因此在vue2.x中做性能优化，有一个重要的点就是v-for和v-if不能放在同一个元素上。而在vue3中，v-if比v-for有更高的优先级。因此下面的代码，在vue2.x中能正常运行，但是在vue3中v-if生效时并没有item变量，因此会报错

 