### Vue和react的区别

------

### 内容

  > * 文件名差异
  > * 页面结构差异
  > * 变量存取差异


------

#### 1.文件名差异



  > 相同点: .html .css/less/sass等关于css类型文件 .js
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
  class 你的名字 extends React.Component {

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

  export default connect(mapStateToProps, mapDispatchToProps)(你的名字)

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

------

#### 3.变量存取差异

 - [x] React -- state

```
 // 1.声明
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
