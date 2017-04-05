---
layout:     post
title:      "swift 学习（12）Access Control and Code Organization"
subtitle:   "在不断填坑中前进。。"
date:       2017-03-01 12:00:00
author:     "三十一"
header-img: "img/post-bg-nextgen-web-pwa.jpg"
header-mask: 0.3
catalog:    true
tags:
    - iOS
    - Swift
---
# #swift 学习（12） Access Control and Code Organization

* private: Accessible only to the defining type, which includes any and all nested types.* fileprivate: Accessible from anywhere within the source file in which it’s defined.* internal: Accessible from anywhere within the module in which it’s defined. This is the default access level.* public: Accessible from anywhere within the module in which it is defined, as well as another software module that imports this module.* open: The same as public, with the additional ability of being able to be overridden from within another module.

