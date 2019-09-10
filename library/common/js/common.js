function getUrlParams(objName) { // 获取URl
  var data = window.location.href;
  if (data.indexOf("?") < 0)
    return undefined; //判断是否存在参数
  var allParamsArr = data.split("?")[1].split("&"),
    returnObj = {};
  if (allParamsArr.length == 0)
    return undefined; //参数是否带惨，狗屁的有的人无聊带问号不带参数的
  for (var i = 0; i < allParamsArr.length; i++) {
    returnObj[`${allParamsArr[i].split("=")[0]}`] = allParamsArr[i].split("=")[1]
  }
  return returnObj[`${objName}`]
}

function formatDate(date, fmts) { //时间格式化
  var fmt = fmts ? fmts : 'yyyy-MM-dd';
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  var o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (var k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      var str = o[k] + '';
      fmt = fmt.replace(
        RegExp.$1, (RegExp.$1.length === 1)
        ? str
        : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero(str) {
  return ('00' + str).substr(str.length);
}

function numSub(num1, num2) { //减法精度 num1 - num2
	var baseNum, baseNum1, baseNum2;
	var precision;// 精度
	try {
		baseNum1 = num1.toString().split(".")[1].length;
	} catch (e) {
		baseNum1 = 0;
	}
	try {
		baseNum2 = num2.toString().split(".")[1].length;
	} catch (e) {
		baseNum2 = 0;
	}
	baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
	precision = (baseNum1 >= baseNum2) ? baseNum1 : baseNum2;
	return ((num1 * baseNum - num2 * baseNum) / baseNum).toFixed(precision);
}

function encryptionCode(str) { //加密
  var encode = "";
  str = String(str);
  for (var i = 0; i < str.length; i++) {
    var code = str.charCodeAt(i);
    encode += code;
    encode += ",";
  }
  return encode
}

function decryptCode(str) {//解密
  if (str && str.indexOf(',')>=0) {
    var arr = str.split(","), decode = "";
    for (var i = 0; i < arr.length; i++){
      var code = parseInt(arr[i]);
      decode += String.fromCharCode(code);
    }
    return decode;
  }
}
function IntegerToFloat(num){ // 1.00 1.10  1.11
  if (num == null || num == 'NaN') {
    return '';
  }
  const arr = num.toString().split('.');
  if (arr.length === 1) {
    return `${num}.00`;
  } else if (arr.length === 2 && arr[1].length === 1) {
    return `${num}0`;
  } else {
    return num;
  }
}
function changeNum(value) { //value  -限制
  //如果用户第一位输入的是小数点，则重置输入框内容
  var value = String(value)
  if (value != '' && value.substr(0, 1) == '.') {
    value = "";
  }
  value = value.replace(/^0*(0\.|[1-9])/, '$1'); //粘贴不生效
  value = value.replace(/[^\d.]/g, ""); //清除“数字”和“.”以外的字符
  value = value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
  value = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
  value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两个小数
  // if (value.indexOf(".") < 0 && value != "") { //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
  //   if (value.substr(0, 1) == '0' && value.length == 2) {
  //     value = value.substr(1, value.length);
  //   }
  // }
  return value
}

function getUuid() { //uuid
  var nowDate = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (nowDate + Math.random()*16)%16 | 0;
    nowDate = Math.floor(nowDate/16);
    return (c=='x' ? r : (r&0x3|0x8)).toString(16);
  });
  return uuid;
}

// ---------------------
// 作者：mcya
// 来源：CSDN
// 原文：https://blog.csdn.net/genius_yym/article/details/53710806
// 版权声明：本文为博主原创文章，转载请附上博文链接！

// ----------------- POS SDK -----------------


$(function() {
  function loadingToAjax() {
    $(document).ajaxStart(function (a, b) {
      console.log('a', a);
      console.log('b', b);
      layer.open({type: 2, content: "数据加载中"});
    })
  }
  loadingToAjax();
})

// 相对意义上的拦截 物理返回键
// window.addEventListener("popstate", function(e) {
//   console.log('e', e);
//   window.history.pushState(null, null, "#");
// })

// 禁止右键+复制
// document.oncontextmenu=new Function("event.returnValue=false");
// document.onselectstart=new Function("event.returnValue=false");
// document.ontouchstart=new Function("event.returnValue=false");
var closeNumKeyBoardFlage = false;
function closeNumKeyBoardCommon() {
  $(".footer").css('bottom', '0');
  $(".fade-twinkle").css('display', 'none')
}














//刷卡支付
function LKLPayWithCard() {
  window.LakalaJSWebPaySimple.showPayParamDialog(0);
}

//刷卡支付
function DemoLKLPayWithCard(value) {
  var jsonStr = JSON.stringify(value);
  window.LakalaJSWebPay.LKLPayWithCard(jsonStr, "lklWebPayCallback");
  //window.LakalaJSWebPay.LKLPayWithCard("{\"amt\":\"0.01\", \"order_no\":\"123675341\",\"order_info\":\"订单具体信息\",\"print_info\":\"附加打印数据\",\"return_type\":\"1\",\"adddataword\":\"附加数据\",\"reserve\":\"\",\"remarkinfo\":\"返回第三方传入的数据\"}","lklWebPayCallback");
}

//扫码支付
// void LKLPayWithCode(String data, String signature, String lklWebPayCallback)
function LKLPayWithCode() {
  window.LakalaJSWebPaySimple.showPayParamDialog(2);
}

//扫码支付
function DemoLKLPayWithCode(value) {
  var jsonStr = JSON.stringify(value);
  window.LakalaJSWebPay.LKLPayWithCode(jsonStr, "lklWebPayCallback");
  //window.LakalaJSWebPay.LKLPayWithCode("{\"amt\":\"0.01\", \"order_no\":\"123456134\",\"order_info\":\"订单具体信息\",\"print_info\":\"附加打印数据\",\"return_type\":\"1\",\"adddataword\":\"附加数据\",\"reserve\":\"\",\"remarkinfo\":\"返回第三方传入的数据\"}","lklWebPayCallback");
}

//消费撤销
function LKLCardRevoke() {
  window.LakalaJSWebPaySimple.showPayParamDialog(1);
}

//消费撤销
function DemoLKLCardRevoke(value) {
  var jsonStr = JSON.stringify(value);
  window.LakalaJSWebPay.LKLCardRevoke(jsonStr, "lklWebPayCallback");
  //  window.LakalaJSWebPay.LKLCardRevoke("{\"order_no\":\"12367534\", \"print_info\":\"附加打印数据\",\"return_type\":\"1\",\"adddataword\":\"附加数据\",\"reserve\":\"\"}","lklWebPayCallback");
  //    window.LakalaJSWebPay.LKLCardRevoke("{\"batchbillno\":\"123456123\", \"print_info\":\"附加打印数据\",\"return_type\":\"1\",\"adddataword\":\"附加数据\",\"reserve\":\"\"}","lklWebPayCallback");
}

//扫码撤销
function LKLCodeRevoke() {
  window.LakalaJSWebPaySimple.showPayParamDialog(3);
}

//扫码撤销
function DemoLKLCodeRevoke(value) {
  var jsonStr = JSON.stringify(value);
  window.LakalaJSWebPay.LKLCardRevoke(jsonStr, "lklWebPayCallback");
  //window.LakalaJSWebPay.LKLCodeRevoke("{\"order_no\":\"123456134\", \"print_info\":\"附加打印数据\",\"return_type\":\"1\",\"adddataword\":\"附加数据\",\"reserve\":\"\"}","lklWebPayCallback");
  //    window.LakalaJSWebPay.LKLCodeRevoke("{\"batchbillno\":\"123456123\", \"print_info\":\"附加打印数据\",\"return_type\":\"1\",\"adddataword\":\"附加数据\",\"reserve\":\"\"}","lklWebPayCallback");
}

//刷卡结算
function LKLCardSettle() {
  window.LakalaJSWebPaySimple.showPayParamDialog(5);
}

//刷卡结算
function DemoLKLCardSettle(value) {
  var jsonStr = JSON.stringify(value);
  window.LakalaJSWebPay.LKLCardSettle(jsonStr, "lklWebPayCallback");
  //window.LakalaJSWebPay.LKLCardSettle("{\"return_type\":\"1\",\"adddataword\":\"附加数据\",\"reserve\":\"\"}","lklWebPayCallback");
}

//扫码结算
function LKLCodeSettle() {
  window.LakalaJSWebPaySimple.showPayParamDialog(6);
}

//扫码结算
function DemoLKLCodeSettle(value) {
  var jsonStr = JSON.stringify(value);
  window.LakalaJSWebPay.LKLCodeSettle(jsonStr, "lklWebPayCallback");
  //window.LakalaJSWebPay.LKLCodeSettle("{\"return_type\":\"1\",\"adddataword\":\"附加数据\",\"reserve\":\"\"}","lklWebPayCallback");
}

//扫码补单
function LKLCodeMakeUp() {
  window.LakalaJSWebPaySimple.showPayParamDialog(4);
}

//扫码补单
function DemoLKLCodeMakeUp(value) {
  var jsonStr = JSON.stringify(value);
  window.LakalaJSWebPay.LKLCodeSupple(jsonStr, "lklWebPayCallback");
  //window.LakalaJSWebPay.LKLCodeSupple("{\"print_info\":\"附加打印数据\",\"return_type\":\"1\",\"reserve\":\"\"}","lklWebPayCallback");
}

//刷卡重打印
function LKLCardRePrint() {
  window.LakalaJSWebPaySimple.showPayParamDialog(18);
}

//刷卡重打印
function DemoLKLCardRePrint(value) {
  var jsonStr = JSON.stringify(value);
  window.LakalaJSWebPay.LKLCardReprint(jsonStr, "lklWebPayCallback");
  //window.LakalaJSWebPay.LKLCardRePrint("{\"batchbillno\":\"12345499\", \"print_info\":\"附加打印数据\",\"return_type\":\"1\",\"reserve\":\"\"}","lklWebPayCallback");
  //window.LakalaJSWebPay.LKLCardReprint("{\"order_no\":\"1234567\", \"print_info\":\"附加打印数据\",\"return_type\":\"1\",\"reserve\":\"\"}","lklWebPayCallback");
}

//扫码重打印
function LKLCodeRePrint() {
  window.LakalaJSWebPaySimple.showPayParamDialog(19);
}

//扫码重打印
function DemoLKLCodeRePrint(value) {
  var jsonStr = JSON.stringify(value);
  window.LakalaJSWebPay.LKLCodeReprint(jsonStr, "lklWebPayCallback");
  //window.LakalaJSWebPay.LKLCodeRePrint("{\"batchbillno\":\"12345499\", \"print_info\":\"附加打印数据\",\"return_type\":\"1\",\"reserve\":\"\"}","lklWebPayCallback");
  //window.LakalaJSWebPay.LKLCodeReprint("{\"order_no\":\"12345678\", \"print_info\":\"附加打印数据\",\"return_type\":\"1\",\"reserve\":\"\"}","lklWebPayCallback");
}

//刷卡交易查询
function LKLCardTransQuery() {
  window.LakalaJSWebPaySimple.showPayParamDialog(7);
}

//刷卡交易查询
function DemoLKLCardTransQuery(value) {
  var jsonStr = JSON.stringify(value);
  window.LakalaJSWebPay.LKLCardTransQuery(jsonStr, "lklWebPayCallback");
  //window.LakalaJSWebPay.LKLCardTransQuery("{\"batchbillno\":\"12345499\"}","lklWebPayCallback");
  //window.LakalaJSWebPay.LKLCardTransQuery("{\"order_no\":\"12345499\"}","lklWebPayCallback");
}

//扫码交易查询
function LKLCodeTransQuery() {
  window.LakalaJSWebPaySimple.showPayParamDialog(8);
}

//扫码交易查询
function DemoLKLCodeTransQuery(value) {
  var jsonStr = JSON.stringify(value);
  window.LakalaJSWebPay.LKLCodeTransQuery(jsonStr, "lklWebPayCallback");
  //window.LakalaJSWebPay.LKLCodeTransQuery("{\"batchbillno\":\"12345499\"}","lklWebPayCallback");
  //window.LakalaJSWebPay.LKLCodeTransQuery("{\"order_no\":\"12345499\"}","lklWebPayCallback");
}

//余额查询
function LKLCardQueryMoney() {
  window.LakalaJSWebPay.LKLCardQueryMoney("lklWebPayCallback");
}

//预授权
function LKLPreLicensing() {
  window.LakalaJSWebPaySimple.showPayParamDialog(12);
}

//预授权
function DemoLKLPreLicensing(value) {
  var jsonStr = JSON.stringify(value);
  window.LakalaJSWebPay.LKLPreLicensing(jsonStr, "lklWebPayCallback");
  //window.LakalaJSWebPay.LKLPreLicensing("{\"amt\":\"0.01\", \"order_no\":\"12345634\",\"order_info\":\"订单具体信息\",\"print_info\":\"附加打印数据\",\"return_type\":\"1\",\"adddataword\":\"附加数据\",\"reserve\":\"\"}","lklWebPayCallback");
}

//预授权撤销
function LKLPreLicensingRevoke() {
  window.LakalaJSWebPaySimple.showPayParamDialog(13);
}

//预授权撤销
function DemoLKLPreLicensingRevoke(value) {
  var jsonStr = JSON.stringify(value);
  window.LakalaJSWebPay.LKLPreLicensingRevoke(jsonStr, "lklWebPayCallback");
  //window.LakalaJSWebPay.LKLPreLicensingRevoke("{\"order_no\":\"12345634\", \"print_info\":\"附加打印数据\",\"return_type\":\"1\",\"adddataword\":\"附加数据\",\"reserve\":\"\"}","lklWebPayCallback");
}

//预授权完成
function LKLPreLicensingComplete() {
  window.LakalaJSWebPaySimple.showPayParamDialog(14);
}

//预授权完成
function DemoLKLPreLicensingComplete(value) {
  var jsonStr = JSON.stringify(value);
  window.LakalaJSWebPay.LKLPreLicensingComplete(jsonStr, "lklWebPayCallback");
  //window.LakalaJSWebPay.LKLPreLicensingComplete("{\"order_no\":\"12345634\",\"order_info\":\"订单具体信息\", \"print_info\":\"附加打印数据\",\"return_type\":\"1\",\"adddataword\":\"附加数据\",\"reserve\":\"\"}","lklWebPayCallback");
}

//预授权完成撤销
function LKLPreLicensingCompleteRevoke() {
  window.LakalaJSWebPaySimple.showPayParamDialog(15);
}

//预授权完成撤销
function DemoLKLPreLicensingCompleteRevoke(value) {
  var jsonStr = JSON.stringify(value);
  window.LakalaJSWebPay.LKLPreLicensingCompleteRevoke(jsonStr, "lklWebPayCallback");
  //window.LakalaJSWebPay.LKLPreLicensingCompleteRevoke("{\"batchbillno\":\"12345345\",\"order_info\":\"订单具体信息\", \"print_info\":\"附加打印数据\",\"return_type\":\"1\",\"adddataword\":\"附加数据\",\"reserve\":\"\"}","lklWebPayCallback");
  //window.LakalaJSWebPay.LKLPreLicensingCompleteRevoke("{\"order_no\":\"12345634\",\"order_info\":\"订单具体信息\", \"print_info\":\"附加打印数据\",\"return_type\":\"1\",\"adddataword\":\"附加数据\",\"reserve\":\"\"}","lklWebPayCallback");
}

//退货
function LKLCardReturnOfGoods() {
  window.LakalaJSWebPaySimple.showPayParamDialog(11);
}

//退货
function DemoLKLCardReturnOfGoods(value) {
  var jsonStr = JSON.stringify(value);
  window.LakalaJSWebPay.LKLCardReturnOfGoods(jsonStr, "lklWebPayCallback");
  //window.LakalaJSWebPay.LKLCardReturnOfGoods("{\"refernumber\":\"123454991234\",\"trans_date\":\"0301\",\"amt\":\"0.01\",\"order_no\":\"12345345\",\"order_info\":\"订单具体信息\",\"print_info\":\"附加打印数据\",\"return_type\":\"1\",\"adddataword\":\"附加数据\",\"reserve\":\"\"}","lklWebPayCallback");
}

//主扫退货
function LKLMainCodeReturnOfGoods() {
  window.LakalaJSWebPaySimple.showPayParamDialog(17);
}

//主扫退货
function DemoLKLMainCodeReturnOfGoods(value) {
  var jsonStr = JSON.stringify(value);
  window.LakalaJSWebPay.LKLMainCodeReturnOfGoods(jsonStr, "lklWebPayCallback");
  //window.LakalaJSWebPay.LKLMainCodeReturnOfGoods("{\"refernumber\":\"123454991234\",\"trans_date\":\"0301\",\"amt\":\"0.01\",\"order_no\":\"12345345\",\"order_info\":\"订单具体信息\",\"print_info\":\"附加打印数据\",\"return_type\":\"1\",\"adddataword\":\"附加数据\",\"reserve\":\"\"}","lklWebPayCallback");
}

//被扫退货
function LKLSweptCodeReturnOfGoods() {
  window.LakalaJSWebPaySimple.showPayParamDialog(16);
}

//被扫退货
function DemoLKLSweptCodeReturnOfGoods(value) {
  var jsonStr = JSON.stringify(value);
  window.LakalaJSWebPay.LKLSweptCodeReturnOfGoods(jsonStr, "lklWebPayCallback");
  //window.LakalaJSWebPay.LKLSweptCodeReturnOfGoods("{\"refernumber\":\"123454991234\",\"trans_date\":\"0301\",\"amt\":\"0.01\",\"order_no\":\"12345345\",\"order_info\":\"订单具体信息\",\"print_info\":\"附加打印数据\",\"return_type\":\"1\",\"adddataword\":\"附加数据\",\"reserve\":\"\"}","lklWebPayCallback");
}

//交易成功回调
function lklWebPayCallback(jsonObj) {
  console.log(jsonObj);
}
