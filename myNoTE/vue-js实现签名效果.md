# js实现签名效果
本文主要讲述如何实现js的签名效果，其中运用到的关键知识点便是`canvas`面板。

### 效果图
![在这里插入图片描述](https://img-blog.csdnimg.cn/20191209175005961.gif)

### 实现

#### 1.引入写好的函数以及插件
```html
<script src="jq-signature.js"></script> <!-- 插件 -->
<script src="writing.js"></script> <!-- 声明的相关函数 -->
```

##### 2.调用
```html
<!-- html结构代码 (vue结构) -->
<div class="modal-body" v-show="siginFlage">
  <div class="js-signature" id="mySignature"></div>
</div>
```

```js
// 开启签名canvas画布函数 (包含vue语法)
openSiginAction() {
  const _this = this;
  if (window.requestAnimFrame) {
    const width = document.documentElement.clientWidth * 0.9;
    const signature = $("#mySignature");
    signature.jqSignature({
      height: 200,
      width: width,
      border: '1px solid #000',
      background: '#fff',
      lineColor: '#000',
      lineWidth: 5,
      autoFit: false
    });
    // 监控是否已经在签名
    signature.on("jq.signature.changmove", function() {
      _this.pv = 1;
      _this.siginPv = 1;
    })
    this.siginFlage = true; //开启显示
  } else {
    alert("请加载jq-signature.js");
    return;
  }
},
```
```js
// 重写函数 - 清空画布
siginResetAction() {
  // Signature.clearCanvas()
  $('.js-signature').jqSignature('clearCanvas'); //清空画布
},
```
```js
// 获取签名数据函数
siginConfirmAction() {
  if (this.siginPv==0) {
    layer.open({
      content: '请签名!',
      skin: 'msg',
      style: 'top:-200px;',
      time: 3
    });
    return '';
  }
  //获取画布值
  const singeBase64 = $('.js-signature').jqSignature('getDataURL');
  return siginConfirmAction
},
```

### 相关文件链接_demo/js
> [点击这里，可直接查看demo和引入的两个JS](https://github.com/mcya/webTechnology/blob/master/library/sign_vue/menuSigna.html)
