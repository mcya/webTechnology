<template>
	<div id="customer">
		<x-header :left-options="{backText: '', showBack: false}">
			<a slot="left" class="header_Licon" @click="showScree()"><img style="float: right" src="../assets/img/customer/screen_out.png"></a>
			<span slot="default" class="header_tab">
	  				<button-tab v-model="headerTab">
			        	<button-tab-item @on-item-click="clickHeaderTab()">未来访</button-tab-item>
			        	<button-tab-item @on-item-click="clickHeaderTab()">已来访</button-tab-item>
			        	<button-tab-item @on-item-click="clickHeaderTab()">已成交</button-tab-item>
			        	<button-tab-item @on-item-click="clickHeaderTab()">关系人</button-tab-item>
			    	</button-tab>
	  			</span>

			<a slot="right" class="header_Ricon" @click="clickSwitch()"><img style="float: left" src="../assets/img/customer/time_list@1x.png"></a>
		</x-header>
		<section id="container_menu" style="padding-top: 188px; overflow: hidden;">
			<div style="position: fixed; top: 56px; width: 100%;">
				<search ref="search" class="customer_search" @on-submit="onSubmit" :auto-fixed="false" cancel-text="取消" placeholder="请输入姓名或手机号搜索" v-model="parmas.search" @on-blur='onBlur' @on-change='getResult'></search>
				<div>
					<group v-show="dateSearchShow">
						<datetime class="datetimeClass" title="" :placeholder="dateStartName" format="YYYY-MM-DD" v-model="date1" cancel-text="取消" confirm-text="确认" @on-change="onChangeToDate1"></datetime>
						<datetime class="datetimeClass" title="" placeholder='结束' format="YYYY-MM-DD" v-model="date2" cancel-text="取消" confirm-text="确认" @on-change="onChangeToDate2"></datetime>
						<!-- <x-button class="buttonClass" type="primary" @click.native="searchDateRange()">搜索</x-button> -->
						<icon class="buttonClass" @click.native="searchDateRange()" type="search"></icon>
					</group>
				</div>
				<div class="nav_menu" :class="{'isShow':isShow}" style="padding: 0 0;">
					<button-tab v-model="bTab">
						<button-tab-item @on-item-click="clickNavTab('0')">A客</button-tab-item>
						<button-tab-item @on-item-click="clickNavTab('1')">B客</button-tab-item>
						<button-tab-item @on-item-click="clickNavTab('2')">C客</button-tab-item>
						<button-tab-item @on-item-click="clickNavTab('3')">意向待定</button-tab-item>
					</button-tab>
				</div>
			</div>
			<scroller lock-x scrollbar-y :height="scrollHeigh"
				ref="scroller" use-pullup :pullup-config="pullupConfig"
				@on-pullup-loading="loadingData" use-pulldown :pulldown-config="pulldownConfig"
				@on-pulldown-loading="updateData" style="padding-right: 28px;">

				<div v-if="enptyPage" id="emptyPage"></div>
				<div ref="scrolist" v-else-if="!enptyPage">
					<div class="mint_ui" v-for="(gitem,$index) in groupClientList" v-if="!switchOpen">
						<!-- <div class="mint-indexsection-index">
							<a :id="gitem.letter">{{gitem.letter}}</a>
						</div> -->
						<div v-for="item in gitem.clientlist" class="list_item" @click="inRouter('/customer/customerDetails',item)">
							<span class="iconRight fr">
								<img @click="showPlugin(item)" src="../assets/img/customer/c_phone.png">
								<img @click='sendMsg(item)' style="padding-left: 1rem;" src="../assets/img/customer/c_email@2x.png">
							</span>
							<div class="cont_middle c_base">
								<span class="redPjianClass" v-if="item.isqmyx==1">荐</span>
								<span class="sredPjianClass" v-if="item.ishotl==1">hot</span>
								<span class="redPjianClass" v-if="item.isqmyx==2" style="border-color:#eeeeee;background-color: #eeeeee;color:#000000;">荐</span>
								{{item.name}}
								<!-- <img v-if="item.sex=='0'" style="padding-left: 1rem;" src="../assets/img/customer/girl.png">
								<img v-if="item.sex=='1'" style="padding-left: 1rem;" src="../assets/img/customer/man.png">
								<img v-if='parmas.intentType=="A"' style="padding-left: 1rem;" src="../assets/img/customer/A.png">
								<img v-if='parmas.intentType=="B"' style="padding-left: 1rem;" src="../assets/img/customer/B.png">
								<img v-if='parmas.intentType=="C"' style="padding-left: 1rem;" src="../assets/img/customer/C.png"> -->
								<!-- <p @click.stop="inRouter('/purchase',item)" v-if="headerTab==2">已购房间</p> -->
								<p @click.stop="inRouter('/purchase',item)" v-if="headerTab==2">已购房间</p>
								<p v-if="(item.isqmyx==1 || item.isqmyx==2) && headerTab==2" class="tuijianClass">推荐人: {{item.qmyxname}}</p>
								<p v-if="(item.isqmyx==1 || item.isqmyx==2) && headerTab!=2" class="tuijianClassp">推荐人: {{item.qmyxname}}</p>
							</div>
							<!-- <div v-if="item.isqmyx==1 || item.isqmyx==2" class="jianDivClass">
								<p v-if="item.isqmyx==1" class="jianClass" style="border-color:#f12121;">荐</p>
								<p v-if="item.isqmyx==2" class="jianClass" style="border-color:#51a7fe;">荐</p>
								<p class="tuijianClass">推荐人: {{item.qmyxname}}</p>
							</div> -->
							<!-- <div class="bottomTime fz12 c_9a">{{item.createTime}}</div> -->
						</div>
					</div>
					<div class="mint_ui time_ul" v-if="switchOpen">
						<div v-for="item in List" class="list_item" @click="inRouter('/customer/customerDetails',item)">
							<span class="iconRight fr">
									<img @click="showPlugin(item)" src="../assets/img/customer/c_phone.png">
									<img @click='sendMsg(item)' style="padding-left: 1rem;" src="../assets/img/customer/c_email@2x.png">
								</span>
							<div class="cont_middle c_base">
								<span class="redPjianClass" v-if="item.isqmyx==1">荐</span>
								<span class="sredPjianClass" v-if="item.ishotl==1">hot</span>
								<span class="redPjianClass" v-if="item.isqmyx==2" style="border-color:#eeeeee;background-color: #eeeeee;color:#000000;">荐</span>
								{{item.name}}
								<!-- <img v-if="item.sex=='0'" style="padding-left: 1rem;" src="../assets/img/customer/girl.png">
								<img v-if="item.sex=='1'" style="padding-left: 1rem;" src="../assets/img/customer/man.png">
								<img v-if='parmas.intentType=="A"' style="padding-left: 1rem;" src="../assets/img/customer/A.png">
								<img v-if='parmas.intentType=="B"' style="padding-left: 1rem;" src="../assets/img/customer/B.png">
								<img v-if='parmas.intentType=="C"' style="padding-left: 1rem;" src="../assets/img/customer/C.png"> -->
								<p @click.stop="inRouter('/purchase',item)" v-if="headerTab==2">已购房间</p>
								<p v-if="(item.isqmyx==1 || item.isqmyx==2) && headerTab==2" class="tuijianClass">推荐人: {{item.qmyxname}}</p>
								<p v-if="(item.isqmyx==1 || item.isqmyx==2) && headerTab!=2" class="tuijianClassp">推荐人: {{item.qmyxname}}</p>
							</div>
							<div class="bottomTime fz12 c_9a">{{item.createTime}}</div>
						</div>
					</div>
				</div>
			</scroller>
			<!-- <aside class="letter-aside" v-if="!switchOpen">
				<ul>
					<li v-for="(gitem,$index) in groupClientList" @click="naver(gitem.letter)">{{gitem.letter}} </li>
				</ul>
			</aside> -->
		</section>
		<witnav></witnav>
		<add></add>
		<div v-if="!isShow" class="xuanfu" id="div2"
			@mousedown="down" @touchstart="down"
			@mousemove="move" @touchmove="move"
			@mouseup="end" @touchend="end"
		>
			<div class="yuanqiu">
				{{pageInfo.totalPage}}
			</div>
		</div>
		<screenCustomer ref="scu" v-show="isShow" @submit="filter" @hiddeme="isShow=false"></screenCustomer>
	</div>
