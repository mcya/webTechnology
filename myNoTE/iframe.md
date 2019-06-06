## iframe
`iframe` 元素会创建包含另外一个文档的内联框架（即行内框架）。

### 一些常用的属性
```
iframe常用属性:
1.frameborder:是否显示边框，1(yes),0(no)
2.height:框架作为一个普通元素的高度，建议在使用css设置。
3.width:框架作为一个普通元素的宽度，建议使用css设置。
4.name:框架的名称，window.frames[name]时专用的属性。
5.scrolling:框架的是否滚动。yes,no,auto。
6.src：内框架的地址，可以使页面地址，也可以是图片的地址。
7.srcdoc , 用来替代原来HTML body里面的内容。但是IE不支持, 不过也没什么卵用
8.sandbox: 对iframe进行一些列限制，IE10+支持
```

### `sandbox`属性
`sandbox`是h5的一个新属性,IE10+支持, 用来给指定`iframe`设置一个沙盒模型限制`iframe`的更多权限.

| 属性值   | 作用  |
| :--------:   | :----:  |
| allow-forms	| 允许进行提交表单 |
| allow-scripts	| 运行执行脚本 |
| allow-same-origin	| 允许同域请求,比如ajax,storage |
| allow-top-navigation	| 允许iframe能够主导window.top进行页面跳转 |
| allow-popups	| 允许iframe中弹出新窗口,比如,window.open,target="_blank" |
| allow-pointer-lock	| 在iframe中可以锁定鼠标，主要和鼠标锁定有关 |


### 获取`iframe`里的内容
主要的两个API就是`contentWindow`、`contentDocument`
即:
`var iframe = document.getElementById("iframe")`

`iframe.contentWindow`, 获取`iframe`的`window`对象
`iframe.contentDocument`, 获取`iframe`的`document`对象

### `iframe`安全：防嵌套网页
由于iframe享有着click的最优先权，当有人在伪造的主页中进行点击的话，如果点在iframe上，则会默认是在操作iframe的页面。 所以，钓鱼网站就是使用这个技术，通过诱导用户进行点击，比如，设计一个"妹妹寂寞了"等之类的网页，诱导用户点击，但实际结果，你看到的不是"妹妹",而是被恶意微博吸粉。
所以，为了防止网站被钓鱼，可以使用window.top来防止你的网页被iframe.
```js
try{
　　top.location.hostname;  //检测是否出错
　　//如果没有出错，则降级处理
　　if (top.location.hostname != window.location.hostname) {
　　　　top.location.href =window.location.href;
　　}
}
catch(e){
　　top.location.href = window.location.href;
}
```

### `iframe`跨域通讯之`postMessage`
[关于postMessage文档](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/postMessage)

```js
// 基本使用
otherWindow.postMessage(message, targetOrigin, [transfer]);
```

** 值得注意的是，使用`postMessage`一定要注意安全 **
来自文档的话：

------

**如果您不希望从其他网站接收message，请不要为message事件添加任何事件侦听器**。 这是一个完全万无一失的方式来避免安全问题。

如果您确实希望从其他网站接收message，请 **始终使用origin和source属性验证发件人的身份**。 任何窗口（包括例如http://evil.example.com）都可以向任何其他窗口发送消息，并且您不能保证未知发件人不会发送恶意消息。 但是，验证身份后，您仍然应该 **始终验证接收到的消息的语法**。 否则，您信任只发送受信任邮件的网站中的安全漏洞可能会在您的网站中打开跨网站脚本漏洞。

** 当您使用postMessage将数据发送到其他窗口时，始终指定精确的目标origin，而不是* **。 恶意网站可以在您不知情的情况下更改窗口的位置，因此它可以拦截使用postMessage发送的数据。

-------

使用：

网页A：
```js
document.domain = 'csdn.com';
var ifr = document.createElement('iframe');
ifr.src = 'http://script.csdn.com';
ifr.style.display = 'none';
document.body.appendChild(ifr);
// 发送数据
ifr.postmessage('hello, I`m a', 'http://script.csdn.com');
```
网页B:

```js
// 监听message事件
window.addEventListener('message', receiver, false);
function receiver(e) {
    if (e.origin == 'http://www.csdn.com') {
        if (e.data == 'hello, I`m a') {
            e.source.postMessage('hello, I`m b', e.origin);信息
        }
    }
}
```
