# 搭建服务器，实现科学上网

## 1. 购买服务器

首先需要准备一台中国香港或者国外的服务器，可以在[阿里云](https://www.aliyun.com/product/list)购买，如果是学生购买，或者所在学校与阿里云有合作，可以享受价值 ¥300 的优惠券以及 3 折的优惠券（可以同时使用，相当于可以免费租一台 1000 块钱以内的服务器）

---

这里介绍三种节点搭建的方式

## 2. vmess 节点搭建

vmess 协议是一种用于网络代理的协议，它是由 v2ray 项目组设计并实现的。vmess 的设计目标是提供一个简单、易用、高效且安全的网络代理协议。vmess 协议支持多种传输协议，包括 TCP、mKCP、WebSocket（ws）、HTTP/2（h2）等。

### 2.1 vmess 原理

我们根据图 1 来介绍一下 vmess 的工作流程

::: center

![vmess](/images/proxy/vmess.svg)

<small>图1：vmess 工作原理</small>

:::

当我们在 Google 上搜索内容的时候，数据包会根据浏览器设置的系统代理，将流量转移到对应的端口，这里是 `127.0.0.1:8889`，此时 v2ray 客户端正在监听该端口，于是数据包会来到 v2ray，v2ray 会根据我们的配置信息，将这个数据封装成 vmess 协议的数据包。其中 vmess 协议包含三个部分，如下表所示

::: center

<small>表1：vmess 协议</small>
|  16字节  |  X字节   | 余下部分 |
| :------: | :------: | :------: |
| 认证信息 | 指令部分 | 数据部分 |

:::

- 数据部分：来自网页的数据；
- 指令部分：包含加密方式和自动生成的密钥，这些内容会对数据部分进行加密；
- 认证信息：包含系统时间戳与 uuid 组成的 MD5 hash 字符串。

VMess 协议会对数据包按顺序做以下操作

1. VMess 会在数据包前加上一块指令部分，首先是设置数据包的加密方式，例子里面的加密方式是 `auto` 因此会选择任意一种**加密方式 Sec**。同时也会生成一个随机的**密钥 Key**，有了加密方式和密钥后，就可以对数据部分进行加密了；
2. VMess 会根据 uuid 对指令部分加密，它的加密方式是固定的，也就是说和代理服务器是要提前商量好的；
3. VMess 还要在指令部分的头部加入认证信息，这个信息是系统时间戳与 uuid 组成的一个 MD5 哈希字符串；
4. 最后，按照指定的传输协议进行打包，这里是 TCP 协议，就会按照 TCP 协议的标准，给 VMess 协议包加上源 IP 地址、目标 IP 地址以及端口等信息。

到这里，经过 TCP 承载的数据包会从自己的电脑网口发出，经过防火墙的时候，普通的防火墙只知道你要访问这个 IP 地址，并且内部数据是加密过的，并不知道你要干什么，于是数据包被放行通过。

来到 v2ray 服务器，服务器将 TCP 头部数据删掉后，将内容提取出来并使用配置好的 VMess 协议进行解析。VMess 协议需要验证该内容是不是一个合法的 VMess 数据，就需要<font color="red">验证头部的认证信息是否合法</font>。这一串数据是由系统时间戳与 uuid 生成的哈希字符串，哈希生成操作不可逆，那么服务器会根据自己的时间戳生成一个大数组，数组包含当前时刻前后一段时间的范围上的所有时间戳，这些时间戳都会与 uuid 组合起来逐个计算 MD5 哈希值，然后再与收到的认证信息逐个比较。如果比对成功，则认为该数据包是合法的，则会按照约定好的解密方式，使用 uuid 对指令部分进行解密，接着根据指令部分提供的**加密方式**和**密钥**对数据部分进行解密，从而提取出数据部分的内容，此时，v2ray 服务器就得到了来自客户端发出的访问 Google 的请求，就会帮忙访问 Google，并将得到的数据按照刚才的流程返回给客户端。

::: warning
- **VMess 与系统时间有关**，因此如果系统时间与服务器时间相差超过了 90 秒，那么就无法认证通过；
- 至于指令部分的加密方式，由于是对称密钥加密的，密钥和加密方式都是由客户端自行设置并发送给服务器，服务器拿到密钥和加密方式后就可以直接开始解密了，这个过程只需要**保证两端设置的 uuid 一样**即可。
- 额外 ID `alterId` 建议使用 0，表示使用 AEAD 加密，可以避免一部分防火墙的重放攻击，但于此同时，原先的 MD5 的认证方式则失效。也就是说，要么使用 AEAD 加密（即 `alterId = 0`），要么使用 MD5 认证（即 `alterId != 0`）
:::

我们使用 v2ray 框架搭建 VMess 节点，点击[此处](https://github.com/v2fly/fhs-install-v2ray)以查看 v2ray 项目组 v2fly 有关下载和使用的 README，下载的内容在该仓库中有详细的说明，这里不多介绍，后文均假设已经安装了 v2ray。

打开终端，使用 ssh 工具与你的服务器建立连接，并且在其中输入

```bash
v2ray version
```

以查看 v2ray 安装情况，输入以下命令打开配置文件（要以 `root` 权限运行）

```bash
vim /usr/local/etc/v2ray/config.json
```

### 2.2 vmess + tcp

在 `config.json` 中输入以下内容，以实现最简单的 VMess 节点。

```json
{
  "inbounds": [
    {
      "port": 8388, // 端口号可自行更改，但注意防火墙是否允许该端口，后文不再赘述
      "protocol": "vmess",    
      "settings": {
        "clients": [
          {
            "id": "af41686b-cb85-494a-a554-eeaa1514bca7", // uuid，可自行修改，但要满足规则，后文不再赘述
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

编写完成后，在键盘上按下 `Esc` 按键，并输入 `:wq` 以保存并退出。重启 v2ray 服务

```bash
systemctl restart v2ray
```

查看服务状态

```bash
systemctl status v2ray
```

VMess 默认使用 TCP 协议作为流量的承载，因此配置上比较简单，但是由于传输的都是无规则的字节流，在敏感时期会引起防火墙的注意，长时间的 VMess 通信，防火墙就会直接把你干掉了。这时有两种措施。

### 2.3 vmess + ws

WebSocket（WS）是一种网络通信协议，它在单个 TCP 连接上提供全双工（双向的）通信通道。这种协议使得服务器和客户端之间的数据交换变得更加简单，允许服务端主动向客户端推送数据。WS 流量也是使用 TCP 进行承载，我们可以使用 WS 作为 VMess 流量的承载，此时建立连接是通过 HTTP 以及 HTTPS 完成的，因此能通过大多数防火墙，其配置文件如下。

```json
{
  "inbounds": [
    {
      "port": 8388,
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
          "path": "/ray" // 这个 ray 可以随便写，比方说写 "/ccc"
        },
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

保存后重启服务即可。

### 2.3 vmess + tcp(ws) + tls

另一种方式是引入 TLS 对数据进行加密，这样数据表面上就和 HTTPS 流量没什么区别，这种方式使用上稳定性最高。加入 TLS 后，网络拓扑结构改变不大，只是在流量承载方式上，原先直接给 TCP 承载的流量，现在都需要经过 TLS 进行加密，变成 HTTPS 流量，再经由 TCP 承载。我们使用“→”表示承载关系，也就是说，

- 在 `vmess + tcp + tls` 的结构中，VMess → TLS → TCP → 网络层
- 在 `vmess + ws + tls` 的结构中，VMess → WS → TLS → TCP → 网络层

使用 TLS 加密时，需要申请对应的证书 `*.crt`，并生成对应的私钥文件 `*.key`，并且需要实现准备一个域名，该域名必须已经被解析至你的服务器。申请 Let's Encrypt 证书的步骤如下

::: warning
请使用 `root` 权限运行以下命令
:::

```bash
# 安装 acme
curl https://get.acme.sh | sh
# 添加软链接
ln -s /root/.acme.sh/acme.sh /usr/local/bin/acme.sh
# 切换 CA 机构
acme.sh --set-default-ca --server letsencrypt
# 申请证书
acme.sh  --issue -d 替换为你的域名 --standalone -k ec-256
# 安装证书
acme.sh --installcert -d 替换为你的域名 --ecc --key-file /usr/local/etc/v2ray/server.key --fullchain-file /usr/local/etc/v2ray/server.crt 
```

这时证书和域名会被安装在 `/usr/local/etc/v2ray` 下，路径可自行选择，但下文的配置文件中需要对应修改。v2ray 配置文件如下，注释中的内容表示 WS 的配置。

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
        "network": "tcp", // "network": "ws",
                          // "wsSettings": {
                          //   "path": "/ray"
                          // },
        "security": "tls",
        "tlsSettings": {
          "certificates": [
            {
              "certificateFile": "/usr/local/etc/v2ray/server.crt", 
              "keyFile": "/usr/local/etc/v2ray/server.key" 
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

保存后重启服务即可。

## 3. shadowsocks 节点搭建

::: warning
待补充 ...
:::

## 4. trojan 节点搭建

::: warning
待补充 ...
:::
