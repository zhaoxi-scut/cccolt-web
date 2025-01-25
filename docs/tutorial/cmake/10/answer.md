# 10 - 答案

**返回**：[【点此返回】](../10.md#思考)

:::demo-wrapper
1. 导入目标是使用形如以下的语句添加的，用于将一个已经存在的库==导入==到当前 CMake 项目中。

   ```cmake
   add_library(xxx IMPORTED)
   ```
   
   导出目标是使用形如以下的语句添加的一个虚拟目标

   ```cmake
   install(TARGETS xxx EXPORT XxxModules)
   ```

   使用

   ```cmake
   install(EXPORT XxxModules ...)
   ```

   语句将导出目标的内容写入文件，即导出配置文件，用于将当前 CMake 项目==导出==成能够被其他项目使用的配置文件。

2. `install` 接口库目标只会在导出配置文件中添加对应的目标名称，并没有实际的形如 `*.a (*.lib)` 或 `*.so (*.dll)` 的库文件。本题目中并没有使用 `EXPORT` 指定导出目标，因此不会生成任何内容，但是如果指定了导出目标，那么 `my_interface` 接口库目标在导出配置文件中生成的内容是

   ```cmake
   # Create imported target my_interface
   add_library(my_interface INTERFACE IMPORTED)
   
   set_target_properties(my_interface PROPERTIES
     INTERFACE_INCLUDE_DIRECTORIES "${_IMPORT_PREFIX}/xxx"
     INTERFACE_LINK_LIBRARIES "xxx"
   )
   ```

:::
