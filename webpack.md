# webpack

### webpack的作用与原理

### webpack的核心点

### webpack配置

#### devtool:  

- 开发环境最优：evel-source-map
- 生产环境最优：source-map

### webpack优化

#### 开发环境：

- HMR:  热模块替换
- devtool：优化代码调试

#### 生产环境

- oneof:  loader解析文件后，不继续后面的校验
- loader 缓存： catchDiretory: true
- code split:  分多个chunk打包
- hash缓存：hash chunkhash  contenthash
- 多进程打包： webpack基于node，原有打包进程只有一个，利用插件，开启多进程打包
- externals: 排除某些不需要打包的库, 如CDN引入的库
- DLL(动态链接库)：将第三方包单独打包一次（有的项目以来包可能有升级，根据实际情况使用）