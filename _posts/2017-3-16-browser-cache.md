---
layout: post
title: 浏览器缓存机制
date: 2017-3-16
category: 开发者手册
tags: cache
---

## 非HTTP协议定义的缓存机制

浏览器缓存机制，其实主要就是HTTP协议定义的缓存机制（如： Expires； Cache-control等）。但是也有非HTTP协议定义的缓存机制，如使用HTML Meta 标签，Web开发者可以在HTML页面的<head>节点中加入<meta>标签，代码如下：

```
<META HTTP-EQUIV="Pragma" CONTENT="no-cache">
```

上述代码的作用是告诉浏览器当前页面不被缓存，每次访问都需要去服务器拉取。使用上很简单，但只有部分浏览器可以支持，而且所有缓存代理服务器都不支持，因为代理不解析HTML内容本身。

## 大话浏览器缓存

浏览器缓存一直是一个让人又爱又恨的存在，一方面极大地提升了用户体验，而另一方面有时会因为读取了缓存而展示了“错误”的东西，而在开发过程中千方百计地想把缓存禁掉。如果没听说过浏览器缓存或者不知道浏览器缓存的用处，可以先浏览一下这篇文章->Web缓存的作用与类型 。<br/>

那么浏览器缓存机制到底是如何工作的呢？核心就是把缓存的内容保存在了本地，而不用每次都向服务端发送相同的请求，设想下每次都打开相同的页面，而在第一次打开的同时，将下载的js、css、图片等“保存”在了本地，而之后的请求每次都在本地读取，效率是不是高了很多？真正的浏览器工作的时候并不是将完整的内容保存在本地，各种浏览器都有不同的方式，譬如firefox是一种类似innodb的方式存储的key value 的模式，在地址栏中输入 about:cache 可以看见缓存的文件，chrome会把缓存的文件保存在一个叫User Data的文件夹下。但是如果每次都读取缓存也会存在一定的问题，如果服务端的文件更新了呢？这时服务端就会和客户端约定一个有效期，譬如说服务端告诉客户端1天内我服务端的文件不会更新，你就放心地读取缓存吧，于是在这一天里每次遇到相同的请求客户端都开心地可以读取缓存里的文件。但是如果一天过去了，客户端又要读取该文件了，发现和服务端约定的有效期过了，于是就会向服务端发送请求，试图下载一个新的文件，但是很有可能服务端的文件其实并没有更新，其实还是可以读取缓存的。这时该怎么判断服务端的文件有没有更新呢？有两种方式，第一种在上一次服务端告诉客户端约定的有效期的同时，告诉客户端该文件最后修改的时间，当再次试图从服务端下载该文件的时候，check下该文件有没有更新（对比最后修改时间），如果没有，则读取缓存；第二种方式是在上一次服务端告诉客户端约定有效期的同时，同时告诉客户端该文件的版本号，当服务端文件更新的时候，改变版本号，再次发送请求的时候check一下版本号是否一致就行了，如一致，则可直接读取缓存。<br/>

而事实上真正的浏览器缓存机制大抵也是如此，接下来就可以分别对号入座了。<br />

需要注意的是，浏览器会在第一次请求完服务器后得到响应，我们可以在服务器中设置这些响应，从而达到在以后的请求中尽量减少甚至不从服务器获取资源的目的。浏览器是依靠请求和响应中的的头信息来控制缓存的。<br />

## Expires与Cache-Control

Expires和Cache-Control就是服务端用来约定和客户端的有效时间的。

![图片](/img/browser-cache-1.png)

