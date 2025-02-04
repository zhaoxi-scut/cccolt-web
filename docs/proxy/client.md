# 下载客户端，开始科学上网

## Windows

在浏览器中输入以下网址，可以下载对应的客户端

```txt
https://proxy.cccolt.top/datas/v2rayN-With-Core.zip
```

下载完成后，解压到任意目录，双击 `v2rayN.exe` 即可打开客户端，如下图

## Linux

### Qv2ray 教程

没有安装 `curl` 的先输入以下命令安装

```bash
sudo apt install curl
```

#### 1. 下载 Qv2ray 和 Xray-core

打开终端，输入以下命令

```bash
curl -s https://proxy.cccolt.top/scripts/linux-qv2ray | bash
```

#### 2. 配置 Qv2ray

进入你的桌面，应该可以看到一个图标

::: center

![qv2ray-icon-unspported](/images/proxy/qv2ray-icon-unspported.png)

:::

右键，点击**允许运行**后，可以看到图标变成了如下形式

::: center

![qv2ray-icon](/images/proxy/qv2ray-icon.png)

:::

双击运行该程序，可打开主界面

![qv2ray-main](/images/proxy/qv2ray-main.png)

点击左上角 `首选项->内核设置`，修改

- V2ray 核心可执行文件路径为：`/home/xxx/.config/qv2ray/xray-core/xray`，`xxx` 为你自己的用户名
- V2ray 资源目录为：`/home/xxx/.config/qv2ray/xray-core/`，`xxx` 为你自己的用户名

然后点击 `检查 V2ray 核心设置`，查看内核是否正常，如果提示以下内容

![xray-core-check](/images/proxy/xray-core-check.png)

则表明内核设置成功，点击右下角 OK 按钮退出并回到主界面。

点击左上角 `分组` 按钮，按照下图指示，依次设置

![qv2ray-sub](/images/proxy/qv2ray-sub.png)

1. 修改分组名称，名称随意，可修改为 `我的科学上网`
2. 点击订阅设置
3. 勾选**此分组是一个订阅**
4. 设置订阅地址为 ~~`https://proxy.cccolt.top/sub/xxx`~~
5. 设置订阅类型为 `Builtin Subscription Support: Basic Base64`
6. 更新订阅，如果出现了表示条目不为空的提示信息，则全部勾选 `Yes`
7. 退出，点击右下角的 OK 按钮 

回到主界面，可以看到右侧多出了若干节点，这些节点就是对应的代理服务器，双击其中一个即可进行连接，如下图。

![qv2ray-success](/images/proxy/qv2ray-success.png)

鼠标右键对应的节点，也可点击

- 测试延迟，此延迟为建立 TCP 连接的延迟
- 测试真实延迟，此延迟默认情况下是请求 [Google](https://www.google.com) 主页数据的延迟
