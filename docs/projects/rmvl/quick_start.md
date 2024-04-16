# 快速开始

以下内容均可在[此文档](https://cv-rmvl.github.io/docs/master/d1/db4/tutorial_install.html)中找到

---

::: warning
首先确保您已经安装了 OpenCV 和 Eigen3 库
:::

## 快速部署 RMVL 环境

RMVL 使用 CMake 构建，请确保安装了 CMake

可使用以下命令行

```bash
sudo apt install cmake cmake-qt-gui cmake-curses-gui
```

获取 CMake，其中 `cmake-qt-gui` 和 `cmake-curses-gui` 分别是 **Qt** 版的 CMake GUI 程序和 **命令行** 版的 CMake GUI 程序。

### 安装 RMVL

在您觉得合适的地方打开终端，使用命令行输入

```bash
git clone https://github.com/cv-rmvl/rmvl.git
git checkout 1.2.0
```

在 RMVL 项目根目录打开终端，构建并安装 RMVL

```bash
mkdir build
cd build
cmake ..
make -j8
sudo make install
```

### 测试安装结果

打开终端，输入

```bash
rmvl_version
```

若显示对应版本号，则说明安装成功

从 RMVL 编写 demo 例程可以参考[文档](https://cv-rmvl.github.io/docs/master/da/d80/tutorial_use.html) 。
