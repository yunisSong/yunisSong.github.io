---
layout:     post
title:      Head First HTML与CSS
subtitle:   在不断填坑中前进。。
date:       2017-07-27
author:     三十一
header-img: img/post-bg-nextgen-web-pwa.jpg
header-mask: 0.3
catalog:    true
tags:
   - 
---

# Head First HTML与CSS

```
构建网页的文件名称不要有空格
<a href="test.html">点击跳转到同级目录下test.html 文件</a>
<a href="../test.html">点击跳转到上级目录下test.html 文件</a>
<a href="Yunis/test.html">点击跳转到Yunis目录下test.html 文件</a>
```



列表

```
<ul>
<li>....</li>
<li>....</li>
<li>....</li>
</ul>


<ol>
<li>....</li>
<li>....</li>
<li>....</li>
</ol>
```


跳转到页面指定位置

```
index.html :
<html>
  <head>
    <title>Head First Lounge Directions</title>
  </head>
  <body>
    <h1 id="jump">Directions</h1>
  </body>
</html>




当使用

<a href="index.html#jump">跳转</a>

会跳转到 index.html 页面 ID 为jump 的位置。
```


相对路径、绝对路径

```
<a href="http"//www.Yunis.com/demo/test/play.html">网页</a>

<a href="demo/test/play.html">网页</a>
```

`<img>` 元素

alt

```
当 图片不可显示时，显示 alt 内容
    <img src="images/00drinks.gif" alt="这是一个备选的显示">

```


CSS

```
一个元素可以有多个规则。
    <style type="text/css">
        p {
            color: maroon;
        }
    
        h1,h2 {
            font-family :sans-serif;
            color :gray;
        }
    
        h1 {
            border-bottom:1px solid black;
        }
    
    </style>
    
    
    
    也可以这样引入 CSS 样式
 <link type = "text/css" rel = "stylesheet" href = "lounge.css">


rel 属性指定了 HTML 文件和所链接的文件之间的关系。

<link> 是一个 void 元素。



可以为一个元素增加 class 属性，然后单独为这个属性的值设置样式。

<p class="greentea">
      <img src="../images/green.jpg">
      Chock full of vitamins and minerals, this elixir
      combines the healthful benefits of green tea with
      a twist of chamomile blossoms and ginger root.
    </p>
p.greentea {
    color:green;
}

这样的话只要 class 是 greentea 这个值的话，都会设置为这个样式。
.greentea {
    color:green;
}

class 可以有多个值 使用空格分割。

```



`<div>`

逻辑区，包围标签，相当于 一个块的概念，把里面的元素当做一个整体处理。

`<span>`

创建内联字符和元素的逻辑分组。功能等同 `<div>`


