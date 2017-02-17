<template>
<div id="app" v-bind:data-url="url">
	<loading v-show="loaded"></loading>
	<Toast v-show="isShowToast" :Toast="ToastMsg" ></Toast>
	<router-view  :appData="appData"></router-view>
</div>
</template>

<script>
	import { mallIndex } from 'index.js'
	import Loading from 'components/loading'
	import Toast from 'components/toast'
	import axios from 'axios'

	export default {
		name: 'app',
		components: {
			Loading,
			Toast
		},
		data () {
			return {
				loaded : true,
				isShowToast : false,
				ToastMsg : '',
				ajaxList : false,
				pageNum : 1,
				appData : {
					data : []
				},
				refreshPage : false,
				url : '',
				loadThings : false,
				isShowNothing : false
			}
		},
		created (){
			mallIndex.$on('urlDelivery',(text) => {
				this.url = text.url;
				this.loadThings = text.loadSome
			})

			//通过index传递select界面取到的值。
			mallIndex.$on('isShowToast', (text) => {
				this.isShowToast = text.ShowToast;
				this.ToastMsg = text.toastInfo;
				this.pageNum = text.page;
				this.refreshPage = text.Refresh;
			});

			mallIndex.$on('ShowToast', (text) => {
				this.isShowToast = text.ShowToast;
				this.ToastMsg = text.toastInfo;
			});

			mallIndex.$on('notingNews', (text) => {
                this.isShowNothing = text.isShowNothing;
            })

			// 初始化页面
			// 获取用户id
			var userid = document.cookie.match(/AbcfN_userid=([^;$]+)/);
			if(userid && userid[1]){
				try {
					Object.defineProperty(window,'userid',{
						writable:false,
						value:userid[1]
					});	
				} catch(e){}
			};

			
			// if(!window.userid){
			// 	window.location.href = 'http://bbs.360che.com/m/logging.php?action=login';
			// 	return;	
			// };

		},
		mounted:function(){
			this.loaded=false;

			// 滚动加载
			var me = this;
			var page = document.querySelector('.page'),
				app = document.querySelector('#app');
			page.addEventListener('scroll',function(){
				if(app.getBoundingClientRect().bottom <= (window.innerHeight + 100) && !me.ajaxList){
					me.ajaxList = true;
					me.scrollPage(app);
				}
			})
		},
		beforeUpdate:function(){
			if(this.loadThings){
				this.appData.data = [];
				this.pageNum = 1;
				this.scrollPage(this.url);
				this.loadThings = false
			}
		},
		updated:function(){

			if(this.refreshPage){	
				this.appData = {
					data : []
				}
				this.scrollPage(app)
			}
			if(this.isShowNothing){
				this.appData.isShowNothing = true;
				this.appData.showFooter = false;
			}
			
		},
		methods: {
			scrollPage : function(app){
				var me = this,
					o = new FormData();
				// o.append('uid', '1' );
				// o.append('user_name', '1' );
				o.append('page', me.pageNum );

				var ajaxRequest = new XMLHttpRequest();
				ajaxRequest.onreadystatechange = function () {
				    if (ajaxRequest.readyState === XMLHttpRequest.DONE) {
				        if (ajaxRequest.status === 200) {
				        	me.ajaxList = false;
				        	var result = JSON.parse(ajaxRequest.responseText);
				            if(result.status == 1){
				            	var arr = me.appData.data;
			            		result.data.forEach(function(ele,i){
			            			arr.push(ele)
			            		})
			            		me.appData.isShowNothing = false;
			            		me.appData.showFooter = true;

				            	if(result.latest == 0){
				            		me.pageNum += 1;
				            	}else{
				            		me.ajaxList = true;
				            		if(me.appData.data.length <= 0 ){
				            			me.appData.isShowNothing = true;
										me.appData.showFooter = false;
				            		}
				            	}
				            }else{
				            	alert(result.errInfo)
				            }
				        }else{
				        	this.toastMsg('\u7f51\u7edc\u4e0d\u7ed9\u529b\uff0c\u8bf7\u91cd\u8bd5')	// 网络不给力，请重试
				        }
				    }
				};
				ajaxRequest.open('get', this.url +'?uid=1&user_name=12&page=' + me.pageNum);
				ajaxRequest.send();


			},
			toastMsg : function(megText){	// 弹窗
				this.isShowToast = true;
				this.ToastMsg = megText;
			}
		}
	}
</script>

<style lang="less">
	@import "assets/css/layout/reset.less";
	@import "assets/css/layout/layout.less";
</style>
