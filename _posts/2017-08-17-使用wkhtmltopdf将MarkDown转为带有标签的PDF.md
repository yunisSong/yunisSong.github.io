---
layout:     post
title:      使用wkhtmltopdf将Markdown转为带有标签的PDF
subtitle:   在不断填坑中前进。。
date:       2017-08-17
author:     三十一
header-img: img/post-bg-nextgen-web-pwa.jpg
header-mask: 0.3
catalog:    true
tags:
   - 
---

# 使用 `wkhtmltopdf` 将 `Markdown` 文件转为带有标签的 PDF 文件

### 1，使用 `MWeb` 编写 `Markdown` 文档
。。。。
### 2，导出为 `HTML`
![](/img/in-post/markDownToHtml.png)
### 3，编辑 HTML 样式
使用 `sublime text` 打开 `HTML` 文件我这边主要修改了宽度、代码背景色、字体大小和粗体字体颜色。

```css
.markdown-body {
  min-width: 200px;
  max-width: none;/* 修改 */
  margin: 0 auto;
  padding: 20px;

  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  color: #333;
  overflow: hidden;
  font-family: "Helvetica Neue", Helvetica, "Segoe UI", Arial, freesans, sans-serif;
  font-size: 58px;/* 修改 */
  line-height: 1.6;
  word-wrap: break-word;
}
```

```css
.markdown-body code {
  padding: 0;
  padding-top: 0.2em;
  padding-bottom: 0.2em;
  margin: 0;
  font-size: 85%;
  background-color: #e8f2fb;/* 修改 */
  border-radius: 3px;
}
```


```css
.markdown-body pre {
  padding: 16px;
  overflow: auto;
  font-size: 85%;
  line-height: 1.45;
  background-color: #e8f2fb;/* 修改 */
  border-radius: 3px;
}
```


```css
.markdown-body strong {
  font-weight: bold;
  color: #0a366f;/* 修改 */
}
```
### 4，下载 `wkhtmltopdf`
下载地址为 [wkhtmltopdf](https://wkhtmltopdf.org/downloads.html).
建议打开 VPN ，不然下载速度好慢的。
### 4，使用 `wkhtmltopdf` 转换为 PDF
进入 `HTML` 文件所在目录，使用命令：

```
$-> wkhtmltopdf  index.html 编码规范.pdf
```
其中 `index.html` 为刚才导出的文件 ，`编码规范.pdf` 为你要生成的PDF 文件
> 一定要到`HTML` 文件所在目录执行这个命令。我因为这个原因傻逼的找了半天错误原因。

样式大概是这个样子的：
![](/img/in-post/wkhtmltopdfDemo.png)





