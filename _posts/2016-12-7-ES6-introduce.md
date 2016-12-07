---
layout: post
title: ES6 基本语法
date: 2016-12-07
category: Javascript
tags: Javascript
---
## 语言特性
1.const let关键字
众所周知，在`Javascript`中，变量默认是全局性的，只存在函数级作用域，声明函数曾经是创造作用域的唯一方法，不存在块级作用域，在ES6提出了`let`关键词是这个缺陷得到了修复。
```
if (ture) {
    let a = 'name';
}
console.log(a);
// ReferenceError: a is not defined
```
同时还引入了`const`，用来定义一个变量，一旦定义以后不可以修改，不过如果是引用类型，那么可以改变它的属性。
```
const MYNAME = 'drink';
MYNAME = 'song';
// 'CONSTANT' is ready-only
const MYNAME = {foo: 'drink'};
MYNAME.foo = 'song';
// 可以正常运行
```

2.函数

- 箭头函数

  箭头函数是一种简单的函数声明方式，可以把它看做一种语法糖，箭头函数永远是匿名的。

```
let add = (a, b) => { return a + b; }
// 当后面是表达式的时候，可以简写成
let add = (a, b) => a + b;
// 等同于
let add = function (a, b) {
  return a + b;
}
// 在回调函数中应用
let numbers = [1, 2, 3];
let doubleNumbers = numbers.map((number) => number + 2);
console.log(doubleNumbers);
// [2, 4, 6]

```

- this在箭头函数中的使用

  在工作中经常会遇到这样的问题，就是`this`在一个对象方法的嵌套函数中

```
let age = 2;
let kitty = {
  age: 1,
  grow: function () {
      setTimeout(function () {
          console.log(++this.age);
      }, 100);
  }
}

kitty.grow();
// 3
```

在对象方法的嵌套函数中，`this`会指向`global`对象，这被看做是`Javascript`在设计上的一个重大缺陷，一般都会采用`hack`来解决它，如下。

```
let kitty = {
    age: 1,
    grow: function () {
        const self = this;
        setTimeout(function () {
            console.log(++self.age);
        }, 100);
    }
}

// 或者

let kitty = {
    age: 1,
    grow: function () {
        setTimeout(function () {
            console.log(this.age);
        }.bind(this), 100);
    }
}
```

现在有了箭头函数，可以很轻松解决这个问题。
```
let kitty = {
    age: 1,
    grow: function () {
        setTimeout(() => {
            console.log(this.age);
        }, 100);
    }
}
```

- 函数默认参数

ES6没有出现之前，面对默认参数我们不得不采用各种`hack`，比如说`values = values || []`。现在一切变得很轻松：

```
function desc(name = 'Perter', age = 5) {
    return name + ' is ' + age + ' years old'.
}

desc();

```

- Rest参数

当一个函数的最后一个参数有`'...'`这样的前缀，它就会变成一个参数的数组。

```
function test(...args) {
    console.log(args);
}

test(1, 2, 3);
// [1, 2, 3]

function test2 (name, ...args) {
    console.log(args);
}

test2('Peter', 2, 3);
// [2, 3]
```

它和`arguments`的区别如下：①`Rest`参数只是没有指定变量名称的参数数组，而`arguments`是所有参数的集合；②`arguments`对象不是一个真正的数组，而`Rest`参数是一个真正的数组；

3.展开操作符
`...`操作符被称为展开操作符，允一个表达式在某处展开，在存在多个参数（用于函数调用）、多个元素（用于数组字面量）或者多个变量（用于解构赋值）的地方就会出现这种情况。

- 用于函数调用

如果在之前的`Javascript`中，想让函数把一个数组一次作为参数进行调用，一般会如下操作。

```
function test(x, y, z) {};
var args = [1, 2, 4];
test.apply(null, args);
```

有了ES6的展开运算符，可以简化这个过程。

```
function test(x, y, z) {};
var args = [1, 2, 4];
test(...args);
```

- 用于数组字面量

在之前的版本中，如果想创建含有某些元素的新数组，常常会用到`splice`，`concat`，'push'等方法：

```
var arr1 = [1, 2, 3];
var arr2 = [4, 5, 6];
var arr3 = arr1.concat(arr2);

console.log(arr3);
// [1, 2, 3, 4, 5, 6]
```

使用展开运算符简便多了：

```
var arr1 = [1, 2, 3];
var arr2 = [4, 5, 6];
var arr3 = [...arr1, ...arr2];

console.log(arr3);
// [1, 2, 3, 4, 5, 6]
```

4.模板字符串

```
// 之前总会这么做
var name = 'song';
var a = 'My name is ' + name + '!';

// 多行字符串
var longStory = 'This is a long story,'
    + 'this is a long story,'
    + 'this is a long story';

// 有了ES6
let name = 'song';
let a = `My name is ${name}!`;
let longStory = `This is a long story,
    this is a long story,
    this is a long story,`;
```

5.解构赋值
解构语法可以快速从数组或者对象中提取变量，可以用一个表达式读取整个解构。

- 解构数组

```
let foo = ['one', 'two', 'three'];

let [one, two, three] = foo;

console.log(`${one}, ${two}, ${three}`);
```

- 解构对象

```
let person = {name: 'song', age: 20};
let {name, age} = person;

console.log(`${name}, ${age}`);

// song, 20
```

解构赋值可以看做一种语法糖，它受`Python`语言的启发，可以提高效率。

6.类
ES6提供了`class`这个语法糖，让开发者可以模仿其他语言类的声明方式，看起来更加明确清晰。

```
class Animal {
    // 构造函数
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    shout() {
        return `My name is ${this.name}, age is ${this.age}`;
    }

    // 静态方法
    static foo() {
        return 'Here is a static method';
    }
}

const cow = new Animal('betty', 2);
cow.shout();

// My name is betty, age is 2
Animal.foo();
// Here is a static method

class Dog extends Animal {
    constructor(name, age = 2, color = 'black') {
        // 在构造函数中可以直接调用super方法
        super(name, age);
        this.color = color;
    }
    shout() {
        // 在非构造函数中不能直接使用super方法
        // 但是可以采用super(). + 方法名字调用父类方法
        return super.shout() + `, color is ${this.color}`;
    }
}

const jackTheDog = new Dog('jack');

jackTheDog.shout();

// My name is jack, age is 2, color is black
```

7.模块
在ES6之前，`Javascript`并没有对模块有任何定义，伴随着`Require.js`的流行，它所推崇的`AMD`成为开发者的首选，在这之后`Node.js`诞生又带来了`CommonJS`，再后来`broswerify`的诞生，让浏览器开发也能有这种格式，直到ES6出现，模块这个观念才真正有了语言特性的支持。

```
// hello.js
// 定义一个命名为hello的函数
function hello() {
    console.log('Hello ES6');
}

// 使用export导出这个模块
export hello;

// main.js
// 使用import加载这个模块
import { hello } from './hello';
hello();

// Hello ES6
```

也可以完成一个模块的多个导出：

```
// hello.js
export const PI = 3.14;
export function hello() {
    console.log('Hello ES6');
}
export let person = {name: 'song'};

// main.js
// 使用对象解构赋值加载这3个变量
import { PI, helllo, person } from './hello';

// 也可以全部导出
import * as util from './hello';
console.log(url.PI);

// 3.14
```

也可以使用`default`实现默认导出

```
// hello.js
export default function () {
    console.log('Hello ES6');
}

// main.js
import hello from './hello'
hello();
// Hello ES6
```

持续补充...
