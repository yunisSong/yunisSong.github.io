---
layout:     post
title:      Lambda表达式addThen的理解
subtitle:   在不断填坑中前进。。
date:       2020-08-25
author:     三十一
header-img: img/post-bg-nextgen-web-pwa.jpg
header-mask: 0.3
catalog:    true
tags:
   - Java
---

# Lambda表达式addThen的理解

先定义一个接口类

```
public interface   SYInterface {
	
	int add(int a);
	
	default SYInterface addThen(SYInterface after)
	{
		return (s) -> {
			int a = add(s);
			return after.add(a);
		};
//   或者
//		return s-> {
//			return after.add(add(s));
//		};
	}

}
```

测试类里面
```
public class SYAddThenDemo {
	public static void main(String[] args) {
		
		SYInterface s1 = a -> a + 2 ;
		SYInterface s2 = a -> a + 3 ;

		test1(a -> a + 100);
		test2(s ->  s + 16,s ->  s + 1);
		
		test1(s1);
		test2(s1,s2);
		
	}
	static void test1(SYInterface ic)
	{
		int r = ic.add(15);
		System.out.println(r);

	}
	static void test2(SYInterface s1,SYInterface s2)
	{
	// int a = s1.addThen(s2).add(15);
		SYInterface c3 =  s1.addThen(s2);
		int r1 = c3.add(15);
		System.out.println(r1);
	}

}
```

每次看到这段代码我都是一脸懵逼 `int a = s1.addThen(s2).add(15);`，为什么它会先调用 `s1` 的 `add` 方法，然后调用 `s2` 的 `add` 方法。
天资愚钝，思考了一晚上和一个上午，终于理解了，现在记录下推导过程，以防后面再次迷糊。

先来看一段代码

```
	test1(new SYInterface() {
		@Override
		public int add(int a) {
			
			return a + 15;
		}
	});
```

这里使用了匿名类来实现，没什么问题，当 `test1` 方法里面 `SYInterface ic` 调用 `ic.add()` 的时候就是调用 匿名类里面的 `add` 方法。

根据规则，我们可以把匿名类这段实现修改为：

```
    test1(a -> a + 15);
    
    其实就是
    SYInterface ic = a -> a + 15;
    test1(ic);
    然后当 ic 调用 add 的时候，其实就是 调用 a + 15;
```

这段具体的规则就不讲了，继续往下

上面的理解以后，我们调用接口 SYInterface 的 add 方法的时候，其实就是调用 

```
int add(int a) {
    return a + 15
}
```

然后我们看下 addThen 的实现

```
	default SYInterface addThen(SYInterface after)
	{
		return (s) -> {
			int a = add(s);
			return after.add(a);
		};
//   或者
//		return s-> {
//			return after.add(add(s));
//		};
	}
```

是传入一个 `SYInterface` 参数返回一个 `SYInterface` 的结果。
所以 伪代码

```
 SYInterface s1 = a -> a + 2 ;
 SYInterface s2 = a -> a + 3 ;
 
 s1.add(5) = {
 	return 5 + 2;
 }
 s2.add(5) = {
 	return 5 + 3;
 }
 
 SYInterface c3 = s1.addThen(s2) = s -> {
	  int a = s1.add(s);
	  reurn s2.add(a);
  }	 
  
  所以 c3.add(15) 等于 调用了 
  {
  		//s = 15
  		int a = s1.add(s);
	  	reurn s2.add(a);
  }
```

![](/media/Lambda_Java/Lambda.png)