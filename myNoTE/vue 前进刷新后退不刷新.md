# vue 实现 前进刷新后退不刷新


### 在`App.vue`中配置`keep-alive`
```
// <router-view></router-view> 外添加

<template>
  <div id="app">
  	<!-- 前进后退都刷新 -->
    <!-- <router-view></router-view> -->
    <keep-alive>
      <!-- 这里是会被缓存的视图组件 -->
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>

    <!-- 这里是不被缓存的视图组件 -->
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>
```

### 配置router路由，即`meta`对象中添加`keepAlive`属性

```
{
	path: '/add/addInfo',
	name: "addInfo",
	component: resolve => require(["../page/add/addInfo.vue"], resolve),
	meta: {
	    keepAlive: false, //此组件不需要被缓存
	}
},
{
	path: '/add/jtinfo',
	name: "jtinfo",
	component: resolve => require(["../page/add/jtinfo.vue"], resolve),
	meta: {
        keepAlive: true, //此组件需要被缓存
		sBack: false,
    }
},
```

### 在需要缓存的页面

```
  data(){
  	return {
  		isFirstEnter: false, // 是否第一次进入，默认false
      datas: [], //页面的数据
  	}
  },
	created() {
     // 只有第一次进入或者刷新页面后才会执行此钩子函数
     // 使用keep-alive后（2+次）进入不会再执行此钩子函数

     this.isFirstEnter=true;
   },
	 activated() {
     if(!this.$route.meta.isBack || this.isFirstEnter){
        // 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
        // 如果isFirstEnter是true，表明是第一次进入此页面或用户刷新了页面，需获取新数据
        this.datas=''// 把数据清空，可以稍微避免让用户看到之前缓存的数据

        // 执行了 mounted 中的事件
				/*
          this.loaGongkeInfoSearck()
				  this.TabSwitch(0);
				  this.heightM = document.body.scrollHeight;
        */
     }
     // 恢复成默认的false，避免isBack一直是true，导致下次无法获取数据
     this.$route.meta.isBack=false
     // 恢复成默认的false，避免isBack一直是true，导致每次都获取新数据
     this.isFirstEnter=false;

   },
	 beforeRouteEnter(to, from, next) {
      // 路由导航钩子，此时还不能获取组件实例 `this`，所以无法在data中定义变量（利用vm除外）
      // 参考 https://router.vuejs.org/zh-cn/advanced/navigation-guards.html

      // 所以，利用路由元信息中的meta字段设置变量，方便在各个位置获取。这就是为什么在meta中定义isBack
      // 参考 https://router.vuejs.org/zh-cn/advanced/meta.html

      if(from.name=='addInfo'){ //from.name即是路由里面的name属性值,即路径
          //判断是从哪个路由过来的
          to.meta.isBack=true; // 该路由过来当前页面 不需要刷新 获取新数据，直接用之前缓存的数据即可
      }
			if(from.name=='jtinfo'){
          to.meta.isBack=false;// 该路由过来当前页面 需要刷新 获取新数据
      }
      next();
    },

```
