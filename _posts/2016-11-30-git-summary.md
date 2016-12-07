---
layout: post
title: git总结
date: 2016-11-20
category: 开发者手册
tags: git
---

## 集中式vs分布式
集中式（SVN）<br>
![图片](/img/git-summary-img1.png)<br>
分布式（git）<br>
![图片](/img/git-summary-img2.png)

## 安装
- 在Linux上安装

  ```
  sudo apt-get install git
  ```
- 在mac os x上安装

  1. 安装`homebrew`，然后通过`homebrew`安装Git<br>
  2. 也是推荐的方法，就是直接从AppStore安装Xcode，Xcode集成了Git，不过默认没有安装，你需要运行Xcode，选择菜单`Xcode->Preferences`，在弹出窗口中找到`Downloads`，选择`Command Line Tools`，点`Install`就可以完成安装了
- 在Windows上安装
msysgit是Windows版的Git，从[https://git-for-windows.github.io](https://git-for-windows.github.io)下载，然后按默认选项安装即可。

- 安装完成后还需要最后一步：
```
$ git config --global user.name "Your Name"
$ git config --global user.email "email@example.com"
```

  因为Git是分布式版本控制系统，所以，每个机器都必须自报家门：你的名字和Email地址。<br>
  注意`git config`命令的`--global`参数，用了这个参数，表示你这台机器上所有的Git仓库都会使用这个配置，当然也可以对某个仓库指定不同的用户名和Email地址。

## 常用命令
1. 初始化版本库


	    $ git init

2. 查看代码库状态

	    $git status

3. 查看工作区和暂存区的区别

	    $ git diff
查看具体某个文件diff：

	    git diff HEAD -- readme.txt

4. 提交到暂存区(stage/index)

	    $ git add
	    // 若大批量 增、删、改文件，显然一个个添加或删除是不可取的，以下命令可快捷操作暂存区
	    $ git add -A ( 暂存区与工作区保持一致（stages All）)
	    $ git add . (暂存区新建文件及更改文件（stages new and modified, without deleted）)
	    $ git add -u (暂存区删除文件及更改文件（stages modified and deleted, without new）)

5. 提交到分支

	    git commit -m '描述信息'

      ![图片](/img/git-summary-img3.png)

6. 查看提交历史记录

	    $ git log
	    commit 27d914abe4f7d5d52f2d565610304dba1f486406
		Author: songjunke <songjunke@baidu.com>
		Date:   Tue Nov 29 13:41:50 2016 +0800

	    add git is a free software

		commit 6dfd663457d4c4b6f5daa55c617e83095fe88244
		Author: songjunke <songjunke@baidu.com>
		Date:   Tue Nov 29 13:40:39 2016 +0800

	    add git test

		commit 08260a8dec70c1911f925a6bd88a9759b81dc72f
		Author: songjunke <songjunke@baidu.com>
		Date:   Tue Nov 29 13:39:31 2016 +0800

	    first commit

7. 记录每一次命令历史

	    $ git reflog
		27d914a HEAD@{0}: reset: moving to 27d914a
		6dfd663 HEAD@{1}: reset: moving to HEAD^
		27d914a HEAD@{2}: commit: add git is a free software
		6dfd663 HEAD@{3}: commit: add git test
		08260a8 HEAD@{4}: commit (initial): first commit





8. 版本回退

	    $ git reset --hard HEAD(或者commit_id)

	总结：
	- HEAD指向的版本就是当前版本，因此，Git允许我们在版本的历史之间穿梭，使用命令`git reset --hard commit_id`。
	- 穿梭前，用`git log`可以查看提交历史，以便确定要回退到哪个版本。
	- 要重返未来，用`git reflog`查看命令历史，以便确定要回到未来的哪个版本。
9. 撤销修改
①修改了但是没有还行`git add`

	    $ git checkout -- file
`git checkout -- file`命令中的`--`很重要，没有`--`，就变成了“切换到另一个分支”的命令，我们在后面的分支管理中会再次遇到git checkout命令。

	命令`git checkout -- readme.txt`意思就是，把`readme.txt`文件在工作区的修改全部撤销，这里有两种情况：

	一种是`readme.txt`自修改后还没有被放到暂存区，现在，撤销修改就回到和版本库一模一样的状态；

	一种是`readme.txt`已经添加到暂存区后，又作了修改，现在，撤销修改就回到添加到暂存区后的状态。

	总之，就是让这个文件回到最近一次`git commit`或`git add`时的状态。

	②修改了，也执行了`git add`（即添加到了暂存区），但是没有执行`git commit`

    $ git reset HEAD file
	可以把暂存区的修改撤销掉，`git reset`命令既可以回退版本，也可以把暂存区的修改回退到工作区。当我们用`HEAD`时，表示最新的版本。

	③已经提交到了版本库，想要撤销本次提交

	    $ git reset --hard HEAD(或commit_id)
10. 删除文件
	①删除版本库中的文件

	    $ git rm file
	    $ git commit -m 'delete file'

	②删错了，需要恢复

	    $ git rm file
	    // 删错了...
	    // 需要恢复
	    $ git checkout -- file

11. 添加远程仓库


        $ git add remote origin git@github.com:drinksong/test.git

    添加后，远程库的名字就是`origin`，这是Git默认的叫法，也可以改成别的，但是`origin`这个名字一看就知道是远程库。

12. 推送到远程库

        $ git push -u origin master

    - 把本地库的内容推送到远程，用`git push`命令，实际上是把当前分支`master`推送到远程。

    - 由于远程库是空的，我们第一次推送`master`分支时，加上了`-u`参数，Git不但会把本地的`master`分支内容推送的远程新的master分支，还会把本地的master分支和远程的master分支关联起来，在以后的推送或者拉取时就可以简化命令。

    - 此后每次提交只需要执行`git push origin master`即可。

13. 从远程克隆

        $ git clone git@github.com:drinksong/test.git

    可以使用`ssh`协议和`https`协议，但是使用`https`除了速度慢以外，还有个最大的麻烦是每次推送都必须输入口令，但是在某些只开放`http`端口的公司内部就无法使用`ssh`协议而只能用`https`。

14. 推送到远端某个分支

        // 推送到远端branch1分支
        $ git push orgin master:branch1

15. 创建于合并分支
      - `master`是主分支，`HEAD`严格来说不是指向提交，而是指向`master`，`master`才是指向提交的，所以，`HEAD`指向的就是当前分支。<br>
    ![图片](/img/git-summary-img4.png)<br>


      - 当我们创建新的分支，例如`dev`时，Git新建了一个指针叫`dev`，指向`master`相同的提交，再把`HEAD`指向`dev`，就表示当前分支在`dev`上：<br>
    ![图片](/img/git-summary-img5.png)


    - 切换到dev分支

          $ git checkout -b dev

    - `git checkout`命令加上`-b`参数表示创建并切换，相当于以下两条命令：

          $ git branch dev
          $ git checkout dev

    - 然后，用`git branch`命令查看当前分支：

          $ git branch

    `git branch`命令会列出所有分支，当前分支前面会标一个`*`号。
    - 现在，`dev`分支的工作完成，我们就可以切换回`master`分支，并把内容合并到`master`分支上：

          $ git checkout master
          $ git merge dev
    - 合并完成后，就可以放心地删除`dev`分支了：

          $ git branch -d dev

16. 查看远程库信息

        $ git remote -v

17. 查看配置文件信息

        cat .git/config

18. 配置子模块

        // 将B仓库添加为A仓库的子模块
        $ git submodule add git@github.com:drinksong/b.git
        // 默认情况下，子模块会将子项目放到一个与仓库名同名的目录中，如本例中的'b'，如果你想放到其他地方，那么可以在命令结尾添加一个不同的路径

        // 查看代码块状态
        $ git status

        new file: .gitmodules
        new b

        // .gitmodule文件保存了项目URL与已经拉取的本地目录之间的映射：
        [submodule "b"]
	    path = b
	    url = ssh://git@github.com:drinksong/b

	    // 虽然b是工作目录中的一个子目录，但是git还是会将它视作一个子模块。当你不在那个目录中时，Git 并不会跟踪它的内容， 而是将它看作该仓库中的一个特殊提交。

	    // 克隆含有子模块的项目
	    // 方法1：
	    $ git clone ssh://git@github.com:drinksong/a.git

	    // 初始化本地配置文件
	    $ git submodule init

	    // 从项目中抓取所有数据并检出父项目中列出的合适提交
	    $ git submodule update

	    // 方法2：
	    $ git clone --recursive ssh://git@github.com:drinksong/a.git

 其他更多操作参考[这里](https://git-scm.com/book/zh/v2/Git-%E5%B7%A5%E5%85%B7-%E5%AD%90%E6%A8%A1%E5%9D%97)。


