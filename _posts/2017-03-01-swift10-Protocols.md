---
layout:     post
title:      "swift 学习（10）Protocols"
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

#swift 学习（10）Protocols
[TOC]

>  There’s one final type that can bridge common behaviors between structs, classes and enums. In fact, it is itself a user-defined named type: the protocol.
> A protocol can be adopted by a class, struct, or enum — and when another type adopts a protocol, it’s required to implement the methods and properties defined in the protocol. Once a type implements all members of a protocol, the type is said to conform to the protocol.
> 协议可以由类，结构或枚举采用 - 当另一种类型采用协议时，需要实现协议中定义的方法和属性。 一旦类型实现了协议的所有成员，那么该类型被认为符合协议。

#### **Methods in protocols**
在协议中定义的方法都不需要实现。

```
enum Direction {  case leftcase right}protocol DirectionalVehicle {  func accelerate()  func stop()  func turn(direction: Direction)  func description() -> String}
```

#### **Properties in protocols**
在协议中声明的属性，需要明确的标记是get 或者 get 和 set。
协议中定义的属性，协议本身并不关心具体如何实现，你可以使用计算属性实现、也可以使用存储属性存储。所有的协议定义属性都要明确要求属性是只读还是 读与写。

```
protocol Account {  var value: Double { get set }  init(initialAmount: Double)  init?(transferAccount: Account)}

class BitcoinAccount: Account {  var value: Double  required init(initialAmount: Double) {    value = initialAmount  }  required init?(transferAccount: Account) {    guard transferAccount.value > 0.0 else {return nil}    value = transferAccount.value  }}var accountType: Account.Type = BitcoinAccount.selflet account = accountType.init(initialAmount: 30.00)
```

#### **Protocol inheritance**

协议定义时可以继承自其他的协议。

#### **Implementing protocols**

```
protocol Vehicle {  func accelerate()func stop() }class Bike: Vehicle {  var peddling = false  var brakesApplied = false  func accelerate() {    peddling = true    brakesApplied = false  }  func stop() {    peddling = false    brakesApplied = true  }}
```


#### **Associated types in protocols**

```
protocol WeightCalculatable {  associatedtype WeightType  func calculateWeight() -> WeightType}


class HeavyThing: WeightCalculatable {  // This heavy thing only needs integer accuracy  typealias WeightType = Int
  func calculateWeight() -> Int {        return 100 
    }}

class LightThing: WeightCalculatable {  // This light thing needs decimal places  typealias WeightType = Double  func calculateWeight() -> Double {    return 0.0025  }}

```

因为swift 具有类型推导，所有上面的 `typealias WeightType` 可以不写,直接使用。

#### **Implementing multiple protocols**
每个类只能继承自一个类，但是它可以遵守多个协议。

```
class Bike: Vehicle, Wheeled {  // Implement both Vehicle and Wheeled}
```

类也可以使用扩展接收协议。这样就很好的实现了代码分离。

```
class Bike {
    var wheelNumber : String = ""
    var wheelSize = 0.0
    init(wheelNumber:String,wheelSize:Double) {
        self.wheelSize = wheelSize
        self.wheelNumber = wheelNumber
    }
}

extension Bike : Hashable
{
    var hashValue: Int {
        return self.wheelNumber.hashValue
    }
}
extension Bike : CustomStringConvertible
{
    
    var description: String {
        return "\(self.wheelNumber) "
    }
}
```

#### **Requiring reference semantics**

> Protocols can be adopted by both value types (structs and enums) and reference types (classes), so you might wonder if protocols have reference or value semantics.
> 协议可以由两种值类型（结构和枚举）和引用类型（类）采用，因此您可能想知道协议是否具有引用或值语义。

```
protocol Named {  var name: String { get set }}class ClassyName: Named {  var name: String  init(name: String) {    self.name = name  }}struct StructyName: Named {  var name: String}

//指针指向同一块内存地址。
var named: Named = ClassyName(name: "Classy")var copy = namednamed.name = "Still Classy"named.name // Still Classycopy.name // Still Classy

//值COPY
named = StructyName(name: "Structy")copy = namednamed.name = "Still Structy?"named.name // Still Structy?copy.name // Structy
```

容易引起歧义。如果我们设计了一个专门让类引用的协议，可以在声明协议时加一个关键字

```
protocol Named: class {  var name: String { get set }}
```

这样就只有类可以引用该协议。

#### **Protocols in the standard library**
> The Swift standard library uses protocols extensively in ways that may surprise you. Understanding the roles protocols play in Swift can help you write clean, decoupled “Swifty” code.



**Equatable**

如果是两个int类型常量 或者 stirng 类型的常量 的可以直接使用 == 进行比较操作的。但是struct 类型就不能直接使用 == 进行比较。

这是因为Int 和 String 引用了 Equatable 协议。
如何struct 也想使用 == 操作符，引用 Equatable 就行了。

```
struct Record {  var wins: Int  var losses: Int}

extension Record: Equatable {  static func ==(lhs: Record, rhs: Record) -> Bool                                  
    {           return lhs.wins == rhs.wins &&             lhs.losses == rhs.losses    } 
}

let recordA = Record(wins: 10, losses: 5)let recordB = Record(wins: 10, losses: 5)recordA == recordB // true
```

#### **Key points**
* Protocols define a contract classes, structs and enums can adopt.协议定义了一个契约类，结构体和枚举可以采用。
* By adopting a protocol, a type is required to conform to the protocol by implementing all methods and properties of the protocol.采用协议，需要实现协议的所有方法和属性来遵循协议的类型。
* A type can adopt any number of protocols, which allows for a quasi-multiple inheritance not permitted through subclassing.数据可以通过使用多个协议来达到多继承的效果。
* You can use extensions for protocol adoption and conformance.
* The Swift standard library uses protocols extensively(大量的). You can use many of them, such as Equatable and Hashable, on your own named types.



