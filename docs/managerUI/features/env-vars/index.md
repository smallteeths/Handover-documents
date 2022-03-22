---
title: ENV VARS
sidebarDepth: 3
---

# 容器可见环境变量

## 业务/功能描述

设置容器可见的环境变量，包括从其他资源（如密文、配置映射）注入的值

## 功能入口描述

- `集群` -> `资源/工作负载` -> `部署服务/环境变量`
- `集群` -> `资源/工作负载` -> `工作负载/编辑/环境变量`
- `集群` -> `资源/工作负载` -> `工作负载/跨集群克隆/环境变量`

## 前置条件

- 已有集群受 rancher 管理
- 跨集群克隆页面中的环境变量，需要至少有两个受Rancher 管理的集群

## API 描述
环境变量资源对象，修改具体位置，如下Yaml文件高亮部分。分引用资源环境变量和其他环境变量。

引用资源环境变量：

1. 密文引用(`secretRef`)
1. 配置映射引用(`configMapRef`)

其他环境变量：

1. 普通键值对
1. 配置映射键引用(`configMapKeyRef`)
1. 密文键引用(`secretKeyRef`)
1. POD field 引用(`fieldRef`)，支持：`metadata.name`, `metadata.namespace`, `metadata.labels['<KEY>']`, `metadata.annotations['<KEY>']`, `spec.nodeName`, `spec.serviceAccountName`, `status.hostIP`, `status.podIP`, `status.podIPs`
1. 容器资源引用(`resourceFieldRef`)，当前支持资源：`limits` 和 `requests` (`limits.cpu`, `limits.memory`, `limits.ephemeral-storage`, `requests.cpu`, `requests.memory` 和 `requests.ephemeral-storage`).

```yaml{10-33}
apiVersion: apps/v1
kind: Deployment
metadata:
  name: test
  namespace: default
spec:
  template:
    spec:
      containers:
      - env:
        - name: a
          value: b
        - name: b
          valueFrom:
            resourceFieldRef:
              containerName: test
              divisor: "1"
              resource: limits.cpu
        - name: c
          valueFrom:
            configMapKeyRef:
              key: a
              name: m
              optional: false
        envFrom:
        - prefix: f
          secretRef:
            name: ss
            optional: false
        - configMapRef:
            name: m
            optional: false
          prefix: g
        image: ubuntu:xenial
        imagePullPolicy: Always
        name: test
```

参考 K8S API 如下：

- [container-v1-core](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.23/#container-v1-core)
- [envvar-v1-core](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.23/#envvar-v1-core)
- [envfromsource-v1-core](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.23/#envfromsource-v1-core)

