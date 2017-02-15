<template>
	<div class="toast">
		<div class="toast-box">
			<p>{{ Toast }}</p>
			<div class="toast-btn">
				<span class="adopt-btn" @click="isShowToast()">确定</span>
			</div>
		</div>
		<i class="toast-curtain"></i>
	</div>
</template>

<style lang="less">
	@import "../assets/css/toast/toast.less";
</style>

<script>
import { mallIndex } from '../index.js'
export default {
	props : ['Toast'],
	data () {
	    return {
	    }
	},
	methods : {
		isShowToast : function(){
			mallIndex.$emit('isShowToast',{ShowToast : false})
		}
	}
}
</script>