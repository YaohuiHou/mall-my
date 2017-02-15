<template>
	<header class="title-bars">
	    <!-- <a href="history.back()" class="back">返回</a> -->
	    <router-link tag="div" to="/">
			<a class="back">返回</a>
		</router-link>
	    <h1>{{ titleBar }}</h1>
	    <span v-if="Empty" @click="changeEmpty()">清空</span>
	</header>
</template>

<script>
	import { mallIndex } from '../index.js'
	export default {
		props : ['titleBar','Empty'],
		data () {
		    return {
		    }
		},
		methods : {
			changeEmpty : function(){
				mallIndex.$emit('changeEmpty',{
					ShowToast : true,
					ToastInfo : '\u786e\u5b9a\u5220\u9664\u6240\u6709\u6d88\u606f\u5185\u5bb9~' 	// 确定删除所有消息内容~
				})
			}
		}
	}
</script>

<style lang="less">
	@import "../assets/css/title-bar/bar.less";
</style>