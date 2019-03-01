vux popup-picker当选项值过长的时候全部显示解决方案之一

### 效果图

### 实现步骤

#### 1.对`popup-picker`组件添加`on-shadow-change`函数(即滑动`picker`时触发)
```html
<popup-picker title="标题" :data="data" v-model="val" @on-shadow-change="onShadowChange" :columns="3" show-name></popup-picker>
```

#### 2.在css中用`css3动画`写好横向滚动的样式
```css
.vux-popup-picker .vux-flex-row .vux-flexbox-item:nth-child(3) .scroller-item {
	/*统一piker选项值文字居左对齐，保证在滚动结束后文字能统一居左*/
	/*以此类推，如果是其他的框架组件，也是这样，先找到对应piker样式再更改*/
	text-align: left;
}

/*使用css3 animation属性实现滚动*/
.changeClass {
  overflow: auto!important;
  width: 300px; /*需要设置宽度*/
  -webkit-animation: marquee 3s linear 1;
  animation: marquee 3s linear 1;
}
@keyframes marquee {
  0% {
      transform: translateX(10px);
  }
  100% {
      transform: translateX(-210px);
  }
}
```

#### 3.声明`onShadowChange`函数，控制什么时候滚动
```js
onShadowChange() {
	// divVaue获取到选择项的文字值，divWidth为当前选项块的宽度 - 关键是找到对应的值即可
	var divVaue = $(".vux-popup-picker .vux-flex-row").find(".vux-flexbox-item").eq(2).find(".scroller-item-selected").text(), divWidth=$(".vux-popup-picker .vux-flex-row").find(".vux-flexbox-item").eq(2).width();
	if (divVaue && divVaue!=="" && divVaue!==" ") { //当第三选项有值得时候
		$(".vux-popup-picker .vux-flex-row").find(".vux-flexbox-item").eq(2).find(".changeClass").each(function() {
			$(this).removeClass("changeClass");//清除changeClass，保证往回滑或者关闭后重新选择能继续滚动
		});
		if (divVaue.length >= parseInt(divWidth/16)) { //当文字超出或者等于第三选项块的宽度的时候横向旋转一圈，全部显示
			$(".vux-popup-picker .vux-flex-row").find(".vux-flexbox-item").eq(2).find(".scroller-item-selected").addClass("changeClass")
		}
	}
}
```

### 总结

> 通过piker滑动的函数来触发是否需要滚动以显示全部的文字。关键是找到对应的节点位置和css3动画滚动样式。






