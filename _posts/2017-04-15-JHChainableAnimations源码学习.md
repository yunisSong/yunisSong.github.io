---
layout:     post
title:      JHChainableAnimations源码学习
subtitle:   在不断填坑中前进。。
date:       2017-04-15
author:     三十一
header-img: img/post-bg-nextgen-web-pwa.jpg
header-mask: 0.3
catalog:    true
tags:
   - 源码
   - iOS
---

# JHChainableAnimations源码学习

### JHChainableAnimations是什么
`JHChainableAnimations` 是一个多系统动画封装的链式语法库。

原有的OC代码如果我们想写一个动画，需要这样写。

```swift
    [UIView animateWithDuration:1.0
                          delay:0.0
         usingSpringWithDamping:0.8
          initialSpringVelocity:1.0
                        options:0 animations:^{
                            CGPoint newPosition = self.myView.frame.origin;
                            newPosition.x += 50;
                            self.myView.frame.origin = newPosition;
    } completion:^(BOOL finished) {
        [UIView animateWithDuration:0.5
                              delay:0.0
                            options:UIViewAnimationOptionCurveEaseIn
                         animations:^{
            self.myView.backgroundColor = [UIColor purpleColor];
        } completion:nil];
    }];
```


使用 `JHChainableAnimations` 可以这样写：

```swift
JHChainableAnimator *animator = [[JHChainableAnimator alloc] initWithView:self.myView];
animator.moveX(50).spring.thenAfter(1.0).makeBackground([UIColor purpleColor]).easeIn.animate(0.5);
```

代码一下就显得特别清晰明了，`JHChainableAnimations` 采用了现在流行的链式语法，跟 `Masonry` 一样的语法。
#### 链式语法的特点是什么
链式编程特点：方法的返回值是block,block必须有返回值（本身对象），block参数（需要操作的值）

### JHChainableAnimations代码具体分析

首先看一段代码

```swift
JHChainableAnimator *animator = [[JHChainableAnimator alloc] initWithView:self.myView];
animator.moveX(100).animate(2);

```

首先是将 `self.myView` 与 `JHChainableAnimator *animator` 关联起来，然后通过 `JHChainableAnimator *animator` 进行动画设置。

第二行代码
`animator.moveX(100).animate(2);`

首先是 `animator` 调用 `moveX` 方法生成动画样式，这个方法从字面上面看 就是 移动视图的X轴，然后调用 `animate` 执行动画，设置动画时间。具体看先 它是如何实现的。


```swift
- (JHChainableFloat)moveX
{
    JHChainableFloat chainable = JHChainableFloat(f) {
        
        [self addAnimationCalculationAction:^(__weak UIView *view, __weak JHChainableAnimator *weakSelf) {
            JHKeyframeAnimation *positionAnimation = [weakSelf basicAnimationForKeyPath:@"position.x"];
            positionAnimation.fromValue = @(view.layer.position.x);
            positionAnimation.toValue = @(view.layer.position.x+f);
            [weakSelf addAnimationFromCalculationBlock:positionAnimation];
        }];
        [self addAnimationCompletionAction:^(__weak UIView *view, __weak JHChainableAnimator *weakSelf) {
            CGPoint position = view.layer.position;
            position.x += f;
            view.layer.position = position;
        }];
        
        return self;
    };
    return chainable;
}
```

再来回顾下链式语法的特点：
> 方法的返回值是block,block必须有返回值（本身对象），block参数（需要操作的值）

再来看上面这段代码：
1.  `moveX` 方法返回的是一个 `block chainable`
2.  `block` 的参数是一个 `float`，
3. `block chainable` 的返回值是当前类 `JHChainableAnimator` 实例。

完全符合链式语法的特点。
#### moveX 具体实现
然后再来看具体实现，`moveX` 干了什么。

首先是返回了一个 `block`，然后这个 `block` 返回了这个类本身的实例。

#####  `block chainable` 都做了什么

1. 生成一个可执行的动画
```swift
     [self addAnimationCalculationAction:^(__weak UIView *view, __weak JHChainableAnimator *weakSelf) {
            JHKeyframeAnimation *positionAnimation = [weakSelf basicAnimationForKeyPath:@"position.x"];
            positionAnimation.fromValue = @(view.layer.position.x);
            positionAnimation.toValue = @(view.layer.position.x+f);
            [weakSelf addAnimationFromCalculationBlock:positionAnimation];
        }];
```

2. 生成有个动画执行完毕的回调，修改视图属性
```swift
    [self addAnimationCompletionAction:^(__weak UIView *view, __weak JHChainableAnimator *weakSelf) {
            CGPoint position = view.layer.position;
            position.x += f;
            view.layer.position = position;
        }];
```

3. 返回 当前类本身



#### animate 具体实现

```swift
- (JHChainableAnimation)animate
{
    JHChainableAnimation chainable = JHChainableAnimation(t) {
        
        return self.animateWithCompletion(t, self.completionBlock);
    };
    
    return chainable;
}
```
 华丽的分割线
----
> 感觉自己的语言表示能力有问题，突然不知道该怎么往下说下去了。
> 这个地方。

> 重新描述下：

> 首先是像
> ```swift
> - (JHChainableFloat)moveX;
> - (JHChainableFloat)moveY;
> - (JHChainablePoint)moveXY;
> - (JHChainableFloat)moveHeight;
> - (JHChainableFloat)moveWidth;
> ```
> 这类方法调用的时间，会生成一些类的动画对象 `JHKeyframeAnimation` 然后存储到 `JHAnimationChainLink` 的动画数组里面。

> 最终 `animate` 方法是循环调用 类数组里面存储的 `JHAnimationChainLink` 对象，执行 `JHAnimationChainLink` 对象的 `JHKeyframeAnimation`动画数组。
> 大致就是这样执行的，但是具体的实现有好多细节，动画的添加，动画执行的回调，取得当前执行的动画、如何暂停动画等。感觉自己目前的功力还很难描述清楚。就暂时先告一段落了。


