# 11 - 答案

## 1. 常规非跨平台项目

**返回**：[【点此返回】](../11.md#_1-5-思考)

:::demo-wrapper

用户在使用

```cmake
find_package(VisionLib REQUIRED)
```

的时候，CMake 会解析对应的 `VisionLibConfig.cmake` 文件，去除注释部分，包含的内容如下

```cmake
get_filename_component(VL_CONFIG_PATH "${CMAKE_CURRENT_LIST_FILE}" PATH)
set(VL_INSTALL_PATH "/usr/local")

set(VisionLib_INCLUDE_DIRS "${VL_INSTALL_PATH}/include/VisionLib")
set(VisionLib_LIBS  vl_a vl_b vl_c vl_d)

if(NOT TARGET vl_a)
  include(${VL_CONFIG_PATH}/VisionLibTargets.cmake)
endif()

find_package(PackageHandleStandardArgs REQUIRED)

find_package_handle_standard_args(VisionLib
  REQUIRED_VARS VL_INSTALL_PATH
)
```

其中导出配置文件 `VisionLibTargets.cmake` 仅对 4 个目标 `vl_a`、`vl_b`、`vl_c` 和 `vl_d` 进行了配置。

根据报错提示，提示找不到 OpenCV 的头文件，OpenCV 的头文件信息均在 OpenCV 相关的目标中，查阅安装后的 `VisionLibTargets.cmake` 导出配置文件可以知道，`vl_c` 目标设置了指向 `opencv_core` 的链接

```cmake
# Create imported target vl_c
add_library(vl_c STATIC IMPORTED)

set_target_properties(vl_c PROPERTIES
  INTERFACE_INCLUDE_DIRECTORIES "${_IMPORT_PREFIX}/include/VisionLib"
  INTERFACE_LINK_LIBRARIES "opencv_core;vl_a"
)
```

但并没有设置 `opencv_core` 目标对应的头文件及库文件的路径，有以下解决方案

1. 用户需要手动 `find_package(OpenCV)`，这样 CMake 将重新在系统中搜索 `OpenCVConfig.cmake` 文件，并完成对 `opencv_core` 目标的设置；
2. 在 `VisionLibConfig.cmake.in` 文件中手动设置 `opencv_core`，将 `opencv_core` 作为导入目标的方式进行设置，例如可以写成

   ```cmake
   add_library(opencv_core SHARED IMPORTED)

   set_target_properties(opencv_core PROPERTIES
     INTERFACE_INCLUDE_DIRECTORIES "/usr/local/include/opencv4"
     IMPORTED_LOCATION_RELEASE "/usr/local/lib/libopencv_core.so"
   )
   ```

第一种方案简单，但是会增加用户的负担，需要用户对库的依赖关系足够了解；第二种方案不会增加用户的负担，但明显复杂多了，并且项目里还有 `opencv_imgproc` 目标，如果能自动将这些目标添加到项目的构建系统中，而不用手写配置，那就方便了，这正是==外部依赖管理==需要解决的内容，[点此](../11.md#_2-外部依赖管理)阅读下一小节内容。

:::