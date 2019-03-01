### iPhoneX适配方案之一

 > APP打包使用工具Hbuilder

 > 配置 `manifest.json` 配置文件

 (一)plus配置: 添加 `statusbar` `launchwebview`

 ```
 "plus": {
	"statusbar": {
	    "immersed": true /*开启沉浸式状态栏*/
	},
	"launchwebview": {
	    "statusbar": {
	        "background": "#51A7FE" /*设置状态栏的颜色，一般是跟头部的颜色一样*/
	    }
	},
}
 ```


 (二) 如果 `apple` 中配置 `UIReserveStatusbarOffset` 需注释
 ```
 "apple": {
	/* "UIReserveStatusbarOffset":false */
},
 ```


 (三) 如果 `google` 中配置 `ImmersedStatusbar` 需注释
 ```
"google": {
	/* "ImmersedStatusbar":true, */
},
 ```