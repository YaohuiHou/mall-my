<template>
	<div class="toast">
		<div class="toast-box">
			<p>{{ ToastMsg }}</p>
			<div class="toast-btn">
				<span class="close-btn" @click="isShowToast(0)">取消</span>
				<span class="adopt-btn" @click="isShowToast(1)">确定</span>
			</div>
		</div>
		<i class="toast-curtain"></i>
	</div>
</template>

<script>
import { mallIndex } from '../index.js'
export default {
	props : ['ToastMsg'],
	data () {
	    return {
	    }
	},
	methods : {
		isShowToast : function(n){
			mallIndex.$emit('isShowToast',{
				ShowToast : false,
				changeNum : n
			})
		}
	}
}
</script>