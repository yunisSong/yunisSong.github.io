---
layout:     post
title:      "swift 学习（6）Properties"
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
#swift 学习（6）Properties

* [x] 实在无法用自己的语言表示出来，以后就当是读书摘录吧。

> • Properties are variables and constants that are part of a named type.• Stored properties allocate memory to store a value.• Computed properties are calculated each time your code requests them and aren’t stored as a value in memory.• The static keyword marks a type property that’s universal to all instances of a particular type.
> • The lazy keyword prevents a value of a stored property from being calculated until your code uses it for the first time. You’ll want to use lazy initialization when a property’s initial value is computationally intensive or when you won’t know the initial value of a property until after you’ve initialized the object.


### **===符号**

=== 是比较引用指向的地址是否一致。
== 是比较值是否一致。



### **stored properties**




```
struct Car {  let make: String  let color: String}
```
> Values like these are called properties. The two properties of Car are both stored properties, which means they store actual string values for each instance of Car.

*  Default values

```
struct Contact {  var fullName: String  let emailAddress: String  var type = "Friend"}
```



### **computed properties**

> Some properties calculate values rather than store them; that means there’s no actual memory allocated for them, but they get calculated on-the-fly each time you access them. Naturally, these are called computed properties.

有些属性是没有为他们分配实际的存储空间的，每次读取他们都是经过即时计算得到的。

*  Getter and setter

计算属性会默认实现get，可选实现set方法。当不写get、set关键字是默认当做get实现。

```
struct TV {
    var heigth : Double
    var width : Double
    var diagonal : Int {
        get {
            let result = sqrt(heigth * heigth + width * width)
            let roundResult = result.rounded()
            return Int(roundResult);
        }
        set {
            //设定屏幕比例
            let ratioWidth = 16.0
            let ratioHeight = 9.0
            //设置计算属性的值，实际上还是设置存储属性的值
            heigth = Double(newValue) * ratioHeight / sqrt(ratioWidth * ratioWidth + ratioHeight * ratioHeight)
            width = heigth * ratioWidth / ratioHeight
        }
       
    }
}
```

存储属性可以是常量也可以是变量，但是计算属性只能是变量。
> While a stored property can be a constant or a variable, a computed property must be defined as a variable
### **Type properties**

> However, the type itself may also need properties that are common across allinstances. These properties are called type properties.

然而，类型本身也可能需要在所有的共同的属性
实例。 这些属性称为类型属性。

使用 static 修饰。

```
struct Level {  static var highestLevel = 1  let id: Int  var boss: String  var unlocked: Bool}
```


### **Property observers**
>  willSet 
> didSet


### **Lazy properties**

> If you have a property that might take some time to calculate, you don’t want to slow things down until you actually need the property. Say hello to the lazy stored property. This could be useful for such things as downloading a user’s profile picture or making a serious calculation.

如果你有一个属性可能需要一些时间来计算，你不想减慢的事情，直到你实际需要的属性。 向懒惰的存储属性打个招呼吧。 这可能对下载用户的个人资料图片或进行严重的计算有用。


```
struct Circle {  lazy var pi = {    return ((4.0 * atan(1.0 / 5.0)) - atan(1.0 / 239.0)) * 4.0  }()  var radius = 0.0  var circumference: Double {    mutating get {      return pi * radius * 2    }  }  init (radius: Double) {    self.radius = radius  }}
```

### **Key points**

* Properties are variables and constants that are part of a named type.
* Stored properties allocate memory to store a value.
* Computed properties are calculated each time your code requests them and aren’t stored as a value in memory.
* The static keyword marks a type property that’s universal to all instances of a particular type.
* The lazy keyword prevents a value of a stored property from being calculated until your code uses it for the first time. You’ll want to use lazy initialization when a property’s initial value is computationally intensive or when you won’t know the initial value of a property until after you’ve initialized the object.

