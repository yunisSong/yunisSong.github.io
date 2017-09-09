---
layout:     post
title:      "swift 学习（11）Generics"
subtitle:   "在不断填坑中前进。。"
date:       2017-03-01 12:00:00
author:     "三十一"
header-img: "img/post-bg-nextgen-web-pwa.jpg"
header-mask: 0.3
catalog:    true
tags:
    - Swift
---
#swift 学习（11）Generics 泛型

[TOc]

> generics are a way to systematically define sets of types.


```
let animalAges: [Int] = [2,5,7,9]
let animalAges: Array<Int> = [2,5,7,9]

let intNames: Dictionary<Int, String> = [42: "forty-two"]
let intNames2: [Int: String] = [42: "forty-two", 7: "seven"]

func swapped<T, U>(_ x: T, _ y: U) -> (U, T) {  return (y, x)}
swapped(33, "Jay")  // returns ("Jay", 33)
```

