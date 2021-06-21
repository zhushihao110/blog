# webpack

### webpack的作用

*webpack* 是一个现代 JavaScript 应用程序的*静态模块打包器*, 它会递归地构建一个*依赖关系图(dependency graph)*，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 *bundle*

![](https://github.com/zhushihao110/blog/blob/master/image/webpack.png)

### webpack的核心配置点

- 入口(entry)：入口起点，可以有多个
- 输出(output)：可以控制 webpack 如何向硬盘写入编译文件，即使可以存在多个`入口`起点，但只指定一个`输出`配置
- loader：用于对模块的源代码进行转换，不同的文件使用不同的loader处理，最终输出为浏览器可识别的代码
- 插件(plugins): 用于以各种方式自定义 webpack 构建过程(类)
- 模式(mode): 只存在 development  production两种模式

#### 模块(module)：

module.rules：决定了如何处理项目中的不同类型的模块

### webpack-dev-server

#### devtool:  

- 开发环境最优：evel-source-map/evel-cheap-source-map
- 生产环境最优：source-map

#### proxy: 

可设置代理：解决本地开发跨域问题

```
proxy: {
  "/api": {
    target: "http://www.baidu.com",
    pathRewrite: {"^/api" : "/"}，
    changeOrigin： true,
    headers: {}
  }
}
```



### webpack优化

#### 开发环境：

- HMR:  热模块替换
- devtool：优化代码调试

#### 生产环境

- loader 缓存： catchDiretory: true
- code split:  代码拆分打包
- hash缓存：hash chunkhash  contenthash（配合HTTP强缓存）
- 多进程打包(HappyPack)： webpack基于node，原有打包进程只有一个，利用插件，开启多进程打包
- externals: 排除某些不需要打包的库, 如CDN引入的库
- DLL(动态链接库)：将第三方包单独打包一次（有的项目依赖包可能有升级，根据实际情况使用）

### Vite 

![../image/vite](E:\blog\image\vite.png)

vite利用浏览器新特性,实现ES6模块加载，大大提升了开发效率，但目前不够成熟，功能不全面