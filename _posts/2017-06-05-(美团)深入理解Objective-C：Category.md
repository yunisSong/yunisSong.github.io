---
layout:     post
title:      (美团)深入理解Objective-C：Category
subtitle:   在不断填坑中前进。。
date:       2017-06-05
author:     三十一
header-img: img/post-bg-nextgen-web-pwa.jpg
header-mask: 0.3
catalog:    true
tags:
   - iOS
---
[TOC]
# (美团)深入理解Objective-C：Category

> 原文地址：[深入理解Objective-C：Category](http://tech.meituan.com/DiveIntoCategory.html)

### Category 的其他使用场景
* 可以把类的实现分开在几个不同的文件里面。这样做有几个显而易见的好处:
    1. 可以减少单个文件的体积 
    2. 可以把不同的功能组织到不同的 category 里 
    3. 可以由多个开发者共同完成一个类 
    4. 可以按需加载想要的 category 等等。
* 声明私有方法
* 模拟多继承
* 把 framework 的私有方法公开


### Category 和 Extension

#### Extension
> extension 看起来很像一个匿名的category，但是 extension 和有名字的 category 几乎完全是两个东西。  extension 在编译期决议，它就是类的一部分，在编译期和头文件里的 @interface 以及实现文件里的 @implement 一起形成一个完整的类，它伴随类的产生而产生，亦随之一起消亡。 extension 一般用来隐藏类的私有信息，你必须有一个类的源码才能为一个类添加 extension ，所以你无法为系统的类比如 NSString 添加 extension。

#### category
> 但是category则完全不一样，它是在运行期决议的。
就category和extension的区别来看，我们可以推导出一个明显的事实，extension可以添加实例变量，而category是无法添加实例变量的（因为在运行期，对象的内存布局已经确定，如果添加实例变量就会破坏类的内部布局，这对编译型语言来说是灾难性的）。

更直观的表示：

![ScopeChain](/img/in-post/Extension&Category/Extension&Category.png)

