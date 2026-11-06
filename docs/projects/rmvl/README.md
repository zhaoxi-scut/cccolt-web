# RMVL 用户手册

**RMVL（Robotic Manipulation and Vision Library）** 是机器人操作与视觉库，为硬件设备二次开发、网络与串口通信、数值计算，以及运动、控制和视觉算法提供支持。

- [快速开始](quick_start.md)：安装 RMVL，构建第一个项目。
- [文档导航](doc_navigation.md)：查阅开发分支与各发行版的 API 文档。
- [完整用户手册](https://cv-rmvl.github.io/)：配置教程、模块说明与开发工具。
- [源码仓库](https://github.com/cv-rmvl/rmvl)：源码、发行包与问题反馈。

## 功能概览

| 方向 | 内容 |
| --- | --- |
| 基础通信 | 网络通信、串口通信、LPSS 轻量发布订阅服务与 OPC UA 支持 |
| 硬件设备 | 工业相机、光源控制器等设备的二次开发接口 |
| 数值与控制 | 插值、最小二乘、Runge-Kutta、最优化、卡尔曼滤波与信号处理 |
| 视觉处理 | 特征、特征组合、追踪器与序列组，以及检测、补偿、预测和决策模块 |
| 开发工具 | CMake 构建支持、参数代码生成与 Visual Studio Code 扩展 |

RMVL 注重依赖最小化，按所用模块配置第三方库，公共接口统一放在 `rm` 命名空间下。

## 模块组织

**主要模块**位于 `modules`，包含基础工具、通信、硬件设备、算法和机器学习支持等功能。

**扩展模块**位于 `extra`，以数据组件和功能模块组织视觉处理流程，便于组合检测、追踪、预测与决策。详见[视觉处理流程](https://cv-rmvl.github.io/docs/2.x/d2/de3/tutorial_extra_upper_process.html)。

**参数模块**通过 `*.para` 文件描述参数类型、默认值与注释，在 CMake 配置阶段由 `rmvl_generate_para` 和 `rmvl_generate_module_para` 生成 C++ 代码，支持运行时读写配置。详见[参数模块说明](https://cv-rmvl.github.io/intro/repo/03.html)。

## Visual Studio Code 扩展

在扩展商店搜索 **RMVL CMake and IDL**，或从 [GitHub Releases](https://github.com/cv-rmvl/rmvl-vscode-extension/releases) 下载 `vsix` 文件安装。

扩展提供 CMake 宏与函数的补全，以及 `*.para` 参数规范文件的语法高亮、代码提示、悬浮提示和代码块，并提供快速资源搜索等命令。

- [CMake 扩展说明](https://cv-rmvl.github.io/intro/extension/ext_cmake.html)
- [IDL 接口定义语言](https://cv-rmvl.github.io/intro/extension/ext_idl.html)
