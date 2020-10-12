## http web前端部分

### 关于 Chrome 抓包:Network 面板
• 控制器:控制面板的外观与功能
• 过滤器:过滤请求列表中显示的资源
• 按住 Command (Mac)或 Ctrl (Window / Linux)，然后点击过滤器可以 同时选择多个过滤器
• 概览:显示 HTTP 请求、响应的时间轴
• 请求列表:默认时间排序，可选择显示列
• 概要:请求总数、总数据量、总花费时间等

详见 【第1部分 HTTP1协议.pdf】第50页，这里应该无需做过多关注

### 关于HTTP响应码
详细看: [http响应码.md](./http响应码.md) 或者 [常见的HTTP状态码（错误码）及解决经验分享](https://yayaplus.blog.csdn.net/article/details/73294267)

1xx: 请求已接收到，需要进一步处理才能完成，HTTP1.0 不支持

2xx:成功处理请求

3xx:重定向使用 Location 指向的资源或者缓存中的资源。在 RFC2068 中规定客户端重定向次数不应超过 5 次，以防止死循环。

4xx:客户端出现错误

5xx:服务器端出现错误

### http服务器路由 - HOST
```
1.建立 TCP 连接
  确定服务器的 IP 地址
2.接收请求
3.寻找虚拟主机
  匹配 Host 头部与域名
4.寻找 URI 的处理代码
  匹配URI
5.执行处理请求的代码
  访问资源
6.生成 HTTP 响应
  各中间件基于 PF 架构串行修改响应
7.发送 HTTP 响应
8.记录访问日志

TCP - 请求 - 虚拟机 - URL - 处理请求 - 生成http响应 - 发送http - 记录日志
```

### http请求的一些参数说明

#### (1) `User-Agent` - (Request-Header: User-Agent) - 客户端的类型信息
指明客户端的类型信息，服务器可以据此对资源的表述做抉择
```
包含信息：
HTTP请求的系统(win32/win64/os)
浏览器内核(AppleWebkit/Gecko)
浏览器名(chrome/Firefox/safari)
浏览器的版本号

火狐:
• User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64; rv:66.0) Gecko/20100101 Firefox/66.0

谷歌:
• User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36
```

#### (2) `Referer` - (Request-Header: Referer) - 请求源
浏览器对来自某一页面的请求自动添加的头部,其值为，当前HTTP请求的来源。
即 我们可以通过请求源来组织相关站点的请求，比如微信转发不了抖音的链接，微信可判断该分享请求来自于抖音，然后进行拒绝。
```
一般用于服务器端的:
1.统计分析
2.缓存优化
3.防盗链 等功能

Referer 不会被添加的场景:
1.来源页面采用的协议为表示本地文件的 "file" 或者 "data" URI - (本地文件)
2.当前请求页面采用的是 http 协议，而来源页面采用的是 https 协议 - (协议不一致)
```

#### (3) `From`
主要用于网络爬虫, 告诉服务器如何通过邮件联系到爬虫的负责人
```
From: webmaster@example.org
```

#### (4) `Server` - (Response-Header: Server)
指明服务器上所用软件的信息，用于帮助客户端定位问题或者统计数据
```bash
Server: nginx
Server: openresty/1.13.6.2

Server: alb/2.0.0 #销售系统
```

#### (5) `Allow`与`Accept-Ranges` (不常见)
Allow:告诉客户端，服务器上该 URI 对应的资源允许哪些方法的执行
Accept-Ranges:告诉客户端服务器上该资源是否允许 range 请求


### `HTML FORM`表单
```
HTML FORM 表单提交请求时的关键属性

action:提交时发起 HTTP 请求的 URI
method:提交时发起 HTTP 请求的 http 方法
  • GET:通过 URI，将表单数据以 URI 参数的方式提交
  • POST:将表单数据放在请求包体中提交
enctype:在 POST 方法下，对表单内容在请求包体中的编码方式
  • application/x-www-form-urlencoded
    数据被编码成以 ‘&’ 分隔的键-值对, 同时以 ‘=’ 分隔键和值，字符以 URL 编码方式编码
  • multipart/form-data
    boundary 分隔符
    每部分表述皆有HTTP头部描述子包体，例如 Content-Type
    last boundary 结尾
Content-type 头部指明这是一个多表述包体
Boundary 分隔符的格式
  boundary := 0*69<bchars> bcharsnospace
    bchars := bcharsnospace / " "
    bcharsnospace:=DIGIT/ALPHA/"'"/"("/")"/"+"/"_"/","/"-"/"."/"/"/":" / "=" / "?"
```

### `Range`条件请求
1.如果客户端已经得到了 Range 响应的一部分，并想在这部分响应未过期 的情况下，获取其他部分的响应
2.通过`bytes`截取所需要的长度部分
```bash
Content-Range: bytes=0-5,10-15 #截取两段

#显示出来的用 -- 分开表示 ==> 以 -- 开始 也，以 -- 结束
--12345
--12345--
```
3.应用: 断点续传、多线程下载


### 关于`Cookie`

#### 1.Cookie特点
```
Cookie特点:

保存在客户端 - 存放在内存或者磁盘中 （引出 同源策略）
由浏览器维护 - 服务器端生成 Cookie 在响应中通过 Set-Cookie 头部告知客户端(允许多 个 Set-Cookie 头部传递多个值)
表示应用状态的HTTP头部 - 客户端得到 Cookie 后，后续请求都会 自动将 Cookie 头部携带至请求中

整套流程:
http发送请求的时候，服务端收到请求指令后通过 set-cookie 发送cookie给客户端，然后客户端获取到cookie后，再自动放在头部请求里
===> 客户端 --http://url--> 服务端 --set-cookie--> 客户端 --cookie-->服务端

注意:
服务端set-cookie 服务端只能一次传一个cookie值，但是可以传多次传输
客户端cookie 只能发送一次cookie，但是可以放多个值
```

#### 2.Cookie的缺点限制
```
Cookie的缺点：

- Cookie 会被附加在每个 HTTP 请求中，所以无形中增加了流量
- 由于在 HTTP 请求中的 Cookie 是明文传递的，所以安全性成问题(除非用 HTTPS)
- Cookie 的大小不应超过 4KB，故对于复杂的存储需求来说是不够用的
  (RFC规范规定了浏览器支持每条cookie的长度最少要达到4kb, 由于浏览器很多，不同的浏览器支持的长度可能不一致，为了保证在所有浏览器都能使用，也就限制了cookie最大长度为4kb)
```


### 同源策略
由于cookie的特性(存在本地/明文)，
而不同的站点会有不同的cookie信息，
cookie中一般包含了用户的隐私信息，
为了避免不同的网站通过cookie来获取用户信息，引出了同源策略。

同源策略内容:
1.限制了从同一个源加载的文档或脚本如何与来自另一个源的资源进行交互
2.协议、主机、端口必须完全相同

#### 为什么需要同源策略
为什么需要同源策略:
1.同一个浏览器发出的请求，未必都是用户自愿发出的请求;
2.站点 b 收到的来自同一浏览器的请求，可能来自于站点 a 的cookie信息

所以，如果没有同源策略:
1.只能保证用户请求来自于同一浏览器，不能确保是用户自愿发出的
2.站点 B 的脚本就可以随意修改站点 A 的 DOM 结构
