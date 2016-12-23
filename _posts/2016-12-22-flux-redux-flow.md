---
layout: post
title: Flux和Redux流程
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

`Redux`使用了类似于`Flux`的单向数据流，但是它只有一个单一的`store`对象，而且`Redux`中没有`Dispatcher`。当`action`需要被执行的时候，`store`提供的`dispatch`方法会被执行，将`action`以及`state`作为参数，返回新的`state`。

![图片](/img/redux-flow.png)

Redux中文文档:[http://cn.redux.js.org/](http://cn.redux.js.org/)<br>
Redux英文原版:[http://redux.js.org/](http://redux.js.org/)

流程有以下几步：

- action

`action`是信息的载体，里面有`action`的名称和要传递的信息，然后可以被传递到`store`中去。

```
// 对action命名
const CREATE_POST = 'CREATE_POST';
const DELETE_POST = 'DELETE_POST';
const USER_LOGIN = 'USER_LOGIN';


// 构造action creator，用来创建不同的action
function createPost(data) {
    return {
        type: CREATE_POST,
        data: data
    }
}

function deletePost(data) {
    return {
        type: DELETE_POST,
        data: data
    }
}

function userLogin(data) {
    return {
        type: USER_LOGIN,
        data: data
    }
}


```

在`Flux`中，一个`action creator`不会返回一个`action`，通常是调用`Dispatcher`的`dispatch`方法。

```
import AppDispatcher from '../dispatcher/AppDispatcher';

const TodoAction = {
    create(data) {
          AppDispatcher.dispatch({
              actionType: 'CREATE_POST',
              data
        });
    },
    delete(data) {
          AppDispatcher.dispatch({
              actionType: 'DELETE_POST',
              data
        });
    }
};

export default TodoAction;
```


- reducer

`action`定义了要执行的操作，但是没有规定`state`如何变化，`reducer`的任务就定义整个程序`state`如何变化。

在`Redux`中，整个程序的所有数据存储在一个唯一一个`Object`中。这是`Redux`不同于`Flux`的一个重要特性，`Flux`可以有多个`store`来处理不同类型的数据，而`Redux`整个应用程序的`state`都在一个单独的`Object`中。

```
// 将最初的结构分解为两个分离的state
const initalPostStates = [];
const initalUserStates = {
    isLogin: false,
    userData: {

    }
}

function posts(state = initalPostStates, action) {
    switch(action.type) {
        case CREATE_POST:
            return [...state, action.data];
        case DELETE_POST:
            return state.filter((post) => {
                return post.id != action.id
            });
        default:
            return state;
    }
}

function user(state = initalUserStates, action) {
    switch(action.type) {
        case USER_LOGIN:
            return Object.assign({}, state, {
                isLogin: true,
                userData: action.data
            });
        default:
            return state;
    }
}

```

<br>
> 特别注意：不能改变`state`值。在上面函数中，每次返回的都是全新的对象，而不是直接改变`state`值。

合并`reducer`：

```
// 将两个reducer合并
function rootReducer(state = initalState, action) {
    return: {
        posts: posts(state.posts, action)
        user: user(state.user, action)
    };
}

// Redux提供来一个函数用来合并
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    posts,
    user
});

```

- store

`store`其实是`action`和`reducer`的粘合剂，完成以下任务：

- 保存整个程序的`state`

- 通过`getState()`方法访问`state`的值

- 通过`dispatch()`方法执行一个`action`

- 通过`subscribe()`方法注册回调，监听`state`的变化

```
import { createStore } from 'redux';

// 创建store，以reducer这个纯函数作为参数
let store = createStore(rootReducer);
```


流程大概分为以下几步：

- 调用`store.dispatch(action)`来执行一个`action`

- `store`调用传入的`reducer`函数处理`action`

- `reducer`处理`action`并返回新的`state`

- `store`保存`reducer`返回的完整`state`，可以根据`store.getState()`获取当前`state`，也可以通过`store.subscribe(listener)`来监听`state`的变化
