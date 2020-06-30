# 关于ES6新增的一些的东西 #

> 一些开发中可能会用到的东西


## 1.变量的定义
使用`let` `const` 替代 `var` 声明变量。
使用 `let` `const` 声明的变量名不可重复且变量只是块级作用。

```js
// 三目运算符的进阶：

// 短路运算符
const a = d && 1; // 满足条件赋值：取假运算，从左到右依次判断，遇到假值返回假值，后面不再执行，否则返回最后一个真值
const b = d || 1; // 默认赋值：取真运算，从左到右依次判断，遇到真值返回真值，后面不再执行，否则返回最后一个假值
const c = !d; // 取假赋值：单个表达式转换为true则返回false，否则返回true

const flagA = true; // 条件A
const flagB = false; // 条件B
(flagA || flagB) && Func(); // 满足A或B时执行
(flagA || !flagB) && Func(); // 满足A或不满足B时执行
flagA && flagB && Func(); // 同时满足A和B时执行
flagA && !flagB && Func(); // 满足A且不满足B时执行

```

```js
// 函数自执行
const Func = function() {}(); // 常用

( function(){} )(); // 常用: (函数)()
( function(){}() ); // 常用: (函数())

```

## 2.字符串新增的一些实际开发中会用到的方法

### (1) `indexOf()` 升级版 【 `includes()`, `startsWith()`, `endsWith()` 】
```js
// 传统上，JavaScript 只有 indexOf 方法，可以用来确定一个字符串是否包含在另一个字符串中

// includes()：返回布尔值，表示是否找到了参数字符串。
// startsWith()：返回布尔值，表示参数字符串是否在原字符串的头部。
// endsWith()：返回布尔值，表示参数字符串是否在原字符串的尾部。
let s = 'Hello world!';

// 常规
s.startsWith('Hello') // true
s.endsWith('!') // true
s.includes('o') // true

// 支持第二个参数
// 表示开始搜索的位置
s.startsWith('world', 6) // true
s.endsWith('Hello', 5) // true
s.includes('Hello', 6) // false
// 使用第二个参数n时, endsWith 的行为与其他两个方法有所不同。它针对前 n 个字符，而其他两个方法针对从第 n 个位置直到字符串结束。
```

### (2) `trim()`消除首尾空格, `trimStart()`只消除字符串头部的空格保留尾部空格, `trimEnd()`只消除尾部的空格保留首部空格 - 常用于表单
```js
const s = '  a b c  ';

s.trim() // "a bc"
s.trimStart() // "a bc  "
s.trimEnd() // "  a bc"
```

## 3.数值`Number`

### (1)ES5的一些方法属性新增到`Number`上, 逐步减少全局性方法，使得语言逐步模块化;
```js
// es5:
isFinite("25") // false
isNaN("NaN") // false
parseInt('12.34') // 12
parseFloat('123.45#') // 123.45

// es6:
Number.isFinite("25") // false
Number.isNaN("NaN") // false
Number.parseInt('12.34') // 12
Number.parseFloat('123.45#') // 123.45
```

### (2)` Number.isInteger()`用来判断一个数值是否为整数-但是不准确，在此紧起到提示作用 - 应该用求余数的方式
```js
Number.isInteger(3.0000000000000002) // true -不准确 - 如果数值的精度超过54位这个限度，第54位及后面的位就会被丢弃
Number.isInteger('15') // false - 无法识别字符串
```











---------------------

#### 9.2 数组合并
```js
const arr1 = [0, 1, 2];
const arr2 = [3, 4, 5];
const arr = [...arr1, ...arr2];

const _arr = [0, 1, 2];
const arr3 = [..._arr]; //也可以这样克隆
// arr3 => [0, 1, 2]
```

#### 9.3 过滤
```js
// 过滤：undefined、null、""、0、false、NaN
// 注意会把 0 和 false 给过滤 不适合做表单检验 只是用在特定场景
const arr = [undefined, null, "", 0, false, NaN, 1, 2].filter(Boolean);
// arr => [1, 2]
```


### 10.对象 - es6

#### 10.1 对象合并
```js
const obj1 = {a:1}
const obj2 = {
  ...obj1,
  b: 2
}

// or
const obj3 = Object.assign(obj1, obj2)
```

#### 10.2 获取对象属性值、for in 替代品
```js
// 取对象值 避免for in
const env = "prod";
const link = {
    dev: "Development Address",
    test: "Testing Address",
    prod: "Production Address"
}[env];
// link => "Production Address"

const linkFunction = env => {
  const link = {
      dev: "Development Address",
      test: "Testing Address",
      prod: "Production Address"
  }[env];
  return link;
}
const envVal = linkFunction('prod');
// envVal =>  "Production Address"
```

#### 10.3 花式声明对象 - 应用场景少见
```js
const flag = false;
const obj = {
    a: 0,
    b: 1,
    [flag ? "c" : "d"]: 2
};
// obj => { a: 0, b: 1, d: 2 }
```

#### 10.4 删除指定属性
```js
const obj = { a: 0, b: 1, c: 2 }; // 去掉属性a 只想拿b和c
const { a, ...rest } = obj; //等价于声明出一个rest新变量来保存接下来的值 同时不会改变obj的内容
// rest => { b: 1, c: 2 }
```
