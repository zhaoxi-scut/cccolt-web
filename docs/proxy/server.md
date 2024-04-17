# 搭建服务器，实现科学上网

## 购买服务器

首先需要准备一台中国香港或者国外的服务器，可以在[阿里云](https://www.aliyun.com/product/list)购买，如果是学生购买，或者所在学校与阿里云有合作，可以享受价值 ¥300 的优惠券以及 3 折的优惠券（可以同时使用，相当于可以免费租一台 1000 块钱以内的服务器）

---

这里介绍三种节点搭建的方式

## vmess 节点搭建

vmess 协议是一种用于网络代理的协议，它是由 v2ray 项目组设计并实现的。vmess 的设计目标是提供一个简单、易用、高效且安全的网络代理协议。vmess 协议支持多种传输协议，包括 TCP、mKCP、WebSocket（ws）、HTTP/2（h2）等。

vmess 协议包含三个部分，如下表所示

<center>

表1：vmess 协议

|  16字节  |  X字节   | 余下部分 |
| :------: | :------: | :------: |
| 认证信息 | 指令部分 | 数据部分 |

</center>


我们使用 v2ray 框架搭建 vmess 节点，点击[此处](https://github.com/v2fly/fhs-install-v2ray)以查看 v2ray 项目组 v2fly 有关下载和使用的 README，下载的内容在该仓库中有详细的说明，这里不多介绍，后文均假设已经安装了 v2ray。

打开终端，使用 ssh 工具与你的服务器建立连接，并且在其中输入

```bash
v2ray version
```

以查看 v2ray 安装情况，输入以下命令打开配置文件（要以 `root` 权限运行）

```bash
vim /usr/local/etc/v2ray/config.json
```

### vmess + tcp

在 `config.json` 中输入以下内容，以实现最简单的 vmess 节点。

```json
{
  "inbounds": [
    {
      "port": 8388, // 端口号可自行更改，但注意防火墙是否允许该端口
      "protocol": "vmess",    
      "settings": {
        "clients": [
          {
            "id": "af41686b-cb85-494a-a554-eeaa1514bca7",  
            "alterId": 0
          }
        ]
      }
    }
  ],
  "outbounds": [
    {
      "protocol": "freedom",  
      "settings": {}
    }
  ]
}
```

vmess 默认使用 tcp 协议作为流量的承载，因此配置上比较简单，但是由于

### vmess + ws + tls

```json
{
  "inbounds": [
    {
      "port": 8838, 
      "protocol": "vmess",    
      "settings": {
        "clients": [
          {
            "id": "af41686b-cb85-494a-a554-eeaa1514bca7",  
            "alterId": 0
          }
        ]
      },
      "streamSettings": {
        "network": "ws",
        "wsSettings": {
          "path": "/ray"
        },
	"security": "tls",
        "tlsSettings": {
          "certificates": [
            {
              "certificateFile": "<你的证书路径>", 
              "keyFile": "<你的私钥路径>" 
            }
          ]
        }
      }
    }
  ],
  "outbounds": [
    {
      "protocol": "freedom",
      "settings": {}
    }
  ]
}

```

## shadowsocks 节点搭建

> 待补充 ...

## trojan 节点搭建

> 待补充 ...
