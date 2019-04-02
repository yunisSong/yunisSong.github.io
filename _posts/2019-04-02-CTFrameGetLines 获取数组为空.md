---
layout:     post
title:      CTFrameGetLines 获取数组为空
subtitle:   在不断填坑中前进。。
date:       2019-04-02
author:     三十一
header-img: img/post-bg-nextgen-web-pwa.jpg
header-mask: 0.3
catalog:    true
tags:
   - 
---

# CTFrameGetLines 获取数组为空

最近在写一个可点击的 `UILabel` 控件，基于 `coretext` 排版，发现有时候使用  `CTFrameGetLines()` 函数获取的行数为空。这种情况是在使用 `autolayout` 时发现的，后面又手动设置 `frame` ，发现当 `frame` 高度设置的值比较小时，就会出现这个问题。最终发现是设置画板时，可绘制的区域高度过小导致无法绘制完成一行导致的。解决办法是，修改画布的大小。


```
    UIGraphicsBeginImageContextWithOptions(self.frame.size, ![self.backgroundColor isEqual:[UIColor clearColor]], 0);
    
    //获取上下文
    context = UIGraphicsGetCurrentContext();
    
    //绘制区域
    CGMutablePathRef path = CGPathCreateMutable();
    //方形
//    CGPathAddRect(path, NULL, rect);
    CGPathAddRect(path, NULL, CGRectMake(0,0,rect.size.width,MAXFLOAT));

    //根据 CTFramesetterRef range 区域 创建 CTFrameRef 对象
    CTFrameRef frame = CTFramesetterCreateFrame(framesetter, textRange, path, NULL);

 
```