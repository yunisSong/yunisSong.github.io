---
layout:     post
title:      VueRequest拦截通讯回调
subtitle:   在不断填坑中前进。。
date:       2024-09-20
author:     三十一
header-img: img/post-bg-nextgen-web-pwa.jpg
header-mask: 0.3
catalog:    true
tags:
   - iOS
---

# VueRequest拦截通讯回调

[VueRequest 使用文档](https://www.attojs.com/)
[VueRequest 代码库](https://github.com/attojs/vue-request)

大概用法
```js
import { useRequest } from "vue-request";
import axios from "axios";
const getUser = (userName) => {
  return axios.get("api/user", {
    params: {
      name: userName,
    },
  });
};

//代码2
const { data, run } = useRequest(getUser).run({
  onSuccess: () => {
    // 业务回调处理
  },
});
run("李三");
```

现在有一个问题。我们需要再业务成功回调的事情做一些业务操作。本来也没啥问题。

但是 `代码2` 这段分散在了几十个文件里面。就想有没有简单的处理。

最终找到的解决方案。拦截 `run` 方法的调用，替换原有的 `onSuccess` 回调。

核心代码

```js

export default function interceptorRequest(
  request: any,
  interceptor: InterceptorOption,
  timeOption?: ExecutionOptions
) {
  const handler = {
    apply(target: any, thisArg: any, argumentsList: any) {
      const interceptorRun = (params: Options<any, any>) => {
        const newParams = replacePrimitive(params, interceptor, timeOption)
        return newParams
      }
      const callback = interceptorRun(argumentsList[0])
      return target.apply(thisArg, [callback]) // 调用原逻辑
    }
  }
  request.run = new Proxy(request.run, handler)
}


```

完整代码

``` TS

import type { Options } from 'vue-request'

export enum InterceptorTime {
  'before',
  'after'
}

export interface ExecutionOptions {
  time?: InterceptorTime //拦截方法调用时机
  abort?: boolean // 是否中断原有逻辑
}
// Abort
type InterceptorOption = Pick<Options<any, any>, 'onSuccess' | 'onError' | 'onBefore' | 'onAfter'>

function assemblyLogic(
  primitiveFN: Function | undefined,
  interceptorFN?: Function,
  timeOption?: ExecutionOptions
) {
  // hook 调用时机
  const exTime = timeOption?.time || InterceptorTime.before
  // 是否终止原逻辑调用
  const abort = timeOption?.abort || false

  return (params: any) => {
    if (exTime === InterceptorTime.before) {
      interceptorFN && interceptorFN(params)
    }
    if (!abort) {
      primitiveFN && primitiveFN(params)
    }
    if (exTime === InterceptorTime.after) {
      interceptorFN && interceptorFN(params)
    }
  }
}
function replacePrimitive(
  primitive: Options<any, any>,
  interceptor: InterceptorOption,
  timeOption?: ExecutionOptions
) {
  primitive.onSuccess = assemblyLogic(primitive.onSuccess, interceptor.onSuccess, timeOption)
  primitive.onError = assemblyLogic(primitive.onError, interceptor.onError, timeOption)
  primitive.onBefore = assemblyLogic(primitive.onBefore, interceptor.onBefore, timeOption)
  primitive.onAfter = assemblyLogic(primitive.onAfter, interceptor.onAfter, timeOption)
  return primitive
}

export default function interceptorRequest(
  request: any,
  interceptor: InterceptorOption,
  timeOption?: ExecutionOptions
) {
  const handler = {
    apply(target: any, thisArg: any, argumentsList: any) {
      const interceptorRun = (params: Options<any, any>) => {
        const newParams = replacePrimitive(params, interceptor, timeOption)
        return newParams
      }
      const callback = interceptorRun(argumentsList[0])
      return target.apply(thisArg, [callback]) // 调用原逻辑
    }
  }
  request.run = new Proxy(request.run, handler)
}

```