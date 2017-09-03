---
layout:     post
title:      "swift 学习（9）Enumerations"
subtitle:   "在不断填坑中前进。。"
date:       2017-03-01 12:00:00
author:     "三十一"
header-img: "img/post-bg-nextgen-web-pwa.jpg"
header-mask: 0.3
catalog:    true
tags:
    - Swift
---
#swift 学习（9）Enumerations
[toc]
> An enumeration is a list of related values that define a common type and let you work with values in a type-safe way.
枚举是定义一个公共类型的相关值的列表，可让您以类型安全的方式使用值。

#### **声明枚举**

```
enum Month {  case january  case february  case march  case april  case may  case june  case july  case august  case september  case october  case november  case december}

enum Month {  case january, february, march, april, may, june, july, august,  september, october, november, december}
```

声明带有计算属性的枚举

```
enum Month {
    case january, february, march, april, may, june, july, august,
    september, october, november, december
    //let semester = month.semester // "Autumn"
    var semester : String {
        switch self {
        case .august, .september, .october, .november, .december:
            return "Autumn"
        case .january, .february, .march, .april, .may:
            return "Spring"
        case .june, .july:
            return "Summer"
        }
    }
    
}
var month = Month.april
month = .september
let semester = month.semester // "Autumn"
```

#### **Raw values**
> Unlike enumeration values in C, Swift enum values are not backed by integers as a default. 
> 与C中的枚举值不同，Swift枚举值默认不支持整数。

需要手动设定

```
enum Month: Int {  case january = 1, february, march, april, may, june, july,  august, september, october, november, december}

Month.october.rawValue // 10

```

#### **Initializing with the raw value**

` You can use the raw value to instantiate an enumeration value with an initializer. `

但是当使用 `Month(rawValue: 5)` 初始化得到一个 Month 枚举时，得到的值是一个 `optional`，当使用 100 初始化是 会得到一个 `nil` 值，所以直接使用会报错。需要使用 `!` 解包。

```
let fifthMonth = Month(rawValue: 5)
monthsUntilWinterBreak(from: fifthMonth) // Error: value not unwrapped

 let fifthMonth = Month(rawValue: 5)!monthsUntilWinterBreak(from: fifthMonth)  // 7
```


#### **String raw values**

```
enum Icon: String {  case music  case sports  case weather  var filename: String {    // 2    return "\(rawValue.capitalized).png"  }}let icon = Icon.weathericon.filename // Weather.png



var coinPurse : Array = Array.init(arrayLiteral: Coin.penny,Coin.nickel,Coin.dime,Coin.quarter,Coin.quarter)

```

#### **Associated values**

* 每个枚举值都有0个或者多个关联值
* 每个枚举值的关联值都有自己的数据类型
* 你可以像定义方法参数一样定义关联值

An enumeration can have raw values or associated values, but not both.

一个 `enumeration` 可以使用 `raw values` 或者 `associated values`，但是只能同时使用其中的一个。

```
enum WithdrawalResult {  case success(newBalance: Int)  case error(message: String)}

let result = WithdrawalResult.success(newBalance: 100)
//let result = WithdrawalResult.error(message: "测试错误数据")

switch result {
case .success(let newBalance):
    print("Your new balance is: \(newBalance)")
case .error(let message):
    print(message)
}


switch result {case .success(let newBalance):  print("Your new balance is: \(newBalance)")case .error(let message):  print(message)}

//多个关联值
enum WithdrawalResult {
    case success(newBalance: Int,parameters: Int)
    case error(message: String)
}
```

特殊的条件判断

```
enum HTTPMethod {  case get  case post(body: String)}

let request = HTTPMethod.post(body: "Hi there")
/* 
 In this code, guard case checks to see 
 if request contains the post enumeration case and if so,
 reads and binds the associated value.
 guard case 判断 request 是否是post ，如果是post，读取并且关联值到body
 */guard case .post(let body) = request else {  fatalError("No message was posted")}print(body)

//与上面语句判断等同
if case .post(let body) = request  {
    print(body)

}

```
#### **Optionals**
Optionals 的底层实现就是枚举，只是编译器隐藏了实现细节，包括可选值绑定 ？ 和 ！ 操作符，以及nil的实现。


```
var age: Int?age = 17age = nil

switch age {case .none:  print("No value")case .some(let value):  print("Got a value: \(value)")}

if let age = age {
    print("\(age)")//17

}

if (age != nil)  {
    print("\(age)")//Optional(17)

}

error
//Optional type 'Int?' cannot be used as a boolean; test for '!= nil' instead
if age {
    print("\(age)")

}

```


#### **Key points**

* An enumeration is a list of related values that define a common type. 枚举是定义公共类型的相关值的列表。

* Enumerations provide an alternative to old-fashioned integer values.枚举提供了一种替代老式整数值的方法

* You can use enumerations to handle responses, store state and encapsulate values.您可以使用枚举来处理响应，存储状态和封装值。
 
* Case-less enumerations prevent the creation of instances.枚举里枚举值为空不允许创建实例。

