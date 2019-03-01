# vue 组件之间的交流 #

### 父组件<Father /> 到 子组件<Children />

#### （一）父组件获取子组件中声明的变量/函数
> * 父组件通过ref获取子组件中声明的变量、方法
```
<template>
  <!-- 1.0 给组件添加 ref -->
  <Children ref="childrenRef" />
</template>
<script>
  import Children from 'Children'; //在父组件中引入子组件
  export default {
    components: {
      Children
    },
    methods: {
      fatherFuntion() {
        // 1.1 通过 $refs 获取和改变变量值
        console.log('获取子组件 变量childrenVariableVal 的值',this.$refs.childrenRef.childrenVariableVal);
        this.$refs.childrenRef.childrenVariableVal = '在父组件中更改 childrenVariableVal 的值'; //更改子组件变量
        this.$refs.childrenRef.childrenFuntion('fatherCompentValue'); //调用子组件的函数
        /*
        //当通过 v-for 重复引入该组件的时候,得到的是一个数组
        if(childrenRefs != null) {
					for(var i = 0; i < addQYR.length; i++) { //当引入多个的时候
						childrenRefs[i].childrenVariableVal = '在父组件中更改 childrenVariableVal 的值';
					}
				}
        */
      }
    }
  }
</script>
<style></style>
```
-
```
<template> <!-- 子组件 Children.vue --> </template>
<script>
  export default {
    data() {
      return {
        childrenVariableVal: '子组件中的变量值'
      }
    },
    methods: {
      childrenFuntion(val) {
        console.log("这是在 子组件 中声明的函数", val)
      }
    }
  }
</script>
<style></style>
```

### 子组件<Children /> 到 父组件<Father />
#### （一）在子组件中获取父组件变量和调用父组件方法

```
<template>
  <!-- 1.0 将变量和函数在标签中传递 -->
  <Children :fatherVariableVal="fatherVariableVal" v-on:fatherfuntion="fatherFuntion" />
</template>
<script>
  import Children from 'Children'; //在父组件中引入子组件
  export default {
    components: {
      Children
    },
    data() {
      return {
        fatherVariableVal: '子组件中的变量值'
      }
    },
    methods: {
      fatherFuntion(val) {
        console.log("这是从 子组件 中传过来的变量", val)
      }
    }
  }
</script>
<style></style>
```
-
```
<template> <!-- 子组件 Children.vue --> </template>
<script>
  export default {
    data() {
      return {
        childrenVariableVal: '子组件中的变量值'
      }
    },
    props: ['fatherVariableVal'], // 2.0 通过 props 接收标量
    methods: {
      childrenFuntion(val) {
        // 2.1 this 直接引用变量
        console.log("这是在 父组件中 传递过来的变量", this.fatherVariableVal);

        // 2.2 通过 this.$emit 调用
        this.$emit("fatherfuntion", this.childrenVariableVal);
        // this.$emit("fatherfuntion", '');
      }
    }
  }
</script>
<style></style>
```
