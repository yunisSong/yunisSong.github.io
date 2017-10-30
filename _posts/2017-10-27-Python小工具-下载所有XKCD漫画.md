---
layout:     post
title:      Python小工具-下载所有XKCD漫画
subtitle:   在不断填坑中前进。。
date:       2017-10-27
author:     三十一
header-img: img/post-bg-nextgen-web-pwa.jpg
header-mask: 0.3
catalog:    true
tags:
   - Python
---

# Python小工具-下载所有XKCD漫画

1. 利用 requests 模块下载页面。
2. 利用 Beautiful Soup 找到页面中漫画图像的 URL。
3. 利用 iter_content()下载漫画图像，并保存到硬盘。
4. 找到前一张漫画的链接 URL，然后重复。


```
# -*- coding: UTF-8 -*-
import requests, sys, webbrowser, bs4,os

# 进入同级目录下的file文件夹
currentFilePath = sys.path[0]
webFilePath = os.path.join(currentFilePath, "file")
os.chdir(webFilePath)

url = 'http://xkcd.com' # starting url


while not url.endswith('#'):
    print('Downloading page %s...' % url)
    # 下载 网页
    res = requests.get(url)
    res.raise_for_status()
    # 解析查找需要的内容
    soup = bs4.BeautifulSoup(res.text,"html.parser")
    comicElem = soup.select('#comic img')

    if comicElem == []:
        print('Could not find comic image.')
    else:
        # 拼接真实的图片下载地址
        comicUrl = 'http:' + comicElem[0].get('src')
        # Download the image.
        print('Downloading image %s...' % (comicUrl))
        res = requests.get(comicUrl)
        res.raise_for_status()
        # 保存图片到本地
        playFile = open(os.path.basename(comicUrl), 'wb')
        for chunk in res.iter_content(100000):
            playFile.write(chunk)
        playFile.close()
        # 设置下一个加载的 链接
        prevLink = soup.select('a[rel="prev"]')[0]
        url = 'http://xkcd.com' + prevLink.get('href')

print('Done.')

```

