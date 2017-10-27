---
layout:     post
title:      iOS 11、iPhone X、Xcode9适配
subtitle:   在不断填坑中前进。。
date:       2017-09-20
author:     三十一
header-img: img/post_bg_iPhoneX.jpg
header-mask: 0.3
catalog:    true
tags:
   - iOS
---

# iOS 11、iPhone X、Xcode9适配

遇到的问题

### 1 启动图变形。
![启动图变形](/media/15059019605960/%E5%90%AF%E5%8A%A8%E5%9B%BE%E5%8F%98%E5%BD%A2.png)


项目采用的是 `LaunchScreen.storyboard` 当启动视图，`LaunchScreen.storyboard`里面加载一个图片填充了整个视图，由于之前的 `iPhone` 宽高比例差别不到，也就没有注意到图片的变形，今天 在 `iPhone X` 上图片变形严重。
解决方案：

1. 使用 `LaunchImage`，但是美工需要切各个不同 `iPhone` 的图片。
2. 使用 `LaunchScreen.storyboard`，重新设置 图片的约束。设置left、right、top与视图相同，比例设置为原图片比例。然后视图背景设置为与图片边框相同的背景。


### 2 导航视图上移，被 刘海遮挡

![](/media/15059019605960/15059020743807.jpg)
![](/media/15059019605960/15059020905209.jpg)
![](/media/15059019605960/15059021153942.jpg)


我们项目中的导航视图都是自定义的导航视图，所以会出现这样的问题。
这个解决起来就简单粗暴了。
判断 手机型号，然后重新设置视图高度。

```
#import "UIDevice+SYHelp.h"

@implementation UIDevice (SYHelp)
+ (BOOL)isiPhoneX
{
    if ([UIScreen mainScreen].bounds.size.height == 812)
    {
        return YES;
    }
    return NO;

}
+ (BOOL)isiOS11
{
    NSString *version = [UIDevice currentDevice].systemVersion;
    if (version.floatValue >= 11) {
        return YES;
    }
    return NO;
}
@end
```
### 3 MJRefresh 视图不隐藏
![](/media/15059019605960/15059023075980.jpg)

这个解决方法就是判断手机型号和系统版本号，然后让视图上移。

```
    BOOL isIphoneX = [UIDevice isiPhoneX];
    BOOL isiOS11 = [UIDevice isiOS11];
    [mainScrollView mas_makeConstraints:^(MASConstraintMaker *make) {
        if (isiOS11) {
            make.left.right.bottom.equalTo(self);
            if (isIphoneX) {
                make.top.equalTo(self).offset(- 44);//兼容mj bug
            }else{
                make.top.equalTo(self).offset(- 20);//兼容mj bug
            }
        }else
        {
            make.edges.equalTo(self);

        }
  
    }];
```
或者也可以使用最新版的 `MJRefresh` 也许作者已经适配了 `iOS 11`。

### 4 保存图片到本地闪退

iOS 11 如果需要保存图片到相片库中，需要在 info.plist 中增加新的参数 ：`NSPhotoLibraryAddUsageDescription`,否则保存图片时会闪退。苹果对用户的隐私权限要求越来越严格了。

```
This app has crashed because it attempted to access privacy-sensitive data without a usage description.  The app's Info.plist must contain an NSPhotoLibraryAddUsageDescription key with a string value explaining to the user how the app uses this data.
```


```
    <key>NSPhotoLibraryAddUsageDescription</key>
    <string>是否允许此App为您添加图片？</string>
```
### Xcode 9

目前使用 `Xcode 9` 没有发现有特殊需要修改的地方。

使用半天的感受：

1. 代码提示更烂了，感觉还不如 8，有时候输入回车键不会自动填充大括号了。
2. 使用起来略卡。
3. 支持多开模拟器，安装app 也很方便，直接把 `.app` 文件拖拽就可以安装。


### --
总体来说，我们的项目适配的工作量还是很小的，我用了一个下午把两个工程的适配都做好了，主要是我们工程中大量的采用 `H5` 页面，适配的工作没有那么大。

