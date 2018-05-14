---
layout:     post
title:      CentOS 7 启动一个简单的 Nodejs 服务
subtitle:   在不断填坑中前进。。
date:       2018-05-14
author:     三十一
header-img: img/post-bg-nextgen-web-pwa.jpg
header-mask: 0.3
catalog:    true
tags:
   - 
---

# CentOS 7 启动一个简单的 Nodejs 服务
#### 1. 安装 nodejs

```
$ curl --silent --location https://rpm.nodesource.com/setup_8.x | sudo bash -
$ sudo yum -y install nodejs
```
#### 2. 开启一个 http server

新建一个文件 index.js


```
var http = require('http');
var ip = "xx.xx.xx.xxx";
var server = http.createServer(function (req, res) {
  console.log('Responding to a request.');
  res.end('<h1>Hello, guys</h1>');
});

server.listen(2888,ip);
```

> ip 为你本机的公网 IP。

启动服务：

```
$ node index.js
```

这个时候一般情况下，会出现 `无法访问此网站 xx.xx.xx.xxx 拒绝了我们的连接请求。`问题，需要开启一个端口号。

#### 开启端口号

解决方法：[Open firewall port on CentOS 7](https://stackoverflow.com/a/24729895/7771598)



```
$ firewall-cmd --get-active-zones
$ firewall-cmd --zone=public --add-port=2888/tcp --permanent
$ firewall-cmd --reload
```

> 2888 为要开启的端口号