</template>
<script>
	import { compareBodyHeight } from '../components/util.js';
	import { XButton, Datetime, XHeader, ButtonTab, ButtonTabItem, Icon, Search, Group, Cell, Scroller, Confirm, TransferDomDirective as TransferDom, LoadMore, Tab, TabItem } from 'vux';
	import witnav from '../components/wit-nav';
	import add from '../components/mask';
	import screenCustomer from '../page/customer/screenCustomer.vue';
	export default {
		directives: {
			TransferDom
		},
		components: {
			XButton,
			Datetime,
			witnav,
			XHeader,
			Icon,
			ButtonTab,
			ButtonTabItem,
			Search,
			Group,
			Cell,
			Scroller,
			Confirm,
			add,
			LoadMore,
			Tab,
			TabItem,
			screenCustomer
		},
		data() {
			return {
				flag: false,
				cur: {
					x: 0,
					y: 0
				},
				nx: '',ny: '',dx: '',dy: '',x: '',y: '',
				pageInfo: {
					totalPage: '',
				},
				heightM:'',
				mintHeight: window.screen.height - 240, //屏幕高度-固定元素高度
				headerTab: 0, //0未来访、1已来访、2已成交
				enptyPage: false, //判断是否为空
				seatchKey: '', //搜索关键字
				switchOpen: false,
				scrollHeigh: '-196',
				upBol: true,
				date1: '',
				date2: '',
				dateStartName: '拓客起始',
				dateSearchShow: true,
				dateStartValue: '',
				dateEndValue: '',
				pullupConfig: {
					content: '',
					downContent: '松开加载数据',
					upContent: '',
					loadingContent: '加载中...'
				},
				pulldownConfig: {
					content: '',
					downContent: '松开刷新数据',
					upContent: '',
					loadingContent: '刷新中...'
				},
				clientList: [],
				parmas: {
					userCode: this.$store.state.core.loginInfo.userCode,
					projId: this.$store.state.core.loginFormInfo.projId,
					cliType: '3', //客户类型
					workArea: '',
					liveArea: '',
					budget: '',
					knowWay: '',
					area: '',
					payWay: '',
					purchaseTimes: '',
					purchasePurp: '',
					clientSource: '',
					visitTimes: '',
					currentPage: 1,
					intentType: '',
					search: '',
					singlePrice: '',
					pageSize: 10,
				},
				//按首字母分组
				letter: [],
				groupClientList: [],
				isShow: false,
				selectType: '9',
				bTab: 9,
				List: []
			}
		},
		watch: {
			headerTab(curval, oldVal) {
				if(curval == 0) {
					this.parmas.cliType = '3';
				} else if(curval == 1) {
					this.parmas.cliType = '4';
				} else if(curval == 2) {
					this.parmas.cliType = '5';
				} else if(curval == 3) {
					this.parmas.cliType = '7';
				}
				this.clientList = [];
				this.List = [];
				this.parmas.currentPage = 1;
				this.getClientList('paramsToSearch');
			}
		},
		computed: {},
		mounted() {
			var _this = this;
			_this.getClientList('paramsToSearch');
			this.heightM = document.body.scrollHeight;
		},
		methods: {
      // 实现移动端拖拽
			down(){
        this.flag = true;
        var touch ;
        if(event.touches){
            touch = event.touches[0];
        }else {
            touch = event;
        }
        this.cur.x = touch.clientX;
        this.cur.y = touch.clientY;
        this.dx = div2.offsetLeft;
        this.dy = div2.offsetTop;
    },
    move(){
        if(this.flag){
            var touch ;
            if(event.touches){
                touch = event.touches[0];
            }else {
                touch = event;
            }
            this.nx = touch.clientX - this.cur.x;
            this.ny = touch.clientY - this.cur.y;
            this.x = this.dx+this.nx;
            this.y = this.dy+this.ny;
            div2.style.left = this.x+"px";
            div2.style.top = this.y +"px";
            //阻止页面的滑动默认事件
            document.addEventListener("touchmove",function(){
                event.preventDefault();
            },false);
        }
    },
    //鼠标释放时候的函数
    end(){
        this.flag = false;
    },
      // ----end
			onChangeToDate1(val) {
				this.dateStartValue=val
				console.log('val1', val);
			},
			onChangeToDate2(val) {
				this.dateEndValue=val
				console.log('val2', val);
			},
			searchDateRange() {
				if (this.dateStartValue=='' || this.dateStartValue==null) {
					this.$vux.toast.show({
						text: '请选择'+this.dateStartName+'',
						type: 'text',
						width: '200px'
					})
					return;
				}
				if (this.dateEndValue=='' || this.dateEndValue==null) {
					this.$vux.toast.show({
						text: '请选择结束时间',
						type: 'text',
						width: '200px'
					})
					return;
				}
				// this.parmas
				// 未来访，传 createTimeBgn和createTimeEnd
				// 已来访，传 custVisitTimeBgn 和 custVisitTimeEnd
				// 已成交，传 custDealTimeBgn  和 custDealTimeEnd
				let paramsToSearch = {}
				if (this.headerTab==0) {
					paramsToSearch = {
						createTimeBgn: this.dateStartValue,
						createTimeEnd: this.dateEndValue,
					}
				}
				if (this.headerTab==1) {
					paramsToSearch = {
						custVisitTimeBgn: this.dateStartValue,
						custVisitTimeEnd: this.dateEndValue,
					}
				}
				if (this.headerTab==2) {
					paramsToSearch = {
						custDealTimeBgn: this.dateStartValue,
						custDealTimeEnd: this.dateEndValue,
					}
				}
				this.getClientList(paramsToSearch)
			},
			onBlur() {
				console.log('测试测试测试')
				this.$nextTick(() => {
					this.$refs.scroller.reset({
						top: 0
					});
					this.$refs.scroller.donePullup();
				})

			},
			showScree() {
				this.isShow = true;
			},
			//更新数据
			updateData() {
				this.List = []
				this.parmas.currentPage = 1
				setTimeout(() => {
					this.getClientList('paramsToSearch');
					this.$vux.toast.show({
						text: '已刷新~',
						type: 'text',
						width: '200px'
					});
					this.$refs.scroller.donePulldown();
					this.$refs.scroller.reset({
						top: 0
					});
				}, 1000);
				this.upBol = true
			},
			loadingData() {
				if(this.upBol) {
					this.parmas.currentPage++;
					this.getClientList('paramsToSearch');
				} else {
					this.$vux.toast.show({
						text: '暂无更多数据',
						type: 'text',
						width: '200px'
					});
					this.$refs.scroller.donePullup();
				}
			},
			loadMore() {
				if(this.upBol) {
					this.parmas.currentPage++;
					this.getClientList('paramsToSearch');
				} else {
					this.$vux.toast.show({
						text: '暂无更多数据',
						type: 'text',
						width: '200px'
					});
					this.$refs.scroller.donePullup();
				}
			},
			buildLetter(list) { // 构建字母项
				this.letter = []
				let obj = {}
				obj.letter = "#";
				obj.clientlist = [];
				this.letter.push(obj);
				for(let i = 0; i < list.length; i++) {
					let obj = {}
					obj.letter = i;
					obj.clientlist = [];
					this.letter.push(obj);
				}
			},
			getFirstLetter(str) { //  得到用户名称第一个字的首字母
				var s = "#";
				var tem = pinyinUtil.getFirstLetter(str);
				if(tem) {
					s = tem.slice(0).toUpperCase();
				}
				return s
			},
			buildItem(list) { // 构建分组列表
				this.buildLetter(list)
				console.log('list f1', list);
				let _this = this
				// var indexArr = []
				// var objs = { clientlist: [], indxsp: ''}
				// for (var i = 0; i < list.length; i++) {
				// 	objs.indxsp = i
				// 	objs.clientlist = []
				// 	indexArr.push(objs)
				// }
				// console.log('indexArr1 f1', indexArr);
				// for(let i = 0; i < list.length; i++) {
				// 	console.log('indexArr[i] f2 f1',i, indexArr[i], list[i], indexArr[i].clientlist);
				// 	indexArr[i].clientlist.push(list[i])
				// 	console.log('indexArr[i] f2 f1 s',i, indexArr[i], list[i], indexArr[i].clientlist);
				// }
				// for (var i = 0; i < indexArr.length; i++) {
				// 	var a = indexArr[i].clientlist[0]
				// 	indexArr[i].clientlist = a
				// }
				// console.log('indexArr2 f1', indexArr);
				// for(let i = 0; i < 27; i++) {
				for(let i = 0; i < list.length; i++) {
					_this.letter[i].clientlist = []
				}
				// if (list && list.length) {
				for(let i = 0; i < list.length; i++) {
					// let _index = Number(_this.getFirstLetter(list[i].name).charCodeAt() - 65) + 1
					// if(_index >= 1 && _index < 27) {
					// 	console.log('data01', _index,list[i]);
					// 	_this.letter[_index].clientlist.push(list[i])
					// } else {
					// 	console.log('data02', _index,list[i]);
					// 	_this.letter[0].clientlist.push(list[i])
					// }
					_this.letter[i].clientlist.push(list[i])
				}
				// }
				// 如果letter中list中没有值的话，过滤这一项
				// console.log('this.letter f1', this.letter, _this.groupClientList);
				// this.groupClientList = this.letter
				// _this.groupClientList = list
				// _this.groupClientList = indexArr
				_this.groupClientList = _this.letter.filter(function(value) {
					let len = value.clientlist.length
					return len > 0
				})
				console.log('this.groupClientList f1', this.groupClientList);
			},
			naver(id) { // 点击右边字母滚动
				this.$vux.toast.show({
					text: id,
					position: 'middle',
					time: 500,
					type: 'text',
				});
				this.tipString = id
				let obj = document.getElementById(id);
				let oPos = obj.offsetTop; //滚动定位
				let pa = document.documentElement.clientHeight - 162; //屏幕高度
				let sh = document.getElementsByClassName('xs-container')[0].scrollHeight; //滚动条高度
				if(oPos > (sh - pa)) {
					if(sh - pa >= 0) {
						this.$refs.scroller.reset({
							top: sh - pa
						});
					}
				} else {
					this.$refs.scroller.reset({
						top: oPos
					});
				}

			},
			filter(p) {
				this.isShow = false;
				console.log("p", p);
				for(var key in p) {
					this.parmas[key] = p[key]
				}
				this.parmas.currentPage = 1;
				this.clientlist = [];
				this.List = [];
				this.upBol = true
				console.log('parmas',this.parmas)
				this.getClientList('paramsToSearch');
			},
			getClientList(paramsToSearch) {
				var obj = this.parmas;
				if (typeof paramsToSearch == 'object') {
					obj = {
						...paramsToSearch,
						...this.parmas,
					}
					console.log('obj', obj);
				}
				if (paramsToSearch=='paramsToSearchType') {
					obj = {
						type: '120',
						...this.parmas,
					}
				}
				console.log('this.date1 && this.date2', this.date1, this.date2, this.dateEndValue, this.dateStartValue);
				if (this.dateStartValue && this.dateEndValue) {
          // 如果时间的搜索条件存在的时候
					if (this.headerTab==0) {
						obj.createTimeBgn = this.dateStartValue;
						obj.createTimeEnd = this.dateEndValue;
					}
					if (this.headerTab==1) {
						obj.createTimeBgn = this.dateStartValue;
						obj.createTimeEnd = this.dateEndValue;
					}
					if (this.headerTab==2) {
						obj.createTimeBgn = this.dateStartValue;
						obj.createTimeEnd = this.dateEndValue;
					}
				}
				this.$http.post(this.HOST + '/client/clientList.do', obj).then((response) => {
					console.log(response)
					if(response.data.success == true) {
						this.pageInfo = response.data.page;
						if(this.switchOpen) {
							if(response.data.data && response.data.data.length != 0) {
								//this.clientList = this.clientList.concat(response.data.data);
								//this.buildItem(this.clientList)
								this.List = this.List.concat(response.data.data);
								if(response.data.data.length < 10) {
									this.upBol = false
								} else {
									this.upBol = true
								}

								if(this.parmas.currentPage == 1) {
									this.List = [];
									this.List = response.data.data;
								} else {
									if(response.data.data.length != 0) {
										this.List = this.List.concat(response.data.data);
									}
								}
								let dateList = this.List;
								console.log(dateList)
								let time = this.List[0].createTime;

								function tranTime(time) {
									var newtime = time.split(' ');
									var newtime = time.split(' ');
									var dateTime = newtime[0].split("-");
									var hmsTime = newtime[1].split(":");
									var allNewDate = new Date(dateTime[0], dateTime[1], dateTime[2], hmsTime[0], hmsTime[1]);
									allNewDate = allNewDate.getTime();
									return allNewDate;
								}

								dateList.sort(function(a, b) {
									return tranTime(b.createTime) - tranTime(a.createTime)
								});
								this.enptyPage = false;
							} else {
								this.enptyPage = true;
							}
							if(this.parmas.currentPage == 1) {
								this.$nextTick(() => {
									this.$refs.scroller.reset({
										top: 0
									});
									this.$refs.scroller.donePullup();
								})
							} else {
								this.$nextTick(() => {
									this.$refs.scroller.reset({
										bottom: 0
									});
									this.$refs.scroller.donePullup();
								})
							}
						} else {
							if(response.data && response.data.data) {
								if(response.data.data.length > 0) {
									if(response.data.data.length < 10) {
										this.upBol = false;
									} else {
										this.upBol = true;
									}
								} else {
									this.upBol = false;
								}

							} else {
								this.upBol = false;
								this.enptyPage = true;
							}
							if(response.data && response.data.data && this.parmas.currentPage == 1) {
								this.clientList = [];
								this.clientList = response.data.data;
								this.buildItem(this.clientList);
							} else {
								if(response.data && response.data.data && response.data.data.length != 0) {
									this.clientList = this.clientList.concat(response.data.data);
									this.buildItem(this.clientList);
								}
							}
							if(this.parmas.currentPage == 1) {
								this.$nextTick(() => {
									this.$refs.scroller.reset({
										top: 0
									});
									this.$refs.scroller.donePullup();
								})
							} else {
								this.$nextTick(() => {
									this.$refs.scroller.reset({
										bottom: 0
									});
									this.$refs.scroller.donePullup();
								})
							}
						}
					} else {

					}
				}, function(response) {
					// 响应错误回调
					console.log("请求数据失败:" + response.data);
				});
			},

			//搜索结果
			getResult() {
				this.parmas.currentPage = 1
				this.getClientList('paramsToSearch');
			},
			loadMore() {
				if(this.upBol) {
					this.parmas.currentPage += 1;
					this.getList();
				} else {
					this.$vux.toast.show({
						text: '暂无更多数据',
						type: 'text',
						width: '200px'
					})
					this.$refs.scroller01.donePullup();
				}
			},

			inRouter(url, obj) {
				console.log('obj',obj)
				var vm = this;

				var time = compareBodyHeight(this.heightM)

				 setTimeout(function() {
					vm.$router.push({
						path: url,
						query: {
							isqmyx: obj.isqmyx,
							clientId: obj.clientId,
							headerTabS:vm.headerTab, // 传tab值过去

						}
					});
				}, time)
			},
			goto(url) {
				this.$router.push(url)
			},
			clickSwitch() {
				// this.switchOpen = !this.switchOpen;
				this.List = [];
				this.parmas.currentPage = 1;
				this.getClientList('paramsToSearchType');
			},

			clickHeaderTab() {
				console.log('headerTab', this.headerTab, this.groupClientList);
				if (this.headerTab==0) {
					this.date1 = '';
					this.date2 = '';
					this.dateStartValue = '';
					this.dateEndValue = '';
					this.dateStartName='拓客起始';
					this.dateSearchShow=true
					$(".letter-aside").css("top", '19rem')
					$("#container_menu").css("paddingTop", '188px')
					return;
				}
				if (this.headerTab==1) {
					this.date1 = '';
					this.date2 = '';
					this.dateStartValue = '';
					this.dateEndValue = '';
					this.dateStartName='来访起始'
					this.dateSearchShow=true
					$(".letter-aside").css("top", '19rem')
					$("#container_menu").css("paddingTop", '188px')
					return;
				}
				if (this.headerTab==2) {
					this.date1 = '';
					this.date2 = '';
					this.dateStartValue = '';
					this.dateEndValue = '';
					this.dateStartName='成交起始'
					this.dateSearchShow=true
					$(".letter-aside").css("top", '19rem')
					$("#container_menu").css("paddingTop", '188px')
					return;
				}
				if (this.headerTab==3) {
					this.date1 = '';
					this.date2 = '';
					this.dateStartValue = '';
					this.dateEndValue = '';
					this.dateSearchShow=false
					$(".letter-aside").css("top", '15rem')
					$("#container_menu").css("paddingTop", '142px')
					return;
				}
			},
			clickNavTab(curVal) {

				if(this.selectType == curVal) {
					curVal = 9;
					this.bTab = 9
				}
				this.selectType = curVal
				if(curVal == 0) {
					this.parmas.intentType = 'A';
				} else if(curVal == 1) {
					this.parmas.intentType = 'B';
				} else if(curVal == 2) {
					this.parmas.intentType = 'C';
				} else if(curVal == 3) {
					this.parmas.intentType = 'D';
				} else {
					this.parmas.intentType = '';
				}
				this.parmas.currentPage = 1;
				this.clientlist = [];
				this.List = [];
				this.upBol = true
				this.getClientList('paramsToSearch');
			},
			onSubmit(val) {
				this.$refs.search.setBlur();
			},
			toFeedback(_url, obj, type) {
				let vm = this;
				setTimeout(function() {
					vm.$router.push({
						path: _url,
						query: {
							clientId: obj.clientId,
							phone: obj.phone,
							type: type
						}
					});
				}, 100)
			},
			sendMsg(obj) {
				let vm = this
				//				setTimeout(function() {
				//					vm.toFeedback('/remind/followUp_feedback', obj, 'msg')
				//				}, 300)
				//				PL.dialsms(obj.phone, '')
				var msg = plus.messaging.createMessage(plus.messaging.TYPE_SMS);
				msg.to = [obj.phone];
				msg.body = ' '
				plus.messaging.sendMessage(msg, function() {
					vm.$vux.toast.show({
						text: '发送短信成功!',
						type: 'text',
						width: '200px'
					})
					vm.toFeedback('../remind/followUp_feedback', obj, 'msg')
				}, function(error) {
					vm.$vux.toast.show({
						text: '发送短信失败!',
						type: 'text',
						width: '200px'
					})
				});
			},
			ygfj($event) {
				return false;
			},
			showPlugin(obj) {
				let vm = this;
				this.$vux.confirm.show({
					title: '',
					content: obj.phone,
					cancelText: '取消',
					confirmText: '呼叫',
					onConfirm() {
						setTimeout(function() {
							vm.toFeedback('/remind/followUp_feedback', obj, "phone")
						}, 300)
						PL.dialPhone(obj.phone + '')
					}
				})
			}
		}
	}

