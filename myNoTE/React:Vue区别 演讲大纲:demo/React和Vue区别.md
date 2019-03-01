
### Vue和React区别 - 基础语法

------

### 内容
  > * 理解
  > * 文件后缀差异
  > * 页面结构差异
  > * 变量存取差异
  > * 综合说明


------

#### 0. 理解
  > 可基于node开发的。
  > 使用虚拟dom节点  virtual DOM。
  > 提供了响应式 (Reactive) 和组件化 (Composable) 的视图组件。

  ###### 0.1 什么是 React
   > 中文文档 `http://www.css88.com/react/`
   > 用于构建用户界面的 JavaScript 库
   > 起源于 Facebook 的内部项目

  ###### 0.2 什么是 Vue
   > 官网 `https://cn.vuejs.org/`
   > 用于构建交互式的 Web 界面的库。
   > 尤雨溪是Vue.js框架的作者

  ##### 0.3 讲解疑问
   > ` :: ` 是函数绑定运算符, 用于函数绑定。
   >官方解释： `箭头函数可以绑定this对象，大大减少了显式绑定this对象的写法（call、apply、bind）。但是，箭头函数并不适用于所有场合，所以ES7提出了“函数绑定”（function bind）运算符，用来取代call、apply、bind调用。虽然该语法还是ES7的一个提案，但是Babel转码器已经支持。函数绑定运算符是并排的两个双冒号（::），双冒号左边是一个对象，右边是一个函数。该运算符会自动将左边的对象，作为上下文环境（即this对象），绑定到右边的函数上面。`


------

#### 1.文件后缀差异

  > 相同点: 都可存在 .html文件 .css/less/sass等关于css类型文件 .js文件
  > React: .jsx
  > Vue: .vue


------

#### 2.页面结构差异


- [x] React


```

  // 1.文件引入
  import React from 'react';
  import { bindActionCreators } from 'redux';
  const Option = Select.Option;

  // 2.class内 ： js+html
  class 名字 extends React.Component {

    // 2.1
    // js代码
    function1() {}
    function2() {}

    // 2.2
    render () {

      // 2.2.1
      // 变量声明
      // let/const/var ...

      // 2.2.2
      return (
        <div>
          <!-- 外层必须有且只有一层div -->
        </div>
      )
    }
  }

  // 3.一些声明，如依赖注入等
  function mapStateToProps(state, ownProps) {
    return {
      //从reduce里面引进来的数据
    }
  }
  function mapDispatchToProps(dispatch) {
    return {
      ...bindActionCreators(action, dispatch)
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(名字)

```

- [x] Vue

```
  <!-- 1 -->
  <template>
    <!-- HTML结构 -->
  </template>

  <!-- 2 -->
  <script>
    // js代码
    function1() {},
    function2() {}
  </script>

  <!-- 3 -->
  <style>
    /* css/less/sass代码 */
  <style>
```

- [x] 简化
```
  // React
  class 名字 extends React.Component {
    render() {
      return (
        <div>1</div>
      );
    } // 注意这里既没有分号也没有逗号
  }

  // Vue
  <template> </template>

  <script> </script>

  <style> <style>

```

------

#### 3.变量存取差异

 - [x] React -- state

```
 // 1.声明(state声明/class外声明/render-return之间声明)
 // 1.1 综合说明
 let a1; var b1; const c1;
 class 名字 extends React.Component {
   render() {
     let a2; var b2; const c2;
     return (
       <div>1</div>
     );
   }
 }

 // 1.2 state声明
  constructor() {
    super();
    this.state = {
      // 变量名: '',
      exampleName: '',
    }
  }

  // 2.引用
  var values = this.state.exampleName

  // 3.赋值
  this.setState({ exampleName: '2018' })
```

  - [x] Vue -- this

```
  // 1.声明
  data () {
    exampleName: '',
  },

   // 2.引用
   var values = this.exampleName

   // 3.赋值
   this.exampleName = 2018
```

------

### 综合

 - [x] React

```
   import React from 'react';
   const wrapName = 1;

   class className extends React.Component {
     constructor() {
        super();
        this.state = {
          // 变量声明
          stateName: '',
        }
      }

     function1() {
        // 引用state存储变量
        var values1 = this.state.stateName;
        // 引用 reduce变量
        var values2 = this.props.mapStateToPropsName;

        // 改变值
        this.setState({ stateName: '2018' });

        //函数调用
        this.function2(values1, values2);
     }
     function2(params1, params2) {
      console.log(params1, params2)
     }

     render () {
       // 也可以在这里直接使用state存储的变量和从reduce获取到的参数
       var values3 = this.state.stateName + this.props.mapStateToPropsName
       return (
         <div>
           <!-- 1.变量使用: {} -->
           <span>{wrapName + this.state.stateName + values3 + this.props.mapStateToPropsName}</span>

           <!-- 2.样式声明 -->
           <p style={{margin:-20, height:'60px', paddingLeft:20, 'border-buttom':"2px solid #efefef"}}></p>
         </div>
       )
     }
   }

   // 3.一些声明，如依赖注入等
   function mapStateToProps(state, ownProps) {
    return {
       mapStateToPropsName: state.getIn(['APP', 'mapStateToPropsName']),
     }
   }
   function mapDispatchToProps(dispatch) {
    return {
      ...bindActionCreators(action, dispatch)
    }
   }

   export default connect(mapStateToProps, mapDispatchToProps)(className)
```

   - [x] Vue

```
   <!-- 1 -->
   <template>
    <!-- HTML结构 -->
    <div id="appId">
      <!-- 1.变量的使用 -->
      <!-- 1.1 直接使用 {{}} -->
      <span>{{names1 + names2.namesObj}}</span>

      <!-- 1.2 循环式使用 v-for -->
      <span v-for="(item,$index) in exampleArr">
        <em>{{item.arrVlues}}</em>
      </span>

      <!-- 1.3 判断式使用 v-if -->
      <span v-if="exampleBoolean">2018</span>
      <span v-if=" example2.exampleObj=='2.2' ">2019</span>

      <!-- 1.4 经典式输入框使用 v-model -->
      <input type="text" v-model="exampleInputValue">

      <!-- 2.样式声明 -->
      <p style="margin:-20px; height:60px; paddingLeft:20px; border-buttom:2px solid #efefef;"></p>

      <!-- 3.变量式标签 : -->
      <p :id="example1" :data="example2.exampleObj"></p>
    </div>
   </template>

   <!-- 2 -->
   <script>
     // js代码

    data() {
      // 在data函数中声明变量
      example1: '1',
      example2: {
        exampleObj: '2.1'
      },
      exampleArr: [
        {arrVlues: '3.1', index: '1'},
        {arrVlues: '3.2', index: '2'},
        {arrVlues: '3.3', index: '3'},
      ],
      exampleBoolean: true,
      exampleInputValue: '',
    },
    function1() {
      // 变量在函数中直接通过 this 来引用即可
      var allDatas = this.example1 + this.example2.exampleObj;

      // 改变值--数据双向绑定，即刻改变输入框的值
      this.exampleInputValue = '2018 Hi';

      // 函数调用
      this.function2();
    },
    function2() {}
   </script>

   <!-- 3 -->
   <style>
     /* css/less/sass代码 */
   <style>
```
