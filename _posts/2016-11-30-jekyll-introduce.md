---
layout: post
title: Jekyll 搭建个人博客
date: 2016-11-20
category: 工具
tag: Jekyll
---

## Jekyll 介绍
&nbsp;&nbsp;&nbsp;&nbsp;Jekyll 是一个简单的博客形态的静态站点生产机器。它有一个模版目录，其中包含原始文本格式的文档，通过 [Markdown](http://www.markdown.cn/) （或者 Textile） 以及 Liquid 转化成一个完整的可发布的静态网站，你可以发布在任何你喜爱的服务器上。Jekyll 也可以运行在[GitHub Page](https://pages.github.com/)上，也就是说，你可以使用 GitHub 的服务来搭建你的项目页面、博客或者网站，而且是完全免费的。

&nbsp;&nbsp;&nbsp;&nbsp;使用 Jekyll 搭建博客之前要确认下本机环境，Git 环境（用于部署到远端）、Ruby 环境（Jekyll 是基于 Ruby 开发的）、包管理器 RubyGems。

&nbsp;&nbsp;&nbsp;&nbsp;Jekyll 是一个免费的简单静态网页生成工具，可以配合第三方服务例如： Disqus（评论）、多说(评论) 以及分享 等等扩展功能，Jekyll 可以直接部署在 Github（国外） 或 Coding（国内） 上，可以绑定自己的域名。[Jekyll中文文档](http://jekyll.com.cn/)、[Jekyll英文文档](https://jekyllrb.com/)、[Jekyll主题列表](http://jekyllthemes.org/)。

## Jekyll 环境配置

安装Jekyll

```
$ gem install jekyll
```

创建博客

```
$ jekyll new myBlog
```

进入博客目录

```
$ cd myBlog
```

启动本地服务

```
$ jekyll serve
```

在浏览器中输入: [http://localhost:4000](http://localhost:4000)，就可以看到博客效果了。<br>

![myBlog](/img/jekyll_introduce_img1.png)


## 把博客部署到github pages
&nbsp;&nbsp;&nbsp;&nbsp;首先需要注册一个github账号，然后创建一个这样的仓库yourusername.github.io，创建好之后把刚才建好的myBlog项目push到这个仓库里去，过一会儿就可以通过访问yourusername.github.io来访问你的博客了。

## 应用Jekyll Themes
找到喜欢的模板，clone到本地

```
$ git clone git@github.com:drinksong/jekyll-theme-EasyBook.git myBlog
```

执行以下操作

```
$ cd myBlog
$ git remote add blog git@github.com:yourname/yourname.github.io
$ git checkout -b master
$ git push -f -u blog master
```

修改_config.yml，如果你的网址是http://yourname.github.io，则需要把baseUrl设置为空：

```
url: "http://yourname.github.io"
baseUrl: ""
```

如果你的网址为http://yourname.github.io/test/，则需要设置为：

```
url: "http://yourname.github.io"
baseUrl: "/test"
```

## 编辑博客内容
&nbsp;&nbsp;&nbsp;&nbsp;所有的文章都是 _posts 目录下面，文章格式为 mardown 格式，文章文件名可以是 .mardown 或者 .md。<br>
&nbsp;&nbsp;&nbsp;&nbsp;编写一篇新文章很简单，你可以直接从 _posts/ 目录下复制一份出来 2016-11-30-welcome-to-jekyll副本.markdown ，修改名字为 2016-11-30-article1.markdown ，注意：文章名的格式前面必须为 2016-11-30- ，日期可以修改，但必须为 年-月-日- 格式，后面的 article1 是整个文章的连接 URL，如果文章名为中文，那么文章的连接URL就会变成这样的：http://drinksong.github.io/2016/11/%E6%90%AD%E5/ ， 所以建议文章名最好是英文的或者阿拉伯数字。 双击 2016-11-30-article1.markdown 打开

```
---
layout: post
title:  "Welcome to Jekyll!"
date:   2016-11-30 11:29:08 +0800
categories: jekyll update
---
文章正文...
```

- layout: 使用模板文件，模板均放在`_layout`下
- title: 显示的文章名， 如：title: 我的第一篇文章
- date: 显示的文章发布日期，如：date: 2016-11-30
- categories: tag标签的分类，如：categories: 随笔

更多头信息设置请参考[这里](http://jekyll.com.cn/docs/frontmatter/)
