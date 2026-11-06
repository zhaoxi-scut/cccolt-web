# 快速开始

## 一键安装

根据平台选择安装方式，详细步骤参见 [Linux 配置教程](https://cv-rmvl.github.io/quickstart/linux.html)与 [Windows 配置教程](https://cv-rmvl.github.io/quickstart/win.html)。

::: code-tabs

@tab Linux

```bash
wget https://cv-rmvl.github.io/install -qO - | bash
```

@tab Windows（Beta）

```powershell
irm https://cv-rmvl.github.io/install-win | iex
```

:::

## 从源码构建

需要定制模块或参与开发时，可以从源码安装。准备 C++ 编译器与 CMake，并根据需要启用的模块安装相应依赖。

```bash
git clone https://github.com/cv-rmvl/rmvl.git
cd rmvl
git checkout 2.5.0
cmake -S . -B build
cmake --build build --parallel 8
cmake --install build
```

这里以参考手册中的 `2.5.0` 为例，其他版本可从 [Releases](https://github.com/cv-rmvl/rmvl/releases) 选择。安装到系统目录时，根据目录权限使用管理员权限执行安装步骤。

## 验证安装

```bash
rmvl_version
```

显示对应版本号即说明安装成功，接下来可参考[在项目中使用 RMVL](https://cv-rmvl.github.io/docs/2.x/da/d80/tutorial_use.html)，或查阅[文档导航](doc_navigation.md)。

::: info 云端编译
RMVL / C++ 云端编译服务 `occ.cccolt.top` 暂时停用，当前请在本地安装和运行。其他服务入口见[托管服务](/projects/hosting/)。
:::
