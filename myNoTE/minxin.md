# minxin

## 1.在`Vue中`的`minxin`
`混入 (mixin)` 提供了一种非常灵活的方式，来分发 Vue 组件中的可复用功能。一个混入对象可以包含任意组件选项。当组件使用混入对象时，所有混入对象的选项将被“混合”进入该组件本身的选项。

`react`中也可以使用`minxins-minxin`的使用，但是没必要，这玩意只会给它带来负担，增加复杂性，难以维护难度！

### 1.1 单页面

```js

// 定义一个混入对象
var myMixin = {
  created: function () {
    this.hello()
  },
  methods: {
    hello: function () {
      console.log('hello from mixin!')
    }
  }
}

// 定义一个使用混入对象的组件
var Component = Vue.extend({
  mixins: [myMixin]
})

var component = new Component() // => "hello from mixin!"
```

### 1.2 全局注入混入
在main.js中全局注册该`mixins`,是`Vue.mixin(MinXin)`;不是`Vue.use(MinXin)`;
```js
import MinXin from '@/components/MinXins/index.js'
Vue.mixin(MinXin);
```



## 2.在`sass`中的`minxin`
`sass` 的混合, 是通过`@minxin`声明一些公关样式 再通过 `@include`来引用它。
真正推荐使用`minxin 混合`的是sass的编写。其他的，用不到的可以不用考虑的。

```css
/* 声明 */
@mixin text-ellipsis () { /* 文本溢出显示省略号*/
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
/* 基本使用 */
.text {
  @include text-ellipsis
}
```

```css
/* @minxin 也可以类似JS接收一个参数 */
/* 跨浏览器的透明度设置 */
@mixin opacity($opacity) {
  opacity: $opacity;
  $opacity-ie: $opacity * 100;
  filter: alpha(opacity=$opacity-ie); /*ie8*/
}

.faded-text {
  @include opacity(0.8);
}
```

```css
/* sass 中海油一些更高阶的玩法： */
/* 自适应设置字号大小 */
@function calculateRem($size) { /*类似声明一个函数*/
  $remSize: $size / 16px;
  @return $remSize * 1rem;
}

@mixin font-size($size) {
  font-size: $size;
  font-size: calculateRem($size); /*函数调用*/
}

p {
  @include font-size(14px) /*使用minxin*/
}

/*
输入出结果：
p {
  font-size: 14px; //如果浏览器不支持rem将使用这个规则进行覆盖
  font-size: 0.8rem;
}
*/

```



## 3.在`less`中使用`minxin`
`less` 中的混合却没有那么强大了. `less`的混合一般是只有参数的传入。
不做声明。
less中就别弄这玩意了！
