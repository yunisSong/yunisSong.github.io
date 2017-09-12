---
layout:     post
title:      Swift30Projects
subtitle:   在不断填坑中前进。。
date:       2017-09-08
author:     三十一
header-img: img/in-post/Swift30Projects.jpg
header-mask: 0.3
catalog:    true
tags:
   - Swift
---

# Swift30Projects
[toc]
## 0 GoodAsOldPhones

### 使用 `storyboard` 默认加载 `tabbar`

* 使用 `storyboard` 加载 `tabbar` 时，可以使用 `Editor` -> `Embed In` -> `Tab Bar Controller`

![tabbar](/media/15048621506323/15048622289028.jpg)

### 为 `tabbar` 添加控制器

* 把 `Controller` 加入到 `tabbar` 控制器，需要先选择  `tabbar` 控制器，然后 按着 `Ctrl` 键 拖线到  `Controller`,选择 `View controllers`

![](/media/15048621506323/q.png)

### 类 和 结构 的区别

* 类 和 结构 的区别
    1. Structures
        1. Useful for representing values
        * Implicit copying of values
        * Data is immutable
        * Fast memory allocation (stack)
    * Classes
        1. Useful for representing objects
        * Implicit sharing of objects
        * Data is mutable
        * Slower memory allocation (heap)


###  guard 语句

> 与if语句相同的是，guard也是基于一个表达式的布尔值去判断一段代码是否该被执行。与if语句不同的是，guard只有在条件不满足的时候才会执行这段代码。你可以把guard近似的看做是Assert，但是你可以优雅的退出而非崩溃。

```
func fooGuard(x: Int?) {
    guard let x = x where x > 0 else {
        // 变量不符合条件判断时，执行下面代码
        return
    }

    // 使用x
    x.description
}
```

