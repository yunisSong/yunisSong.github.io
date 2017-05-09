---
layout:     post
title:      (转)Tips:取消UICollectionView的隐式动画
subtitle:   在不断填坑中前进。。
date:       2017-05-09
author:     三十一
header-img: img/home-bg-o.jpg
header-mask: 0.3
catalog:    true
tags:
   - 动画
   - Tips
---

# (转)Tips:取消UICollectionView的隐式动画
> 原文地址在串哥的博客 [Tips:取消UICollectionView的隐式动画](http://adad184.com/2015/11/10/disable-uicollectionview-implicit-animation/)

UICollectionView在 `reloadItems` 的时候 默认会附加一个隐式的fade动画 有时候很讨厌 尤其是当你的cell是复合cell的情况下 (比如cell使用到了UIStackView)

下面几种方法都可以帮你去除这些动画

```
//方法一
[UIView performWithoutAnimation:^{

    [collectionView reloadItemsAtIndexPaths:@[[NSIndexPath indexPathForItem:index inSection:0]]];
}];

//方法二
[UIView animateWithDuration:0 animations:^{
    [collectionView performBatchUpdates:^{
        [collectionView reloadItemsAtIndexPaths:@[[NSIndexPath indexPathForItem:index inSection:0]]];
    } completion:nil];
}];
    
//方法三
[UIView setAnimationsEnabled:NO];
[self.trackPanel performBatchUpdates:^{
    [collectionView reloadItemsAtIndexPaths:@[[NSIndexPath indexPathForItem:index inSection:0]]];
} completion:^(BOOL finished) {
    [UIView setAnimationsEnabled:YES];
}];
```
如果你的APP只支持iOS7+ 推荐使用第一种方式 `performWithoutAnimation` (感谢@sunnyxx的tip) 简单方便

---
but

问题还没有结束 上面介绍的方法只能解决UIView的Animation 如果你的cell中还包含有CALayer的动画 比如这样

```
- (void)layoutSubviews
{
    [super layoutSubviews];
    
    self.frameLayer.frame = self.frameView.bounds;
}
```

上述情况多用于自定义控件使用了layer.mask的情况 如果有这种情况 上面提到的方法是无法取消CALayer的动画的 但是解决办法也很简单

```
- (void)layoutSubviews
{
    [super layoutSubviews];
    
    [CATransaction begin];
    [CATransaction setDisableActions:YES];
    
    self.frameLayer.frame = self.frameView.bounds;
    
    [CATransaction commit];
    
}
```

done!

