---
layout: post
title: react组件的生命周期
date: 2016-12-12
category: Javascript
tags: react
---
## 生命周期图

![图片](/img/react-life-circle.png)

## 组件首次加载

- `getDefaultProps`只会在装载之前调动一次，在组件中赋值的数据会被设置到`this.props`中。

- `getInitialState`只会在装载之前调用一次，这个函数的返回值会被设置到`this.state`中。需要注意的是，在`ES6`的写法中，只需要写在`constructor`中即可，如下：

```
class MyComponent extends React.component {
    constructor(props) {
        super(props);
        // 在这里声明state
        this.state = {};
    }
}
```

- `componentWillMount`在`render`之前被调用，可以在渲染之前做一些准备工作。

- `render`这个方法是组件的一个必要方法。当这个方法被调用的时候，应该返回一个`ReactElement`对象。`render`是一个纯函数，它的意义是在给定相同的条件时，它的返回结果应该每次都是完全一致的。不应该有任何修改组件`state`的代码或者是和浏览器交互的情况。

- `componentDidMount`是会在装载完成之后调用一次，在`render`之后调用，从这里开始获取组件的`DOM`结构。如果想让组件加载完毕之后做一些额外的操作（比如`ajax`请求等），可以在这个方法中添加相应的代码。

## 组件`props`更新

当组件接受到新的`props`的时候，会依次触发下列方法。

- `componentWillReceiveProps(object nextProps)`，在组件接收到新的`props`的时候被触发，参数`nextProps`就是传入的心的`props`，你可以用它和`this.props`比较，来决定是否用`this.setState`实现`UI`重新渲染。

- `shouldComponentUpdate`，在重新`render`之前被调用，可以返回一个布尔值来决定组件是否需要更新，如果返回`false`，那么前面的流程都不会触发，这个方法默认返回值都是`true`。

- `componentWillUpdate`，在`render`之前被调用，可以在渲染之前做一些准备工作，和`componentWillMount`类似。

- `render`，和组件首次加载的方法相同。

- `componentDidUpdate`，重新渲染完成以后立即调用，和`componentDidMount`类似。

## 组件卸载

`componentWillUnmount`，在组件被卸载和销毁之前调用的方法，可以在这里做一些清理工作。

