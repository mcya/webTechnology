#### 简述
本文主要讲述，vue在手机移动端如何实现对小图进行放大查看预览。类似于朋友圈的照片查看。


----------


#### 可用工具
> * 1、npm安装，`npm i vue-preview -S`
> * 2、使用一些Vue的UI组件框架自带的，如`vux、vonic、Mint UI`等 自带的preview


----------
#### 效果图



----------
#### 实现代码
**（一）HTML**
```
<div v-show="listDatas && listDatas.length>0">
<!-- 九宫格小图预览，没张图战三分之一，imgWidth为通过实时手机屏幕获取到图片宽高 -->
  <img class="previewer-demo-img" v-for="(item, index) in listDatas" :src="item.src" width="100" @click="showImgs(index)" :style="{width: imgWidth, height: imgWidth}">
</div>
<div v-show="listDatas && listDatas.length==0">
  <span style="font-size: 12px;color:#8f8e94;">暂无证明文件</span>
</div>
<div v-transfer-dom>
  <!-- previewer配置 -->
  <previewer :list="listDatas" ref="previewer" :options="options"></previewer>
</div>
```
**（二）js**
```
data() {
 return {
  imgWidth: '375px',
  listDatas: [],
  options: { //需正确配置
    getThumbBoundsFn (index) {
      let thumbnail = document.querySelectorAll('.previewer-demo-img')[index];
      let pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
      let rect = thumbnail.getBoundingClientRect()
      return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
    }
  }
 }
},
mounted() {
 //根据实际手机屏幕 获取图片宽高
 this.imgWidth = parseInt((Number(window.screen.width) - 45) / 3) + 'px';
},
methods: {
 showImgs (index) { //显示特定index的图片，使用ref
  this.$refs.previewer.show(index)
 },
 loaGongkeSearck(searchFlag) { // 获取图片路径，通过base64转换显示。
  var params = {
        appealid: this.$route.query.appealid,
    projid: this.$store.state.core.loginFormInfo.projId,
    orgid: this.$store.state.core.loginFormInfo.orgid,
    appcode: this.$store.state.core.loginFormInfo.appcode
  }
  this.$http.post(this.HOST+"/online/queryAppeal.do", params,{emulateJSON:true}
  ).then(function(response){
      if (response.data.data.attach_path && response.data.data.attach_path.length>0) {
        for (var i = 0; i < response.data.data.attach_path.length; i++) {
          this.listDatas.push({
            msrc: 'data:image/jpeg;base64,' + response.data.data.attach_path[i],
            src: 'data:image/jpeg;base64,' + response.data.data.attach_path[i],
            w: 900,
            h: 1200,
          })
        }
      }
     }
  }, function(response){
  })
},
}
```

#### 结束语
Vue 移动端 previewer实现图片放大预览。