vux cell/cell-box 点击的时候会数据改变

vux cell/cell-box 展开或者关闭的时候回重新拉取一次数据
 解决方式：  重新渲染数据。

 ```
 changeListData(groupid, userCode, userStatus) {
	console.log('groupid, userCode, userStatus', groupid, userCode, userStatus);
	this.dataList.data.forEach((qq) => {
		if (qq.USERCODE==groupid) {
			for (var i = 0; i < qq.saleList.length; i++) {
				if (qq.saleList[i].USERCODE==userCode) {
					qq.saleList[i].STATUS = userStatus
				}
			}
		}
	})
},

 ```