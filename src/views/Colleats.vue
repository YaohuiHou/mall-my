<template>
	<div>
		<TitleBar :titleBar="titleBar" :Empty="Empty"></TitleBar>

		<!-- 内容 -->
		<section>
			<p class="nothing" v-show="appData.isShowNothing">您还没有作何收藏~</p>
			<ul class="my-collect">
			    <li v-for="item in appData.data" v-bind:id="item.id">
			        <figure><img :src="item.imguri"></figure>
			        <h4>{{ item.name }}</h4>
			        <p>{{ item.detail }}</p>
			        <span>商城价：<var>{{ item.price }}</var></span>
			        <em @click="changeCancel($event)">取消收藏</em>
			    </li>
			</ul>
		</section>
		<FooterView v-if="appData.showFooter"></FooterView>
		<ChangeToast v-show="isShowToast" :ToastMsg="ToastMsg"></ChangeToast>
	</div>
</template>

<script>
	import { mallIndex } from '../index.js'
	import TitleBar from '../components/title-bar'
	import FooterView from '../components/app-footer'
	import ChangeToast from '../components/changeToast'
	import axios from 'axios'

	export default {
		components: {
			TitleBar,
			FooterView,
			ChangeToast
		},
		data () {
			return {
				loaded : true,
				isShowToast : false,
				noting : false,
				ToastMsg : '',
				id : '',
				changeItem : '',
				titleBar:"我的收藏",
				Empty : false,
				allList : 'http://test-website-api.mall.com/collect/index'
			}
		},
		props: {
			appData: {
				type: Object
			}
		},
		created (){
			mallIndex.$on('isShowToast', (text) => {
				this.isShowToast = text.ShowToast;
				this.changeItem = text.changeNum;
			});
			if(this.changeItem == 1){
				this.cancel();
			}
			this.urlDelivery();
		},
		updated : function(){   //数据变化执行
			if(this.changeItem == 1){
				this.isShowToast = false
				this.cancel();
			}
		},
		methods : {
			cancel : function(){
				var me = this;
				// 	o = new FormData();
				// o.append('uid', '1' );
				// o.append('user_name', '12' );
				// o.append('id',  me.id);

				var ajaxRequest = new XMLHttpRequest();
				ajaxRequest.onreadystatechange = function () {
				    if (ajaxRequest.readyState === XMLHttpRequest.DONE) {
				        if (ajaxRequest.status === 200) {
				        	var result = JSON.parse(ajaxRequest.responseText);
				            if(result.status == 1){

			            		// 取消收藏后刷新页面
				            	mallIndex.$emit('isShowToast',{
									ShowToast : false,
									page : 1,
									Refresh : true,
                                    toastInfo : result.errInfo
								})

				            }else{
				            	mallIndex.$emit('ShowToast',{
									ShowToast : true,
									toastInfo : result.errInfo
								})
				            }
				        }else{
				        	mallIndex.$emit('ShowToast',{
								ShowToast : true,
								toastInfo : '\u7f51\u7edc\u4e0d\u7ed9\u529b\uff0c\u8bf7\u91cd\u8bd5'  // 网络不给力，请重试
							})
				        }
				    }
				};
				ajaxRequest.open('get', "http://test-website-api.mall.com/collect/delete" +'?uid='+ window.userid +'&user_name=12&id='+me.id);
				ajaxRequest.send();
			},
			changeCancel : function(e){
				var event = e.target;
				var that = this;
				that.id = event.parentElement.id;
				that.toastMsgInfo('\u786e\u8ba4\u53d6\u6d88\u8fd9\u6761\u6536\u85cf\u4fe1\u606f~') 	// 取消收藏提示
			},
			toastMsgInfo : function(msg){
				this.isShowToast = true;
				this.ToastMsg = msg
			},
			urlDelivery : function(){
			    mallIndex.$emit('urlDelivery',{
			        url : this.allList,
			        loadSome : true
			    });
			}
		}
	}
</script>

<style lang="less">
	@import "../assets/css/my-collect/collect.less";
	@import "../assets/css/footer/footer.less";
</style>
