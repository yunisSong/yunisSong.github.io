---
layout:     post
title:      NSInvocation如何调用block 
subtitle:   在不断填坑中前进。。
date:       2019-06-12
author:     三十一
header-img: img/post-bg-nextgen-web-pwa.jpg
header-mask: 0.3
catalog:    true
tags:
   - 
---

# NSInvocation如何调用block 

> NSInvocation是调用函数的另一种方式，它将调用者，函数名，参数封装到一个对象，然后通过一个invoke函数来执行被调用的函数，其思想就是命令者模式，将请求封装成对象。
> NSMethodSignature 用于描述 method 的类型信息：返回值类型，及每个参数的类型。 

### NSInvocation 简单实用


```objective_c
NSMethodSignature *signature = [NSInvocationTestViewController instanceMethodSignatureForSelector:@selector(testInstanceMethodArgument1:)];
NSInvocation *invocation = [NSInvocation invocationWithMethodSignature:signature];
invocation.target = self;
invocation.selector = @selector(testInstanceMethodArgument1:);
NSString *argument1 = @"string";
[invocation setArgument:&argument1 atIndex:2];
[invocation invoke];
```

获取方法签名的方法 

*  `instanceMethodSignatureForSelector` 
*  `methodSignatureForSelector`
*  `signatureWithObjCTypes`

`[xxx methodSignatureForSelector:@select];`

在 `xxx` 的 `isa` 指向的地方的方法列表里面找方法；

`[xxx instanceMethodSignatureForSelector:@select];` 

直接在 `xxx` 的 方法列表里面找方法。

`signatureWithObjCTypes`

根据字符创建签名。

>具体规则可以查看苹果的官方文档:[Type Encodings](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/ObjCRuntimeGuide/Articles/ocrtTypeEncodings.html#//apple_ref/doc/uid/TP40008048-CH100%EF%BC%89)


`[invocation setArgument:&argument1 atIndex:2];`

这里设置参数要从 2 开始，是因为默认方法有两个参数 0: `self` ，1: `SEL` 。

还有一个点要注意，经常当我们通过 `getReturnValue` 获取返回值的时候，容易出现崩溃。

譬如 返回值是 `NSString *`

```objective_c
 NSString *returnValue;
 NSLog(@"1 returnValue == %@",returnValue);
 [invocation getReturnValue:&returnValue];
 NSLog(@"2 returnValue == %@",returnValue);
 NSLog(@"returnValue %p",returnValue);
 
 ---
 *** -[CFString release]: message sent to deallocated instance 0x60000025db30
```

这是因为 `getReturnValue` 接收的参数为 `void *` 类型，在 `ARC` 模式下，强转类型导致了内存管理的混乱。下面这张写法就不会有问题。


```objective_c
void *returnValue = NULL;
NSLog(@"1 returnValue == %@",returnValue);
[invocation getReturnValue:&returnValue];
NSLog(@"2 returnValue == %@",returnValue);
NSString *t = (__bridge NSString *)(returnValue);
NSLog(@"t %p",t);
```

### NSInvocation 如何调用 block
#### 如何获取一个 block 的方法签名
>这一段来自于 [用 Block 实现委托方法](https://triplecc.github.io/2017/07/28/2017-07-28-blockhe-nsmethodsignature/)

通过种种渠道我们可以得知 block，最终的结果是一个结构体。形式如下


```objective_c
// Block internals.
typedef NS_OPTIONS(int, TBVBlockFlags) {
    TBVBlockFlagsHasCopyDisposeHelpers = (1 << 25),
    TBVBlockFlagsHasSignature          = (1 << 30)
};
typedef struct tbv_block {
    __unused Class isa;
    TBVBlockFlags flags;
    __unused int reserved;
    void (__unused *invoke)(struct tbv_block *block, ...);
    struct {
        unsigned long int reserved;
        unsigned long int size;
        // requires TBVBlockFlagsHasCopyDisposeHelpers
        void (*copy)(void *dst, const void *src);
        void (*dispose)(const void *);
        // requires TBVBlockFlagsHasSignature
        const char *signature;
        const char *layout;
    } *descriptor;
    // imported variables
} *TBVBlockRef;
```

方法的签名就位于 `TBVBlockRef` -> `descriptor` -> `signature` 这个位置。
获取的方法：

```objective_c
static NSMethodSignature *tbv_signatureForBlock(id block) {
    TBVBlockRef layout = (__bridge TBVBlockRef)(block);
    
    // 没有签名，直接返回空
    if (!(layout->flags & TBVBlockFlagsHasSignature)) {
        return nil;
    }
    
    // 获取 descriptor 指针
    void *desc = layout->descriptor;
    
    // 跳过 reserved 和 size 成员
    desc += 2 * sizeof(unsigned long int);
    
    // 如果有 Helpers 函数， 跳过 copy 和 dispose 成员
    if (layout->flags & TBVBlockFlagsHasCopyDisposeHelpers) {
        desc += 2 * sizeof(void *);
    }
    
    // desc 为 signature 指针的地址，转换下给 objcTypes
    char *objcTypes = (*(char **)desc);
    
    return [NSMethodSignature signatureWithObjCTypes:objcTypes];
}
```

对比了发现和 Aspects 里面获取 block 签名的方法一致。

#### 如何为 block 设置参数


`block` 的签名不像 `select`， 第一个参数是返回类型，第二个参数才是真正的参数，并不像 `select` 第二个参数是 `:` 代表 `SEL`.

```objective_c
   for (int idx = 1; idx < methodSignature.numberOfArguments; idx++) {
        
        // 获取参数类型
        const char *type = [methodSignature getArgumentTypeAtIndex:idx];
        NSLog(@"----%s",type);
        if ([[NSString stringWithUTF8String:type] isEqualToString:@"\@\"NSString\""] ) {
            NSString *argument1 = @"----123---";
            [blockInvocation setArgument:&argument1 atIndex:idx];
        }else if ([[NSString stringWithUTF8String:type] isEqualToString:@"#"] )
        {
            Class cls = [NSSet class];
            [blockInvocation setArgument:&cls atIndex:idx];
        }
    }
```

