---
layout:     post
title:      iOS 11、iPhone X、Xcode9适配
subtitle:   在不断填坑中前进。。
date:       2017-09-20
author:     三十一
header-img: img/post-bg-nextgen-web-pwa.jpg
header-mask: 0.3
catalog:    true
tags:
   - iOS
---

# iOS 11、iPhone X、Xcode9适配

遇到的问题

### 1 启动图变形。

项目采用的是 `LaunchScreen.storyboard` 当启动视图，`LaunchScreen.storyboard`里面加载一个图片填充了整个视图，由于之前的 `iPhone` 宽高比例差别不到，也就没有注意到图片的变形，今天 在 `iPhone X` 上图片变形严重。
解决方案：

    1. 使用 `LaunchImage`，但是美工需要切各个不同 `iPhone` 的图片。
    2. 使用 `LaunchScreen.storyboard`，重新设置 图片的约束。设置left、right、top与视图相同，比例设置为原图片比例。然后视图背景设置为与图片边框相同的背景。


### 2 导航视图上移，被 刘海遮挡


### Xcode 
多开模拟器
模拟器拖拽安装app
调节模拟器大小 可以拖拽模拟器边角调节