比如如上一个响应头，Expires规定了缓存失效时间（Date为当前时间），而Cache-Control的max-age规定了缓存有效时间（2552s），理论上这两个值计算出的有效时间应该是相同的（上图好像不一致）。Expires是HTTP1.0的东西，而Cache-Control是HTTP1.1的，规定如果max-age和Expires同时存在，前者优先级高于后者。Cache-Control的参数可以设置很多值，譬如（[参考浏览器缓存机制](http://www.cnblogs.com/skynet/archive/2012/11/28/2792503.html)）：

![图片](/img/browser-cache-2.png)

补充：

### no-cache 和 no-store

no-cache表示必须先与服务器确认返回的响应是否被更改，然后才能使用该响应来满足后续对同一个网址的请求。因此，如果存在合适的验证令牌 (ETag)，no-cache 会发起往返通信来验证缓存的响应，如果资源未被更改，可以避免下载。<br />

相比之下，no-store更加简单，直接禁止浏览器和所有中继缓存存储返回的任何版本的响应 - 例如：一个包含个人隐私数据或银行数据的响应。每次用户请求该资源时，都会向服务器发送一个请求，每次都会下载完整的响应。

### public和 private

如果响应被标记为public，即使有关联的 HTTP 认证，甚至响应状态码无法正常缓存，响应也可以被缓存。大多数情况下，public不是必须的，因为明确的缓存信息（例如max-age）已表示 响应可以被缓存。<br />

相比之下，浏览器可以缓存private响应，但是通常只为单个用户缓存，因此，不允许任何中继缓存对其进行缓存 - 例如，用户浏览器可以缓存包含用户私人信息的 HTML 网页，但是 CDN 不能缓存。

### max-age

该指令指定从当前请求开始，允许获取的响应被重用的最长时间（单位为秒） - 例如：max-age=60表示响应可以再缓存和重用 60 秒。

## Last-Modified/If-Modified-Since

而Last-Modified/If-Modified-Since就是上面说的当有效期过后，check服务端文件是否更新的第一种方式，要配合Cache-Control使用。比如第一次访问我的主页simplify the life，会请求一个jquery文件，响应头返回如下信息：

![图片](/img/browser-cache-3.png)

然后我在主页按下ctrl+r刷新，因为ctrl+r会默认跳过max-age和Expires的检验直接去向服务器发送请求（下文再探讨各种刷新后如何读取缓存），我们看看请求截图：

![图片](/img/browser-cache-4.png)

请求头中包含了If-Modified-Since项，而它的值和上次请求响应头中的Last-Modified一致，我们发现这个日期是在遥远的2013年，也就是说这个jquery文件自从2013年的那个日期后就没有再被修改过了。将If-Modified-Since的日期和服务端该文件的最后修改日期对比，如果相同，则响应HTTP304，从缓存读数据；如果不相同文件更新了，HTTP200，返回数据，同时通过响应头更新last-Modified的值（以备下次对比）。

## ETag/If-None-Match

而ETag/If-None-Match则是上文大话中说的第二种check服务端文件是否更新的方式，也要配合Cache-Control使用。实际上ETag并不是文件的版本号，而是一串可以代表该文件唯一的字符串（Apache中，ETag的值，默认是对文件的索引节（INode），大小（Size）和最后修改时间（MTime）进行Hash后得到的。），当客户端发现和服务器约定的直接读取缓存的时间过了，就在请求中发送If-None-Match选项，值即为上次请求后响应头的ETag值，该值在服务端和服务端代表该文件唯一的字符串对比（如果服务端该文件改变了，该值就会变），如果相同，则相应HTTP304，客户端直接读取缓存，如果不相同，HTTP200，下载正确的数据，更新ETag值。

![图片](/img/browser-cache-5.png)

看如上截图，与服务器约定的直接读取本地缓存的时间过了，就会向服务器发送新的请求，请求头中带If-None-Match项，该字符串值会在服务端进行匹配，很显然，并没有什么变化（看响应头的ETag值），于是响应HTTP304，直接读取缓存。或许你会发送该请求也有If-Modified-Since项，如果两者同时存在，If-None-Match优先，忽略If-Modified-Since。或许你会问为什么它优先？两者功能相似甚至相同，为什么要同时存在？HTTP1.1中ETag的出现主要是为了解决几个Last-Modified比较难解决的问题：

1. Last-Modified标注的最后修改只能精确到秒级，如果某些文件在1秒钟以内，被修改多次的话，它将不能准确标注文件的修改时间
2. 如果某些文件会被定期生成，但有时内容并没有任何变化（仅仅改变了时间），但Last-Modified却改变了，导致文件没法使用缓存
3. 有可能存在服务器没有准确获取文件修改时间，或者与代理服务器时间不一致等情形

## 不能缓存的请求

1. HTTP信息头中包含Cache-Control:no-cache，pragma:no-cache（HTTP1.0），或Cache-Control:max-age=0等告诉浏览器不用缓存的请求
2. 需要根据Cookie，认证信息等决定输入内容的动态请求是不能被缓存的
3. 经过HTTPS安全加密的请求（有人也经过测试发现，ie其实在头部加入Cache-Control：max-age信息，firefox在头部加入Cache-Control:Public之后，能够对HTTPS的资源进行缓存，参考[《HTTPS的七个误解》](http://www.ruanyifeng.com/blog/2011/02/seven_myths_about_https.html)）
4. POST请求无法被缓存
5. HTTP响应头中不包含Last-Modified/Etag，也不包含Cache-Control/Expires的请求无法被缓存

## 用户行为与缓存

浏览器缓存过程还和用户行为有关，譬如打开tongji.baidu.com，会请求hm.js，如果直接在地址栏按回车，响应HTTP200；如果F5进行刷新，则会响应HTTP304（Not Modified），虽然还是读取的本地缓存，但是多了一次服务端的请求；而如果是ctrl+F5强刷，则会直接从服务器下载新的文件，响应HTTP200。

![图片](/img/browser-cache-6.png)

通过上表我们可以看到，当用户在按F5进行刷新的时候，会忽略Expires/Cache-Control的设置，会再次发送请求去服务器请求，而Last-Modified/Etag还是有效的，服务器会根据情况判断返回304还是200；而当用户使用Ctrl+F5进行强制刷新的时候，只是所有的缓存机制都将失效，重新从服务器拉去资源。

更多可以参考[浏览器缓存机制](http://www.laruence.com/2010/03/05/1332.html)

## 总结

![图片](/img/browser-cache-7.png)<br />

![图片](/img/browser-cache-8.png)