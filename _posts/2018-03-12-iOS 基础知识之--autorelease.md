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

```

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
|
|
|
    |
|
|
|
|
|

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

`ARC` 和 `MRC` 下这段代码有什么区别呢？


在 `ARC` 下，内存差别是不大的，但是在 `MRC` 的情况下，`demo3` 的代码会导致内存疯狂增长。为什么呢？
这里我们猜想：是因为 `stringWithFormat` 方法返回的对象是有一个 `_autorelease` 属性修饰的。所以 `demo2` 中的 `yunis`，会自动释放，这就是为什么 `demo2` 在 `ARC` 和 `MRC` 下内存都变化不大的原因，而 ` alloc] initWithFormat ` 返回的对象是没有 `_autorelease` 修饰的，所以他不会自动释放，需要我们手动调用 `autorelease` ，才能释放。真的是因为这样吗？


#### 初识 `autorelease`


接着上一个问题，在 `MRC` 下，我们小小的修改下 `demo3` 代码，变为：


```
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


```
- (void)demo3 {
    for (int i = 0; i < 100000000; i++) {
        NSString *yunisAlloc = [[NSString alloc] initWithFormat:@"YunisAlloc"];
        [yunisAlloc release];
    }
}
```
![](/media/15208165720124/15208204179320.jpg)

这时我们发现，内存才回到一个正常的状态？

那么问题来了？为什么 `autorelease` 没用使内存降下来，而 `release` 可以呢？

难道跟传说中的自动释放池有关系？

进一步的，我们再次修改下 `demo3` 代码：

```
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

然后我去读了经典书籍：《Objective-C高级编程：iOS与OS X多线程和内存管理》。
####  `autorelease` 对象什么时候释放？


##### `release` 的流程



