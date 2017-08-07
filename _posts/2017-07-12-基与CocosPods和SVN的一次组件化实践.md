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
---

TODO:如何添加到 SVN
 文件描述 与 文件层级的关系。
# 基与CocosPods和SVN的一次组件化实践

>入职新公司，发现两个工程共享一套代码，每次修改一个地方，就要同步到另外一个地方去修改，有时间就会很容易遗忘修改另外一个工程。刚好之前看过一些模块化的文章，这次就尝试下，把公用的代码打成一个私有库，每次更新代码都去到私有库去更新，只需要更新一个，两个工程就都可以兼顾到。

记录下步骤：


### 1,安装 `cocoapods-repo-svn` 插件
没什么好说的，就是一行命令。
`gem install cocoapods-repo-svn`

### 2，提取共有代码，创建 `podspec` 文件
提取两个工程中的共有代码，然后进入目录，创建`podspec` 文件

`pod spec create CommonWebTools`

`CommonWebTools` 是你提取的私有库的名称。

### 3，编辑`podspec`文件内容

```

Pod::Spec.new do |s|

    s.name         = "CommonWebTools"

    s.version      = "0.0.1"

    s.summary      = "提取公用代码."

    s.description  = "Good"

    s.homepage     = "http://www.baidu.com"

    s.license      = "MIT"

    s.author             = { "iThinkerYZ" => "xxxxxxxx@qq.com" }

  s.source       = { :svn => "http://xxxxxx/svn/DIC-TS-eBOSS/SourceCode/50-COPMO2O/1_Develop/00-IOS/ComponentTestDemo" }

 s.source_files = "CommonWebTools", "CommonWebTools/*.{h,m}"


  end

```
多个s.source_files文件使用 ， 分割

### 4，使用：

```
target 'TestComponentDemo' do
pod 'CommonWebTools', :svn => "http://xxxxxxxx/svn/DIC-TS-eBOSS/SourceCode/50-COPMO2O/1_Develop/00-IOS/ComponentTestDemo"
end
```
### 5，如何更新代码

提交代码后，
使用 `pod update --verbose --no-repo-update`
即可生效。




