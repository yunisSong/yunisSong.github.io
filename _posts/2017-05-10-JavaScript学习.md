---
layout:     post
title:      JavaScript学习01
subtitle:   在不断填坑中前进。。
date:       2017-05-10
author:     三十一
header-img: img/post-bg-js-version.jpg
header-mask: 0.3
catalog:    true
tags:
   - JavaScript
---

# JavaScript学习01

> 开始观看这系列文章 
  [从零开始学_JavaScript_系列（一）初步概念、工具选择、简单内容输出、加载js文件](https://yq.aliyun.com/articles/30980)
 
### `script` 标签 
HTML的脚本必须位于 `<script>` 和 `</script>` 之中。

```
<script>

JS脚本

</script>
```

### 标签
成对出现的<>（共2组）就是标签。
如 `<p>文本</p>` 就是一组标签。

标签可以加id，如 `<p id="abc">文本</p>` ，id用于之后寻找其使用。

寻找id使用 `getElementById("abc")` 这样的办法。

然后在这样的命令后面加对应的东西，如innerHTML（文本替换），value（得到值）。

```
<p id="abc">abc</p>

<button type="button" onclick="run()">点击</button>

<script>

function run()
{
document.getElementById("abc").innerHTML="ppp";

}

</script>
```

像这样的代码，在执行时，用ppp文本替换abc文本。

第一行是输出文字abc，然后给他一个id（用来找她）。

第二行是输出一个按钮（button），按钮上面的文字是点击。

第三行到最后 `</script>` 是js脚本。这个脚本里面包含了一个函数（function）；

函数的效果是，在标签id为abc的地方（通过getElementById获得），用文本ppp替换之。


### 输出时间


```
<p id="time"></p>

<script>

var nowtime=new Date(); //获得时间

localtime=nowtime.toString(); //将时间转为字符串

document.getElementById("time").innerHTML=localtime; //在id为time的地方输出时间，注意，time需要在这行之前才可以

</script>
```

#### 关于时间的其他函数：
```
hour=nowtime.getHours(); //将小时赋给hour

min=nowtime.getMinutes(); //分钟

second=nowtime.getSeconds(); //秒

day=nowtime.getDate(); //天

mon=nowtime.getMonth(); //月

year=nowtime.getFullYear(); //年

datashow=year+"年"+mon+"月"+day+"日"+hour+"时"+min+"分"+second+"秒";

document.getElementById("time").innerHTML=datashow; //在id为time的地方输出时间，注意，time需要在这行之前才可以
```

### 导入一个js文件

使用

`<script src="time.js">` //读取time.js这个JavaScript文件内容

</script>

然后可以将之前的关于time的js命令，放入time.js文件内（无需加上 `<script>`标签）即可。


### 事件处理程序

在发生某种事件时，怎么处理。

先上代码：
```
<img src="01.png" onmouseover="src='02.png'" onmouseout="src='01.png'"> <!-- 这行的意思是，插入一个图片，初始是01.png，鼠标移动上去后，是02.png，移动走又变回01.png了-->
```
位置是在第一个标签之中，类型有（似乎对大小写并不敏感，即onMouseOver和onmouseover是一样的）

①按下时：onclick=”执行的语句”;

②鼠标移动到上面时：onMouseOver=”执行的语句”;

③鼠标离开：onMouseOut=”执行的语句”;

④点击后生效：onClick=”执行的语句”;（仅限鼠标左键）

⑤鼠标按下后生效：onMouseDown=”执行的语句”;（左右键都有用）

⑥增加条件判断（初始1#图片，第一次点击更换为2#图片，再次点击更换为1#图片，然后交替）


```
<img id="01png" src="01.png"onclick="png01()">

<script>

i=0;//需要在外面声明才行

function png01()

{

if(i==0){i=1;document.getElementById("01png").src="02.png";}//判断更改图片

else{i=0;document.getElementById("01png").src="01.png";}//判断更改图片

}

</script>
```

⑦鼠标在上面是一个鼠标，鼠标离开又是另外一个图片

```
<img id="01png" src="01.png" onmouseover="src='02.png'" onmouseout="src='01.png'">


```
⑧判断路径中，文件名是否有某个关键词；

```
function mouseover()

{

png=document.getElementById("01png");

if(png.src.match("01.png")) //如果路径中有关键词01，

{

png.src="02.png";

}

else

{

png.src="01.png";

}

}
```


### 注释
html注释的语法是：

` <!--这里面写注释-->` 

js注释的语法：

js标签之内（即 `<script>` 和 `</script>` 之间的部分），可以像c++那样用双斜线。


### 图片

①标签<img src=”图片链接”>


```
<img src="http://s1.sinaimg.cn/middle/60de1da3n796eef141460&690">
```

②限制高度和宽度（会导致图片变形）：width=””和height=””;

```
<img src="http://s1.sinaimg.cn/middle/60de1da3n796eef141460&690" width="100" heigth="100">
```

③在文字之中插入图片：

```
<p>右边是一个美女图片<img id="01png" src="http://s1.sinaimg.cn/middle/60de1da3n796eef141460&690"  width="200" height="200" onmouseover="mouseover()" onmouseout="mouseover()"> 左边是美女图片</p>
```




### 超链接

在使用 `<a href=”链接地址”></a>` 即可，将触发链接的内容加入到 `<a>` 中间如：

```
<a href="http://baidu.com" target="_blank"> <!--加入target="_blank"表示是新窗口，不加则是在之前的窗口-->

    <img id="01png" src="01.png"  width="100" height="100" onmouseover="mouseover()" onmouseout="mouseover()">

</a>
```

①如果是链接到本地（或者网站某个地址），则使用相对路径；

②链接到同一个页面的不同位置，参考链接：http://www.w3school.com.cn/tiy/t.asp?f=html_link_locations

```
<html>

<body>

<p>
<a href="#C4">查看 Chapter 4。</a>
</p>

<h2>Chapter 1</h2>
<p>This chapter explains ba bla bla</p>

<h2>Chapter 2</h2>
<p>This chapter explains ba bla bla</p>

<h2>Chapter 3</h2>
<p>This chapter explains ba bla bla</p>

<h2><a name="C4">Chapter 4</a></h2>
<p>This chapter explains ba bla bla</p>

<h2>Chapter 5</h2>
<p>This chapter explains ba bla bla</p>

<h2>Chapter 6</h2>
<p>This chapter explains ba bla bla</p>

<h2>Chapter 7</h2>
<p>This chapter explains ba bla bla</p>

<h2>Chapter 8</h2>
<p>This chapter explains ba bla bla</p>

<h2>Chapter 9</h2>
<p>This chapter explains ba bla bla</p>

<h2>Chapter 10</h2>
<p>This chapter explains ba bla bla</p>

<h2>Chapter 11</h2>
<p>This chapter explains ba bla bla</p>

<h2>Chapter 12</h2>
<p>This chapter explains ba bla bla</p>

<h2>Chapter 13</h2>
<p>This chapter explains ba bla bla</p>

<h2>Chapter 14</h2>
<p>This chapter explains ba bla bla</p>

<h2>Chapter 15</h2>
<p>This chapter explains ba bla bla</p>

<h2>Chapter 16</h2>
<p>This chapter explains ba bla bla</p>

<h2>Chapter 17</h2>
<p>This chapter explains ba bla bla</p>

</body>
</html>

```

③如果图片不能存在的话，用文本替代：

```
<img src="不存在的图片.png" alt="这里是不存在的图片">
```

### 使用div来布局

`<div>` 布局的好处是，提前把网站页面划分为若干个区域，然后设置好每个区域的大小。

如图片，先将页面分为3个区域。

<img src = "http://img.blog.csdn.net/20160331173243153">

然后在每个区域中再细分。
①一般在div中使用class属性：`<div class=”某个样式”></div>`

然后这个div则使用class的这个样式了。

②一个div实际上是一行（也就是说不同div之间是换行），但貌似可以通过class来让其位于不同的位置。

更深的话，是跟DOM有关的。