</script>

<style lang="less" scope>
	/* 头部 */
	/*.vux-header{
		height: 56px;
	}*/

	#customer .header_Ricon {
		margin-top: 17px;
	}

	#customer .vux-header {
		height: 56px;
		padding: 13px 0 3px;
	}

	#customer .vux-header-left {
		margin-top: 15px;
	}

	#customer .vux-header .vux-header-left a,
	#customer .vux-header .vux-header-right a {
		color: #fff;
	}

	#customer .list_item .cont_middle {
		font-size: 12px;
	}

	#customer .vux-header .vux-header-title {
		font-size: 1.4rem;
		margin: 0;
	}

	#customer .vux-header .vux-header-right,
	#customer .vux-header .vux-header-left {
		width: 4.2rem;
	}

	#customer .vux-header .vux-header-left a {
		float: right;
	}
	/* 未来访、已来访、已成交 */

	.header_tab .vux-button-group>a {
		background: #51a7fe;
		color: #fff;
		padding: 0 0.6rem;
		border: 1px solid #fff;
	}

	.header_tab .vux-button-group>a:nth-child(2) {
		border: none;
		border-top: 1px solid #fff;
		border-bottom: 1px solid #fff;
		border-right: 1px solid #fff;
	}

	.header_tab .vux-button-group>a.vux-button-tab-item-first {
		border-top-left-radius: 4px;
		border-bottom-left-radius: 4px;
	}

	.header_tab .vux-button-group>a.vux-button-tab-item-last {
		border-top-right-radius: 4px;
		border-bottom-right-radius: 4px;
	}

	.header_tab .vux-button-group>a.vux-button-group-current {
		background: #fff;
		color: #384248;
	}

	.header_tab .vux-button-group>a.vux-button-tab-item-first:after,
	.header_tab .vux-button-group>a.vux-button-tab-item-middle:after,
	.header_tab .vux-button-group>a.vux-button-tab-item-last:after {
		border: none;
	}
	/* 搜索框 */

	.customer_search .weui-search-bar__label {
		padding-left: 50px;
		line-height: 26px;
	}

	.customer_search .weui-search-bar,
	.customer_search .weui-search-bar__form {
		background-color: #f8f8f8;
	}

	.customer_search .weui-search-bar__cancel-btn {
		color: #333;
		font-size: 1.4rem;
	}
	/* nav_menu A、B、C */

	.nav_menu {
		background-color: #e8e8e8;
	}

	.nav_menu .vux-button-group>a {
		background: #fff;
		color: #384248;
		padding: 6px;
		border: 1px solid #e8e8e8;
	}

	.nav_menu .vux-button-group>a:nth-child(1) {
		border-left: none;
	}

	.nav_menu .vux-button-group>a:nth-child(2) {
		border: none;
		border-top: 1px solid #e8e8e8;
		border-bottom: 1px solid #e8e8e8;
	}

	.nav_menu .vux-button-group>a:nth-child(3) {
		border-right: none;
	}

	.nav_menu .vux-button-group>a.vux-button-tab-item-first,
	.nav_menu .vux-button-group>a.vux-button-tab-item-last {
		border-radius: 0;
	}

	.isShow .vux-button-group>a.vux-button-group-current {
		color: #384248!important
	}

	.nav_menu .vux-button-group>a.vux-button-group-current {
		background: #fff;
		color: #659ed2;
	}

	.nav_menu .vux-button-group>a.vux-button-tab-item-first:after,
	.nav_menu .vux-button-group>a.vux-button-tab-item-middle:after,
	.nav_menu .vux-button-group>a.vux-button-tab-item-last:after {
		border: none;
	}
	/* 列表 */

	.concrete_content {
		position: relative;
	}

	.cs_Ricon {
		position: absolute;
		right: 1.5rem;
		top: 1rem;
		line-height: 2.4rem;
	}

	.item_group .weui-cell:before {
		border: none;
	}

	.item_group .weui-cells:after {
		border-bottom: 2px solid #D9D9D9;
	}
	/* 右边导航 */

	.right_bar {
		position: fixed;
		right: 0;
		top: 50%;
	}

	.right_bar>li {
		padding: 0.3rem 0.4rem;
		color: #0078ff;
	}
	/* 弹框样式 */

	.weui-dialog {
		border-radius: 20px;
	}

	.weui-dialog__bd:first-child {
		padding: 2em 20px 0.3rem;
	}
	/* Mint UI */

	.mint_ui .list_item {
		line-height: 26px;
		border-bottom: 1px solid #e8e8e8;
		position: relative;
	}

	.mint_ui .list_item .iconRight {
		/*padding-right: 2rem;*/
		display: inline-block;
		position: absolute;
		right: 0;
		top: 1rem;
	}
	.jianDivClass{
		position: absolute;
    top: 0;
    left: 10rem;
    width: 8rem;
		text-align: center;
	}
	.jianClass {
		border: 1px solid #f12121;
    width: 1.8rem;
    border-radius: 100%;
    height: 1.8rem;
    line-height: 1.8rem;
		margin: auto;
	}
	.cont_middle .tuijianClass {
		width: auto;
		margin-left: 71px;
		padding: 0 2px;
		display: inline-block;
		overflow: hidden;
	    text-overflow: ellipsis;
	    white-space: nowrap;
	    text-align: left;
	}

	.cont_middle .tuijianClassp {
		width: auto;
		// margin-left: 71px;
		display: inline-block;
		padding: 0 2px;
		overflow: hidden;
	    text-overflow: ellipsis;
	    white-space: nowrap;
	    text-align: left;
	}

	.mint_ui .list_item .bottomTime {
		position: absolute;
		right: 0;
		bottom: 0;
		display: inline-block;
		text-align: right;
		/*padding-right: 2rem;*/
	}

	.mint-indexlist-content {
		padding-bottom: 1rem;
	}

	.mint-indexsection {
		font-size: 1.4rem;
	}

	.mint-indexsection-index {
		padding: 2px 10px;
	}

	.mint-indexlist-nav {
		border-left: none;
		color: #0078ff;
	}

	#customer {
		overflow: hidden;
		.vux-header-right {
			right: -10px;
		}
		.vux-header-left {
			left: -10px;
		}
		.vux-header-right button {
			margin-left: 40px;
		}
		.vux-tab .vux-tab-item.vux-tab-selected {
			color: #0078ff;
			border-bottom: 3px solid #0078ff;
		}
		.vux-tab-bar-inner {
			background-color: #0078ff;
		}
		.letter-aside {
			text-align: center;
			position: fixed;
			right: 8px;
			top: 19rem;
			ul {
				list-style: none;
				line-height: 1.5em;
				font-size: 14px;
				color: #aaa;
			}
		}
		.letter-aside ul {
			color: #0078ff!important;
		}
		.mint-indexsection-index {
			font-size: 1.4rem;
		}
	}

	#customer .weui-search-bar__label .weui-icon-search {
		margin-right: 0px;
		margin-left: -170px;
	}

	#customer .mint-indexsection-index {
		background-color: #f8f8f8;
	}

	.cont_middle p {
		width: 55px;
		height: 22px;
		text-align: center;
		line-height: 22px;
		text-indent: 0;
		margin-left: 13px;
		font-size: 12px;
		background-color: #eee;
		color: #5d97d0;
    position: absolute;
    top: 2.6rem;
    left: 0px;
	}

	#customer .list_item .cont_middle {
		font-size: 14px;
		text-indent: 1em;
		margin-top: 2px;
	}

	.mint_ui .list_item {
		height: 60px;
	}

	.iconRight img {
		width: 28px;
		height: 28px;
	}

	.time_ul .list_item .iconRight {
		top: .2rem;
	}

	#customer .vux-header-title {
		padding-top: 3px;
	}
	.datetimeClass{
		width: 30%;
		float: left;
		display: inline-block;
	}
	.buttonClass{
		font-size: 24px!important;
    margin: auto;
    margin-top: 0.75rem;
		float: right;
    margin-right: 1.2rem;
	}
	.redPjianClass {
		border-color: rgb(241, 33, 33);
    display: inline-block;
    width: 1.8rem;
    height: 1.8rem;
    border: 1px solid rgb(241, 33, 33);
    border-radius: 100%;
    text-indent: 0.2rem;
    line-height: 1.8rem;
    background-color: rgb(241, 33, 33);
    color: #fff;
	}
	.sredPjianClass {
		border-color: rgb(241, 33, 33);
    display: inline-block;
    width: 1.8rem;
    height: 1.75rem;
    border: 1px solid rgb(241, 33, 33);
    border-radius: 100%;
    text-indent: 1px;
    line-height: 1.75rem;
    background-color: rgb(241, 33, 33);
    color: #fff;
		font-size: 12px;
	}
	.xuanfu {
		height: 4.5rem;
    width: 4.5rem;
		z-index: 990;
		position: fixed;
		top: 4.2rem;
    right: 3.2rem;
		border-radius: 0.8rem;
		background-color: rgba(0, 0, 0, 0.55);
	}
	.yuanqiu {
		height: 2.7rem;
    width: 2.7rem;
    border: 0.3rem solid rgba(140, 136, 136, 0.5);
    margin: 0.65rem auto;
    color: #000000;
    font-size: 1.6rem;
    line-height: 2.7rem;
    text-align: center;
    border-radius: 100%;
    background-color: #ffffff;
	}
</style>
