---
layout:     post
title:      iOS 基础知识之--autorelease
subtitle:   在不断填坑中前进。。
date:       2018-03-12
author:     三十一
header-img: img/post-bg-nextgen-web-pwa.jpg
header-mask: 0.3
catalog:    true
tags:
   - iOS
---

# iOS 基础知识之--autorelease

#### 先来看一个问题


分别在在 `MRC` 和 `ARC` 情况下，下面的两段代码，会不会会引起内存的暴涨？

```objective_c

- (void)demo2{
    for (int i = 0; i < 100000000; i++) {
        NSString *yunis = [NSString stringWithFormat:@"Yunis"];
    }
}

- (void)demo3{
    for (int i = 0; i < 100000000; i++) {
        NSString *yunisAlloc = [[NSString alloc] initWithFormat:@"YunisAlloc"];
    }
}

```


![老流氓手动分割问题答案](/media/15208165720124/Jordan.jpeg)




---

> 测试环境： Xcode 9.1 | iPhone 8 Plus(模拟器) | iOS 11.1

---

公布答案：

* `MRC` 下：
    1. demo2 
        ![](/media/15208165720124/15208195864460.jpg)

    2. demo3
        ![](/media/15208165720124/15208196265833.jpg)


* `ARC` 下：
    1. demo2
        ![](/media/15208165720124/15208195271081.jpg)

    2. demo3
    ![](/media/15208165720124/15208194888044.jpg)



在 `ARC` 下，内存差别是不大的，但是在 `MRC` 的情况下，`demo3` 的代码会导致内存疯狂增长。为什么呢？
这里我们猜想：是因为 `stringWithFormat` 方法返回的对象是有一个 `_autorelease` 属性修饰的。所以 `demo2` 中的 `yunis`，会自动释放，这就是为什么 `demo2` 在 `ARC` 和 `MRC` 下内存都变化不大的原因，而 ` alloc] initWithFormat ` 返回的对象是没有 `_autorelease` 修饰的，所以他不会自动释放，需要我们手动调用 `autorelease` ，才能释放。真的是因为这样吗？


#### 初识 `autorelease`


接着上一个问题，在 `MRC` 下，我们小小的修改下 `demo3` 代码，变为：


```objective_c
- (void)demo3{
    for (int i = 0; i < 100000000; i++) {
        NSString *yunisAlloc = [[NSString alloc] initWithFormat:@"YunisAlloc"];
        [yunisAlloc autorelease];
    }
}
```

再来看下内存的情况：

![](/media/15208165720124/15208201049553.jpg)


额，内存依然在疯狂的增长，如果我们把 `autorelease` 换为 `release` 呢？


```objective_c
- (void)demo3 {
    for (int i = 0; i < 100000000; i++) {
        NSString *yunisAlloc = [[NSString alloc] initWithFormat:@"YunisAlloc"];
        [yunisAlloc release];
    }
}
```
![](/media/15208165720124/15208204179320.jpg)

这时我们发现，内存回到一个正常的状态。

那么问题来了？为什么 `autorelease` 没用使内存降下来，而 `release` 可以呢？

难道跟传说中的自动释放池有关系？

进一步的，我们再次修改下 `demo3` 代码：

```objective_c
- (void)demo3 {
    
    @autoreleasepool{
        for (int i = 0; i < 100000000; i++) {
            NSString *yunisAlloc = [[NSString alloc] initWithFormat:@"YunisAlloc"];
            [yunisAlloc autorelease];
        }
    }

}


```


![](/media/15208165720124/15208334393921.jpg)


握草！！！ 我都加了  `autorelease` 和 `@autoreleasepool`了，为什么内存还是没有降下去？？

然后我去读了经典书籍：`《Objective-C高级编程：iOS与OS X多线程和内存管理》`。

----

![人丑就要多读书](/media/15208165720124/rc.jpg)

我读书回来了。

![我回来装逼了](/media/15208165720124/zb.jpg)


####  `autorelease` 对象什么时候释放？

在 `《Objective-C高级编程：iOS与OS X多线程和内存管理》` 是这样说的：
> `NSAutoreleasePool` 对象的生存周期相当于 C 语言变量的作用域。对于调用 `autorelease` 实例方法的对象，在废弃 `NSAutoreleasePool` 对象时，都将调用 `release` 实例方法。


那么现在来看为什么我们的 demo3 加了 `NSAutoreleasePool` 和  `autorelease` 后内存依然没有降低的原因就清晰明了了。修改代码：


```objective_c
- (void)demo3 {
    for (int i = 0; i < 100000000; i++)
    {
        @autoreleasepool {
            NSString *yunisAlloc = [[NSString alloc] initWithFormat:@"YunisAlloc"];
            [yunisAlloc autorelease];
        }
    }

}

```
![](media/15208165720124/15209243952932.jpg)


内存回到一个正常的状态。


OK ，让我们来理一下思路。

对于 demo2 中的代码，因为返回的是一个使用 `_autorelease` 修饰的对象，已经自动加入释放池了，所以内存没有显著的增长。

但是对于一个 `alloc init` 生成的实例变量，在 `MRC` 下需要用户手动的管理引用计数，同时对于短时间大量生成的局部变量，应及时的释放其内存。对于调用 `autorelease` 实例方法的实例对象，会在自动释放池 `drain` 后，才调用实例对象的 `release` 实例方法。
那么，在 `ARC` 下，系统对 `demo3` 为我们做了什么？跟我们自己在 `MRC` 编写的代码逻辑一致吗？

同时，返回 `_autorelease` 修饰的实例是加入了那个自动释放池？这个自动释放池的生存周期又是什么样的？它为什么没有造成大量的内存增长？

![](/media/15208165720124/15209960318680.jpg)



**这个结论对 `UIView` 好像不成立！！！！！**
**这个结论对 `UIView` 好像不成立！！！！！**
**这个结论对 `UIView` 好像不成立！！！！！**
**这个结论对 `UIView` 好像不成立！！！！！**
**这个结论对 `UIView` 好像不成立！！！！！**
**这个结论对 `UIView` 好像不成立！！！！！**



**挖槽 这个问题挖下去 好像 还得看看 runLoop ！！！**


1. 为什么 uiview 在 autoreleasepool 不生效？
2. _autorelease 修饰的实例 是存在于那个 autoreleasepool？

**我TM好像给自己挖了一个深坑！！！！！！**


去 孙源大神的博客研究下：

https://blog.sunnyxx.com/2014/10/15/behind-autorelease/

