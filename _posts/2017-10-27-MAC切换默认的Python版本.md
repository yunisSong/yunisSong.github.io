---
layout:     post
title:      MAC切换默认的Python版本
subtitle:   在不断填坑中前进。。
date:       2017-10-27
author:     三十一
header-img: img/post-bg-nextgen-web-pwa.jpg
header-mask: 0.3
catalog:    true
tags:
   - 
---

# MAC切换默认的Python版本

### 使用 系统默认的 bash
参见 这个链接：http://blog.csdn.net/a704901117/article/details/69262428?locationNum=15&fps=1
### 使用 iTerm
```shell
➜  ~ cd ~
➜  ~ ls -a
➜  ~ open .zshrc
```

然后添加 `if which pyenv > /dev/null; then eval "$(pyenv init -)"; fi` 到打开的文本。

```
➜  ~ source  .zshrc
➜  ~ python
Python 3.5.2 (default, Oct 29 2016, 22:48:09)
[GCC 4.2.1 Compatible Apple LLVM 7.0.2 (clang-700.1.81)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> exit()
KeyboardInterrupt
>>>
```


就切换到 3.5版本了。

