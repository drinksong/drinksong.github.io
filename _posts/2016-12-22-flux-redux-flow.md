---
layout: post
title: flux和redux流程
date: 2016-12-12
category: Javascript
tags: react
---

## Flux流程
单向数据流是`Flux`的核心。而早些时候我们接触过的`MVC`架构的数据流是双向的。`controller`是`model`和`view`之间交互的媒介，它处理`view`的交互操作，通知`model`进行更新，同时在操作成功后通知`view`更新。

![图片](/img/flux-flow.png)

- Action

`Action`就是用来描述一个行为的对象，里面有相关的信息，比如说一个创建文章的`Action`可以是`{ actionName: 'create-post', data: {content: 'new stuff'} }`

- Dispatcher

`Dispatcher`是一个信息的分发中心，它也是`Action`和`Store`的连接中心，`Dispatcher`可以使用`dispatch`方法执行一个`Action`，并且可以用`register`方法注册回调，在回调方法中处理`Store`内容

- Store

`Store`处理完毕之后，它可以使用`emit`方法向其他地方发送命名为`change`的广播，告诉它们`Store`已经发生变更

- View

`View`层坚挺这次`change`事件，一旦`change`事件被触发，那么该层就可以调用`setState`来更新整个`UI`

## Redux流程
待补充