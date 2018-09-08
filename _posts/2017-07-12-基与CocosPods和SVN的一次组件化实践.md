---
layout:     post
title:      基与CocosPods和SVN的一次组件化实践
subtitle:   在不断填坑中前进。。
date:       2017-07-12
author:     三十一
header-img: img/post-bg-nextgen-web-pwa.jpg
header-mask: 0.3
catalog:    true
tags:
   - iOS
   - 内功
   - CocosPods
---

# 基与CocosPods和SVN的一次组件化实践

>入职新公司，发现两个工程共享一套代码，每次修改一个地方，就要同步到另外一个地方去修改，有时间就会很容易遗忘修改另外一个工程。刚好之前看过一些模块化的文章，这次就尝试下，把公用的代码打成一个私有库，每次更新代码都去到私有库去更新，只需要更新一个，两个工程就都可以兼顾到。
>也许不应该叫组件化，但是找不到更合适的词语了。

记录下步骤：

## 0 安装 `CocoaPods`

如何安装 `CocoaPods` ，参考链接：[最新 macOS Sierra 10.12.3 安装CocoaPods及使用详解](http://www.jianshu.com/p/b64b4fd08d3c)
其中安装源可以更换为：`https://gems.ruby-china.org/`

## 1 建立私有库

### 1.1 安装 `cocoapods-repo-svn` 插件

如果在 `SVN` 环境使用  `CocoaPods` ，需要安装一下这个插件 `cocoapods-repo-svn`，打开终端，输入：

```
$-> gem install cocoapods-repo-svn
```

### 1.2 创建 `podspec` 文件

将要进行打包的代码提取出来，创建 `podspec` 文件。


```
$-> pod spec create CommonWebTools
```

`CommonWebTools` 是提取的私有库的名称。

### 1.3 编辑 `podspec` 文件内容

```ruby
Pod::Spec.new do |s|

    s.name         = "CommonWebTools"

    s.version      = "0.0.1"

    s.summary      = "提取公用代码."

    s.description  = "Good"

    s.homepage     = "http://www.baidu.com"

    s.license      = "MIT"

    s.author       = { "XXX" => "XXXXX@qq.com" }

    s.source       = { :svn => "http://XXXXXXXXX/svn/DIC-TS-eBOSS/SourceCode/50-COPMO2O/1_Develop/00-IOS/ComponentTestDemo" }

    s.source_files = "CommonWebTools", "CommonWebTools/*.{h,m}", "CommonWebTools/IflyMsc/*.{h,m}", "CommonWebTools/IflyMsc/isr/*.{h,m}"

    s.vendored_frameworks = 'CommonWebTools/IflyMsc/lib/**/*.framework'
    
    s.resources    = 'AlipaySDK/AlipaySDK.bundle'
    
    s.ios.frameworks = 'SystemConfiguration','CoreTelephony','QuartzCore','CoreText','CoreGraphics','UIKit','Foundation','CoreMotion','CFNetwork'
    
    s.libraries = 'z','c++'
    
    
    s.subspec 'OpenSSL' do |openssl|

		openssl.source_files = 'AlipaySDK/openssl','AlipaySDK/openssl/*.{h,m}'
		openssl.ios.vendored_libraries = 'AlipaySDK/openssl/libcrypto.a','AlipaySDK/openssl/libssl.a'
		openssl.libraries = 'ssl', 'crypto'
		openssl.xcconfig = { 'HEADER_SEARCH_PATHS' => "${PODS_ROOT}/#{s.name}/AlipaySDK"}

	end

  end

```

其中 `CommonWebTools` 和 `AccountModel` 与路径的关系图是这样的（`AccountModel` 是我建立的另外一个测试集成的库）：

![](/img/in-post/cocospodsSVN.jpg)

设置 pod 工程的 pch 文件内容：

```ruby
s.prefix_header_contents = "// 注释下行则不打印日志\n//#define __SHOW__DEBUGLog__\n\n#ifdef __SHOW__DEBUGLog__\n#define DEBUGLog( s, ... ) NSLog( @\"<%@:(%d)> %@\", [[NSString stringWithUTF8String:__FILE__] lastPathComponent], __LINE__, [NSString stringWithFormat:(s), ##__VA_ARGS__] )\n#else\n#define DEBUGLog( s, ... ) {}\n#endif"

---

spec.prefix_header_file = 'iphone/include/prefix.pch'
spec.prefix_header_contents = '#import "SomeClass.h"'
```

建立子文件夹：

```ruby

s.subspec 'IflyMsc' do |ss|

	ss.source_files = 'CommonWebTools/IflyMsc/Definition.h','CommonWebTools/IflyMsc/isr/*.{h,m}'
	ss.vendored_frameworks = 'CommonWebTools/IflyMsc/lib/**/*.framework'   
	ss.ios.frameworks = 'AVFoundation', 'SystemConfiguration','Foundation','CoreTelephony','AudioToolbox','UIKit','CoreLocation','Contacts','AddressBook','QuartzCore','QuartzCore'
	ss.libraries = 'z','c++','icucore'

end
```

* `.source` 是添加到 `SVN` 的文件路径。
* `.source_files` 是 要加载的文件集合。
* `.vendored_frameworks` 是自定义的 `framework`。
* `.ios.frameworks` 是添加的系统 `framework`，名称不带后缀。譬如： `AVFoundation.framework` 直接写：`AVFoundation`。
* `.libraries` 是添加系统的动态库。譬如 `libz.tbd` 添加的时间，只需要填入 `z` 就行，同理，`libc++.tbd`,只填入`c++`就行。
* `.dependency` 是依赖于那个库。
* `.ios.vendored_libraries` 静态库

### 1.4 千言万语 不如一个demo
#### 1.4.1 `IflyMsc`
```ruby
Pod::Spec.new do |s|

	s.name         = "IflyMsc"

	s.version      = "0.0.1"

	s.summary      = "IflyMsc"
	
	s.description  = "IflyMsc"
	
	s.homepage     = "http://www.baidu.com"

	s.license      = "MIT"

	s.author       = { "XXX" => "XXXXX@qq.com" }

	s.source       = { :svn => "http://XXXXXXX/svn/DIC-TS-eBOSS/SourceCode/50-COPMO2O/1_Develop/00-IOS/Modules" }
	
	s.requires_arc = true

	s.ios.deployment_target = '9.0'

	s.source_files = 'IflyMsc','IflyMsc/*.{h,m}'

	s.vendored_frameworks = 'IflyMsc/lib/*.framework'   

	s.libraries = 'z','c++','icucore'

	s.ios.frameworks = 'AVFoundation', 'SystemConfiguration','Foundation','CoreTelephony','AudioToolbox','UIKit','CoreLocation','Contacts','AddressBook','QuartzCore','QuartzCore'

   	s.prefix_header_contents = "// 注释下行则不打印日志\n//#define __SHOW__DEBUGLog__\n\n#ifdef __SHOW__DEBUGLog__\n#define DEBUGLog( s, ... ) NSLog( @\"<%@:(%d)> %@\", [[NSString stringWithUTF8String:__FILE__] lastPathComponent], __LINE__, [NSString stringWithFormat:(s), ##__VA_ARGS__] )\n#else\n#define DEBUGLog( s, ... ) {}\n#endif"



	s.subspec 'isr' do |ss|

		ss.source_files = 'IflyMsc/isr','IflyMsc/isr/*.{h,m}'

    	end


end
```
目录层级：
![](/media/15039102892405/15046888657724.jpg)

#### 1.4.2 `AlipaySDK`

```ruby
Pod::Spec.new do |s|

	s.name         = "AlipaySDK"

	s.version      = "0.0.1"

	s.summary      = "AlipaySDK"
	
	s.description  = "AlipaySDK"
	
	s.homepage     = "http://www.baidu.com"

	s.license      = "MIT"

	s.author       = { "XXX" => "XXXXX@qq.com" }

	s.source       = { :svn => "http://XXXXXXXX/svn/DIC-TS-eBOSS/SourceCode/50-COPMO2O/1_Develop/00-IOS/Modules" }
	
	s.requires_arc = true

	s.ios.deployment_target = '9.0'

	s.source_files = 'AlipaySDK','AlipaySDK/*.{h,m}'

	s.resources    = 'AlipaySDK/AlipaySDK.bundle'

	s.vendored_frameworks = 'AlipaySDK/*.framework' 


	s.ios.frameworks = 'SystemConfiguration','CoreTelephony','QuartzCore','CoreText','CoreGraphics','UIKit','Foundation','CoreMotion','CFNetwork'

	s.libraries = 'z','c++'

	s.subspec 'OpenSSL' do |openssl|

		openssl.source_files = 'AlipaySDK/openssl','AlipaySDK/openssl/*.{h,m}'
		openssl.ios.vendored_libraries = 'AlipaySDK/openssl/libcrypto.a','AlipaySDK/openssl/libssl.a'
		openssl.libraries = 'ssl', 'crypto'
		openssl.xcconfig = { 'HEADER_SEARCH_PATHS' => "${PODS_ROOT}/#{s.name}/AlipaySDK"}

	end

	s.subspec 'Util' do |ss|

		ss.source_files = 'AlipaySDK/Util','AlipaySDK/Util/*.{h,m}'
	end

end
```
目录层级：
![](/media/15039102892405/15046890957785.jpg)

#### 1.4.3 `PushNotification`
```ruby
Pod::Spec.new do |s|

	s.name         = "PushNotification"

	s.version      = "0.0.1"

	s.summary      = "PushNotification"
	
	s.description  = "PushNotification"
	
	s.homepage     = "http://www.baidu.com"

	s.license      = "MIT"

	s.author       = { "XXX" => "XXXXX@qq.com" }

	s.source       = { :svn => "http://XXXXX/svn/DIC-TS-eBOSS/SourceCode/50-COPMO2O/1_Develop/00-IOS/Modules" }
	
	s.requires_arc = true

	s.ios.deployment_target = '9.0'

	s.dependency 'Account'

	s.dependency 'APPHelpTool'

	s.source_files = 'PushNotification','PushNotification/*.{h,m}','PushNotification/UMessage_Sdk_1.5.0a/UMessage.h'

	s.ios.vendored_libraries = 'PushNotification/UMessage_Sdk_1.5.0a/libUMessage_Sdk_1.5.0a.a'



end
```
目录层级：
![](media/15039102892405/15046891948750.jpg)
## 2 使用私有库

### 2.1 集成使用

建立新工程 `TestSVNCocoaPods`，进入工程目录，建立 `Podfile`文件。


```
$-> touch Podfile 
```

编辑内容：

```ruby
target 'TestSVNCocoaPods' do

	pod 'CommonWebTools', :svn => "http://xxxxxxxx/svn/DIC-TS-eBOSS/SourceCode/50-COPMO2O/1_Develop/00-IOS/ComponentTestDemo"

	pod 'AccountModel', :svn => "http://xxxxxxxx/svn/DIC-TS-eBOSS/SourceCode/50-COPMO2O/1_Develop/00-IOS/ComponentTestDemo"


end
```

使用 git 的直接可以使用：


```
pod 'MJExtension'
```

然后终端执行：


```
$-> pod install --verbose --no-repo-update
```


### 2.2 更新代码

库文件修改、提交代码后， 使用终端执行：
**要进入到工程目录下执行这个更新命令。**

```
$-> pod update --verbose --no-repo-update 
```







