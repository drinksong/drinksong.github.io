---
layout: post
title: 理解webpack中output.filename和output.chunkFilename
date: 2016-12-19
category: 工具
tags: webpack
---

- filename

`filename`很好理解，就是对应于`entry`生成的文件名。比如：

```
{
  entry: {
    index: "pages/index.jsx"
  },
  output: {
    filename: "[name].min.js",
    chunkFilename: "[name].min.js"
  }
}
```

生成的文件名是`index.min.js`

- chunkFilename

`chunkFilename`是指那些未被列入`entry`中，却又在需要时被打包出来的文件名配置。什么场景下需要呢？在按需加载（异步）模块的时候，这样的文件是没有被列在`entry`中的，如使用`CommonJS`的方式异步加载模块：

```
require.ensure(['modules/tips.jsx'], function (require) {
  var a = require('modules/tips.jsx');
  // ...
}, 'tips');
```

异步加载的模块是要以文件形式加载，所以这时的文件名就是以`chunkFilename`配置为准，生成的文件名就是`tips.min.js`。

`require.ensure()`的第三个参数就给这个模块命名，否则`chunkFilename: "[name].min.js"`中的`[name]`是一个自动分配、可读性很差的id。
