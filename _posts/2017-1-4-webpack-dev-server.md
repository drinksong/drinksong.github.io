---
layout: post
title: webpack-dev-server
date: 2017-1-4
category: 工具
tags: webpack
---

> webpack-dev-server是一个小型的node.js Express服务器,它使用webpack-dev-middleware中间件来为通过webpack打包生成的资源文件提供Web服务。它还有一个通过Socket.IO连接着webpack-dev-server服务器的小型运行时程序。webpack-dev-server发送关于编译状态的消息到客户端，客户端根据消息作出响应。

简单来说，webpack-dev-server就是一个小型的静态文件服务器。使用它，可以为webpack打包生成的资源文件提供Web服务。那么，它能给开发带来什么便利呢？

## 支持自动刷新的两种模式

`webpack-dev-server`有两种模式支持自动刷新——`iframe`模式和`inline`模式。在`iframe`模式下：页面嵌套在一个`iframe`下，在代码发生改动的时候，这个`iframe`会重新加载；
在`inline`模式下：一个小型的`webpack-dev-server`客户端会作为入口文件打包，这个客户端在后端代码改变的时候刷新页面。

- 使用`iframe`模式无需额外配置，只需要在浏览器中输入`http://localhost:8080/webpack-dev-server/index.html`

- 使用`inline`模式有两种方式：命令行方式和`Node.js API`。

1) 命令行方式比较简单，只需要加入`--inline`即可。例如`webpack-dev-server --inline`

使用`--inline`会自动把`webpack-dev-server`客户端加到`webpack`的入口文件配置中。

注意：使用`webpack-dev-server`命令行的时候，会自动查找名为`webpack.config.js`的配置文件。如果你的配置文件名称不是`webpack.config.js`，需要命令行中指明配置文件。
例如，配置文件是`webpack.config.dev.js`，那么命令就应该是`webpack-dev-server --inline --config webpack.config.dev.js`

2) `Node.js API`的方式需要手动把`webpack-dev-server/client?http://localhost:8080`加到配置文件的入口文件配置中，因为`webpack-dev-server`没有`inline:true`这个配置项。


## 支持热替换

`webpack-dev-srever`持Hot Module Replacement，即模块热替换，在前端代码变动的时候无需整个刷新页面，只把变化的部分替换掉。使用HMR功能也有两种方式：命令行方式和`Node.js API`。

1) 命令行方式同样比较简单，只需加入`--inline --hot`选项。`--hot`这个选项干了一件事情，它把webpack/hot/dev-server入口点加入到了webpack配置文件中。这时访问浏览器，你会看见控制台的log信息：

```
[HMR] Waiting for update signal from WDS...
[WDS] Hot Module Replacement enabled.
```

HMR前缀的信息由`webpack/hot/dev-server`模块产生，WDS前缀的信息由`webpack-dev-server`客户端产生。

2) `Node.js API`方式需要做三个配置：

- 把`webpack/hot/dev-server`加入到`webpack`配置文件的`entry`项；

- 把`new webpack.HotModuleReplacementPlugin()`加入到`webpack`配置文件的`plugins`项；

- 把`hot:true`加入到`webpack-dev-server`的配置项里面。

 注意：要使HMR功能生效，还需要做一件事情，就是要在应用热替换的模块或者根模块里面加入允许热替换的代码。否则，热替换不会生效，还是会重刷整个页面。下面是摘自`webpack`在`github`上docs的原话：

 > A module can only be updated if you "accept" it. So you need to module.hot.accept the module in the parents or the parents of the parents... I. e. a Router is a good place or a subview.

 具体代码是：

```
if (module.hot) {
   module.hot.accept();
}
```

 也可以使用一些插件去完成这个工作，例如`webpack-module-hot-accept`插件。不过，`webpack-dev-server HMR`结合`react-hot-loader`使用的时候，`react-hot-loader`会去做这个工作。

 综合上述两点，使用`wepack-dev-server`辅助开发，使得开发者在开发前端代码的过程中无需频繁手动刷新页面，使用HMR甚至不用等待页面刷新，确实可以给开发者带来很好的体验。

## 与后端服务器结合使用

但是，问题又来了。我要进行前后端联调的时候怎么办呢？毕竟`webpack-dev-server`只是一个静态文件服务器，不具备动态处理的能力。这个时候就需要将后端服务器与`webpack-dev-server`结合使用了。
`webpack-dev-server`只用来为`webpack`打包生成的资源文件提供服务，比如js文件、图片文件、css文件等；后端服务器除提供API接口外，还提供入口HTML。

要将`webpack-dev-server`与后端服务器结合使用，需要做三件事情。

1) 首页HTML文件是从后端服务器发出的，这时页面的根地址变成了后端服务器地址，怎么使得`webpack`产生的资源文件在请求资源的时候是向`web-dev-server`请求而不是后端服务器请求？
只需在`webpack`配置文件中的`output.publicPath`配置项写上绝对URL地址，例如`output.publicPath = "http://localhost:8080/assets/"`。
这时，`webpack`打包产生的资源文件里面的`url`地址都会是绝对地址，而不是相对地址。

2) 后端服务器产生的入口HTML文件要向`webpack-dev-server`请求资源文件，这个简单，只需在HTML文件中加入资源文件的绝对地址，例如：`<script src="http://localhost:8080/assets/bundle.js">`

3) 要使`webpack-dev-server`和它的运行时程序连接起来。这个简单，只需要使用`inline`模式即可。


