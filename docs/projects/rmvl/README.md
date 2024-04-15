# RMVL 用户手册

RMVL 主仓库为硬件设备的二次开发、网络通信、串口通信以及运动、控制、视觉算法提供了相应的支持库，为工业、日常环境下某些特征的识别、追踪等提供了完整的流程。

同时，RMVL 也配备了比较完善的基础开发工具，例如文档、插件、交流群等，下文列举了部分内容。

## 库资源

点击[此处](https://github.com/cv-rmvl/rmvl)可查看源码。

RMVL 的所有功能在设计之初秉持着依赖最小化的原则，非必要不引入除 STL、硬件 SDK、OpenCV 以及 Eigen 3 以外的第三方库，若一旦引入将会以 `3rdparty` 的形式存储在 RMVL 中，并由 CMake 编译选项自动管理构建，这将利于降低初次构建 RMVL 的学习成本。为了提高 RMVL 的隔离性，所有的类、参数变量、全局函数等实体均定义在了 `rm` 命名空间下，例如，若要使用 2 阶 Runge-Kutta 中点公式求解一阶常微分方程，可使用以下代码完成。

```cpp
rm::Ode dot_x1 = [](double t, const std::vector<double> &x) { return 2 - x[0] + t; }
rm::RungeKutta2 rk({dot_x1}); // 构建中点公式
rk.init(0, {1});              // 设置初值
rk.solve(0.01, 100);          // 迭代求解
```

此外，RMVL 提供了便捷的参数管理功能，使用一组 CMake 宏和相应的 `*.para` 文件即可完成参数模块的变量定义、注释、默认值、运行期加载的功能，该功能依赖 OpenCV 的 `cv::FileStorage`。

### 主要模块

RMVL 的主要模块包括数据结构与算法、硬件设备二次开发库、数值计算库、工业互联网 `OPC UA` 通信协议等内容，这些内容作为主要模块分布在项目的 `modules` 文件夹中。

### 扩展模块

RMVL 的扩展模块包括由特征 `feature`、特征组合 `combo`、追踪器 `tracker` 和序列组 `group` 组成的 **数据组件** ，由检测和识别模块 `detector`、补偿模块 `compensator`、目标预测模块 `predictor` 和决策模块 `decider` 组成的 **功能模块** ，这些模块分布在项目的 `extra` 文件夹中。

扩展模块是视觉程序处理的主要模块，RMVL 采用类似于责任链的设计模式管理了所有扩展模块，具体细节可参考[此文档](https://cv-rmvl.github.io/master/d2/de3/tutorial_extra_upper_process.html)。

### 参数模块

可以使用 `rmvl_generate_para` CMake 宏生成参数模块的 C/C++ 文件，例如原先的文件架构为

```
.
├── CMakeLists.txt
├── include
│   └── rmvl
│       ├── aa
│       │   ├── a1.hpp
│       │   └── a2.hpp
│       └── aa.hpp
├── param
│   └── a1.para
└── src
    ├── a1
    │   └── a1.cpp
    └── a2
        ├── a2_impl.cpp
        └── a2.cpp
```

其中 `a1.para` 是希望用于生成参数模块 C/C++ 文件的参数规范文件。

在 CMakeLists.txt 中添加模块（一般是 `add_library(aa XXX)` 或者 RMVL 中的 `rmvl_add_module(aa XXX)`）之前的位置写上

```cmake
rmvl_generate_para(
  a1
  MODULE aa
)
```

即可生成 `aa/a1` 的参数模块，在文件末尾写上

```cmake
rmvl_generate_module_para(aa)
```

即可生成 `aa` 参数模块的汇总头文件。

运行 `cmake ..` 后的文件结构如下

```
.
├── CMakeLists.txt
├── include
│   ├── rmvl
│   │   ├── aa
│   │   │   ├── a1.hpp
│   │   │   └── a2.hpp
│   │   └── aa.hpp
│   └── rmvlpara
│       ├── aa
│       │   └── a1.h
│       └── aa.hpp
├── param
│   └── a1.para
└── src
    ├── a1
    │   ├── a1.cpp
    │   └── para
    │       └── param.cpp
    └── a2
        ├── a2_impl.cpp
        └── a2.cpp
```

其中新生成的文件为 `include/rmvlpara/**` 和 `src/a1/para/**`。

有关库资源的内容可参考[此文档](https://cv-rmvl.github.io/master/d1/dfb/intro.html)。

## 插件

RMVL 提供了 Visual Studio Code 代码编辑器的插件，可在扩展商店中搜索 `RMVL Parameters and CMake` （后文简称 rmvl-extension）进行下载，自 RMVL `1.2.0` 版本起，rmvl-extension 与 RMVL 主存储库版本保持同步。也可在 [Github Release](https://github.com/cv-rmvl/rmvl-vscode-extension/releases) 中的附件下载对应的 `vsix` 文件，并在 vscode 中手动安装。

rmvl-extension 提供了一组 RMVL 的 CMake 中使用的宏与函数，以及 `*.para` 参数规范文件的语法高亮、代码提示、悬浮提示与代码块。在安装此插件后，打开任一 CMake 文件或 `*.para` 文件均可激活此插件。此外，rmvl-extension 还提供了

- 介绍 rmvl-extension，快捷键：`ctrl+r ctrl+w`
- 快速资源搜索，快捷键：`ctrl+r ctrl+s`

的命令插件。
