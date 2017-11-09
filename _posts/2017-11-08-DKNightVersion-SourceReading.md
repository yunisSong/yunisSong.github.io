---
layout:     post
title:      DKNightVersion 源码学习
subtitle:   在不断填坑中前进。。
date:       2017-11-08
author:     三十一
header-img: img/post-bg-nextgen-web-pwa.jpg
header-mask: 0.3
catalog:    true
tags:
   - iOS
   - 源码
   - 内功
---

# DKNightVersion 源码学习

### 实现原理

1. 建立一个单利存储类，存储颜色值，取颜色是根据主题取。
2. 需要切换颜色的视图，设置颜色时，使用单例类存储视图和设置方法。
3. 当切换颜色模板时，发出通知，遍历单利存储类的内容，修改颜色。


### 学习的细节

原理大概都是这样，关键是细节的处理。


