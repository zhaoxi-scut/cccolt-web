# 【13】CPack 工具

#### 教学视频

::: tip 即将到来 ...
- 【12】CMake：CPack 工具
:::

---

::: warning
未完成...
:::

## 1. 简介

### 1.1 CPack 的基本介绍

### 1.2 CPack 支持的生成器

## 2. CPack 的基本使用

### 2.1 通用 CPack 配置

### 2.2 部分生成器 CPack 配置

#### Debian 生成器 CPack 专属配置

#### NSIS 生成器 CPack 专属配置

## 3. 项目 CPack 文件的写法

用于打包的 CPack 配置文件命名没有特别的讲究，比方说 OpenCV 的 CPack 配置文件命名为 `OpenCVPackaging.cmake`，因此我们可以将 CPack 配置文件命名为 `<PackageName>Packaging.cmake`，并放置在项目 `cmake` 目录下。
