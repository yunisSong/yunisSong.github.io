---
layout:     post
title:      通过theme整体修改element-plus中的样式
subtitle:   在不断填坑中前进。。
date:       2022-07-06
author:     三十一
header-img: img/post-bg-nextgen-web-pwa.jpg
header-mask: 0.3
catalog:    true
tags:
   - 前端
   - element-plue
---

# 通过theme整体修改element-plus中的样式

`element-plue` 为我们提供了一套高效、整洁、规范的UI框架。
大部分时候我们可以直接使用他提供的组件，但是有时候需要微调这些组件的样式，如何做呢？其实官方文档里面已经有了描述。但是我自己还是在这里记录一下。

1. 在项目中新建一个 css 文件：`element-plus-theme-setting.scss`，这个名字可以随便取，看自己的喜好。
2. 把要调整的变量安装下面代码的格式写入到这个文件。其中涉及到的变量需要自己到`element-plus/theme-chalk/src/common/var.scss` 这个文件中查找。
3. 在`main.js` 中导入这个文件，`import './assets/scss/element-plus-theme-setting.scss'`


```css
@forward 'element-plus/theme-chalk/src/common/var.scss' with (
  // 设置颜色
  $colors: (
    'primary': (
      'base': red,
    ),
  ),
  // 设置 高度。(button、input 等)
  $common-component-size:(
    'large': 44px,
    'default': 32px,
    'small': 24px,
  ),
  // 设置字体大小
  $font-size:(
    'extra-large': 20px,
    'large': 38px,
    'medium': 16px,
    'base': 14px,
    'small': 13px,
    'extra-small': 12px,
  ),
);
// @import "element-plus/theme-chalk/src/index.scss";

@use "element-plus/theme-chalk/src/index.scss" as *;
```