---
layout:     post
title:      githubPages搭建的博客不能刷新
subtitle:   在不断填坑中前进。。
date:       2022-06-27
author:     三十一
header-img: img/post-bg-nextgen-web-pwa.jpg
header-mask: 0.3
catalog:    true
tags:
   - iOS
---

# githubPages搭建的博客不能刷新

最近零星的修改了一下博客的一些小东西，发现没有生效，就排查了下原因，发现 jekyll 触发编译的时候就出现了问题。

具体看下面的图片，红色标记的地方就是编译失败的操作。
![](../media/githubpages/action-error.png)

点进去可以看到具体的错误原因。
![](../media/githubpages/error.png)

看到具体的错误愿意，去找到这个源文件修复。
![](../media/githubpages/error-des.png)
