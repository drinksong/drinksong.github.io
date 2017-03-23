---
layout: post
title: 弹性盒子语法介绍
date: 2017-3-17
category: css
tags: css
---

## 什么是Flex布局

Flex是Flexible Box的缩写，意为"弹性布局"，它具有定义一个可伸缩项目的能力。

## 定义一个弹性盒子

任何一个容器都可以指定弹性盒子。

```
display: flex;
```

值flex会使弹性容器成为块级元素。

```
display: inline-flex;
```

值inline-flex会使弹性容器成为单个不可分的行内元素。

> 注意：厂商前缀标记会附加给 display 属性值，而不是加给 display 属性本身。例如：display : -webkit-flex。

## 浏览器兼容性

![图片](/img/flex-introduce-1.png)

## 基本概念

![图片](/img/flex-introduce-2.png)

### 弹性容器(Flex container)

包含着弹性项目的父元素。通过设置 display 属性的值为 flex 或 inline-flex 来定义弹性容器。

### 弹性项目(Flex item)

弹性容器的每个子元素都称为弹性项目。弹性容器直接包含的文本将被包覆成匿名弹性单元。

### 轴(Axis)

每个弹性框布局包含两个轴。弹性项目沿其依次排列的那根轴称为主轴(main axis)。垂直于主轴的那根轴称为侧轴(cross axis)。

 - flex-direction 确立主轴。
 - justify-content 定义了在当前行上，弹性项目沿主轴如何排布。
 - align-items 定义了在当前行上，弹性项目沿侧轴默认如何排布。
 - align-self 定义了单个弹性项目在侧轴上应当如何对齐，这个定义会覆盖由 align-items 所确立的默认值。

### 方向(Direction)

弹性容器的主轴起点(main start)/主轴终点(main end)和侧轴起点(cross start)/侧轴终点(cross end)描述了弹性项目排布的起点与终点。它们具体取决于弹性容器的主轴与侧轴中，由 writing-mode 确立的方向（从左到右、从右到左，等等）。

 - order 属性将元素与序号关联起来，以此决定哪些元素先出现。
 - flex-flow 属性是 flex-direction 和 flex-wrap 属性的简写，决定弹性项目如何排布。

### 行(Line)

根据 flex-wrap 属性，弹性项目可以排布在单个行或者多个行中。此属性控制侧轴的方向和新行排列的方向。

### 尺寸(Dimension)

根据弹性容器的主轴与侧轴，弹性项目的宽和高中，对应主轴的称为主轴尺寸(main size) ，对应侧轴的称为 侧轴尺寸(cross size)。

 - min-height 与 min-width 属性初始值将为 0。
 - flex 属性是 flex-grow、flex-shrink 和 flex-basis 属性的简写，描述弹性项目的整体的伸缩性。

## 容器属性

以下6个属性设置在容器上。

- flex-direction
- flex-wrap
- flex-flow
- justify-content
- align-items
- align-content

### flex-direction

```
flex-direction: row | row-reverse | column | column-reverse;
```

- row(default): (主轴为水平方向，起点在左端。)

![图片](/img/flex-introduce-3.png)

- row-reverse: (主轴为水平方向，起点在右端。)

![图片](/img/flex-introduce-4.png)

- column: (主轴为垂直方向，起点在上沿。)

![图片](/img/flex-introduce-5.png)

- column-reverse: (主轴为垂直方向，起点在下沿。)

![图片](/img/flex-introduce-6.png)


### flex-wrap

默认情况下，弹性项目都排在一条直线上，该属性定义了如何换行。

```
flex-wrap: nowrap | wrap | wrap-reverse;
```

- nowrap(default): (不换行)

弹性容器宽度是500px，弹性项目宽度设置为100px，此处并没有换行，而是把项目容器压缩了。

![图片](/img/flex-introduce-7.png)

- wrap: (换行，而且第一行在上方)

![图片](/img/flex-introduce-8.png)

- wrap-reverse: (换行，但是第一行在下方)

![图片](/img/flex-introduce-9.png)


### flex-flow

该属性是flex-direction和flex-wrap的简写，默认为`flex-flow: row nowrap;`

### jusitfy-content

该属性定义了在主轴上的对齐方式。

```
justify-content: flex-start | flex-end | center | space-between | space-around;
```

- flex-start(default): (左对齐)

![图片](/img/flex-introduce-10.png)

- flex-end: (右对齐)

![图片](/img/flex-introduce-11.png)

- center: (居中)

![图片](/img/flex-introduce-12.png)

- space-between: (两端对齐，项目中间间隔相等)

![图片](/img/flex-introduce-13.png)

- space-around: (每个项目两侧间隔相等)

![图片](/img/flex-introduce-14.png)

### align-items

该属性定义项目交叉轴（纵轴）上如何对齐，以下叫纵轴，方便理解。

```
align-items: flex-start | flex-end | center | baseline | stretch;
```

- stretch(default): (如果没有设置高度或者设置为auto，会占满整个容器高度)

![图片](/img/flex-introduce-19.png)

- flex-start: (纵轴起点对齐)

![图片](/img/flex-introduce-15.png)

- flex-end: (纵轴终点对齐)

![图片](/img/flex-introduce-16.png)

- center: (纵轴中点对齐)

![图片](/img/flex-introduce-17.png)

- baseline: (项目第一行文字的基线对齐)，对基线基线不了解的可以看[这篇文章](http://www.zhangxinxu.com/wordpress/2010/05/%E6%88%91%E5%AF%B9css-vertical-align%E7%9A%84%E4%B8%80%E4%BA%9B%E7%90%86%E8%A7%A3%E4%B8%8E%E8%AE%A4%E8%AF%86%EF%BC%88%E4%B8%80%EF%BC%89/)

![图片](/img/flex-introduce-18.png)

### align-content

该属性定义了多根轴线的对齐方式，如果项目只有一根轴线，该属性不起作用

```
align-content: flex-start | flex-end | center | space-between | space-around | stretch;
```

- stretch(default): (轴线占满整个纵轴)

![图片](/img/flex-introduce-20.png)

- flex-end: (纵轴起点对齐)

![图片](/img/flex-introduce-21.png)

- flex-end: (纵轴终点对齐)

![图片](/img/flex-introduce-22.png)

- center: (纵轴中点对齐)

![图片](/img/flex-introduce-23.png)

-space-between: (与交叉轴两端对齐，轴线之间的间隔平均分布)

![图片](/img/flex-introduce-23.png)

- space-around: (每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍)

![图片](/img/flex-introduce-24.png)





