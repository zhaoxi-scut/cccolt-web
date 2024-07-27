# 软件目录

## 1 编译工具

### 1.1 GCC

#### x86_64

包含能满足日常开发的 `gcc`、`g++`、`gdb` 等内容，安装在 `/opt/gcc` 目录下，不修改主机的 `PATH` 和 `LD_LIBRARY_PATH` 等环境变量，能与现有编译器隔离开。此外在 `/usr/local/bin` 下添加了 `cpprun-<version>` 和 `cpprun` 软链接，用于单文件的编译与运行

1. `gcc-13-x86-64-linux-opt`：GCC 13.2.0 编译器，以及 `cpprun-13`，使用以下命令安装

   ```bash
   sudo apt install gcc-13-x86-64-linux-opt
   ```

   使用以下命令卸载

   ```bash
   sudo apt remove gcc-13-x86-64-linux-opt
   ```

2. `gcc-14-x86-64-linux-opt`：GCC 14.1.0 编译器，以及 `cpprun-14`，使用以下命令安装

   ```bash
   sudo apt install gcc-14-x86-64-linux-opt
   ```

   使用以下命令卸载

   ```bash
   sudo apt remove gcc-14-x86-64-linux-opt
   ```

#### aarch64

## 2 库资源

