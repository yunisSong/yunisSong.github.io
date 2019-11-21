---
layout:     post
title:      UITableViewCell嵌套UICollectionView布局
subtitle:   在不断填坑中前进。。
date:       2019-11-21
author:     三十一
header-img: img/post-bg-nextgen-web-pwa.jpg
header-mask: 0.3
catalog:    true
tags:
   - iOS
---

# UITableViewCell嵌套UICollectionView布局

开发中经常遇到 cell 嵌套九宫格展示图片之类的需求，类似于下面的情况。

![Simulator Screen Shot - iPhone 11 Pro Max - 2019-11-21 at 16.39.36](/media/15743256429556/Simulator%20Screen%20Shot%20-%20iPhone%2011%20Pro%20Max%20-%202019-11-21%20at%2016.39.36.png)


最简单的办法就是 cell 里面嵌套 collectionView，具体的做法是：


在 `- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath` 的代理方法里面这样处理。

```objective_c

    OrderDetailsIntentionTableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:@"OrderDetailsIntentionTableViewCell" forIndexPath:indexPath];
    [cell configModel:model];
    cell.frame = tableView.bounds;
    [cell layoutIfNeeded];
    [cell.collectionView reloadData];
    //heightConstraint 为内嵌的 collectionView 高度约束
    cell.heightConstraint.constant = cell.collectionView.collectionViewLayout.collectionViewContentSize.height;
    return cell;

```


在 `OrderDetailsIntentionTableViewCell` 里面这样设置 `collectionView`。

```objective_c
    UICollectionViewLeftAlignedLayout *flowLayout = [[UICollectionViewLeftAlignedLayout alloc] init];
               flowLayout.minimumLineSpacing = 10;
               flowLayout.minimumInteritemSpacing = 10;
               flowLayout.sectionInset = UIEdgeInsetsMake(0, 10, 0, 10);//top, left, bottom, right
    
    self.collectionView.collectionViewLayout = flowLayout;
    self.collectionView.backgroundColor = [UIColor clearColor];
    self.collectionView.dataSource = self;
    self.collectionView.delegate = self;
    self.collectionView.scrollEnabled = NO;
```