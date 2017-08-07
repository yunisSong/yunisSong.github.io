---
layout:     post
title:      "swift 学习（5）Structures"
subtitle:   "在不断填坑中前进。。"
date:       2017-03-01 12:00:00
author:     "三十一"
header-img: "img/post-bg-nextgen-web-pwa.jpg"
header-mask: 0.3
catalog:    true
tags:
    - Swift
---
#swift 学习（5）Structures

> Structures, or structs, are one of the named types in Swift that allow you to encapsulate related properties and behaviors. You can declare a new type, give it a name and then use it in your code.

**如何声明**
```
struct Location {  let x: Int  let y: Int 
}
```

**实例化**

_Swift会根据struct中定义的属性自动创建一个初始化器_

```
  let storeLocation = Location(x: 2, y: 4)
```

**读取**

使用点语法读取属性值

```
storeLocation.X
```

**可以包含方法**

```
struct DeliveryArea {
    var range: Double
    let center: Location
    func contains(_ location: Location) -> Bool {
        let distanceFromCenter =
            distance(from: (center.x, center.y),
                     to: (location.x, location.y))
        return distanceFromCenter < range
    }
}



let area = DeliveryArea(range: 4.5,
                        center: Location(x: 5, y: 5))
let customerLocation = Location(x: 2, y: 2)
//判断customerLocation 是否在服务范围内
area.contains(customerLocation)
```

**Structures as values**

> The term value has an important meaning when it comes to structs in Swift, and that’s because structs create what are known as value types._**A value type is a type whose instances are copied on assignment.**_

（谷歌翻译。。）
当涉及到Swift中的结构体时，术语值具有重要的意义，这是因为结构体创建了所谓的value类型。

value 类型是其实例在分配时复制的类型。

> This copy-on-assignment behavior means that when a is assigned to b, the value of a is copied into b. That’s why it’s important read = as "assign", not "is equalto" (which is what == is for).

```
var area1 = DeliveryArea(range: 2.5, center: Location(x: 2, y: 4))var area2 = area1print(area1.range) // 2.5print(area2.range) // 2.5area1.range = 4print(area1.range) // 4.0print(area2.range) // 2.5
```


**Structs everywhere**

> That’s right! The Int type is also a struct. In fact, many of the standard Swift types are structs: Double, String, Bool, Array and Dictionary are all defined as structs. As you will learn in future chapters, the value semantics of structs provide many other advantages over their reference type counterparts that make them ideal for representing core Swift types.

到处都是Structs。Int ，Double，String，Bool，Array，Dictionary等许多swift的标准数据类型都是。

Structs 是 value 类型，生成是值是copy的。(原谅英语渣)
> • Structs are value types, which means their values are copied on assignment.


