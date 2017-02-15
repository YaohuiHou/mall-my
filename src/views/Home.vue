<template>
	<div>
		<TitleBar></TitleBar>
		<Region v-show="isShowRegion"></Region>
		<figure class="recommend">
			<img src="http://temp.im/750x300" >
		</figure>
		<Filters></Filters>
		<section id="roll" class="roll">
            <p style="display: none;">不好意思，当前条件下没有您想要的车~</p> 
            <ul class="list-page">
                <li>
                	<a href="#">
	                	<figure>
	                		<img src="http://temp.im/300x200">
	                	</figure> 
	                	<p>一汽解放 j6p牵引车有的车型名称相对较长</p> 
	                	<div class="price">
	                		<span>11.53万元</span> 
	                		<i>2.20万元</i>
	                	</div>
                	</a>
                </li>
            </ul>
        </section>
		<!-- list加载中 -->
		<ScrollLoad v-show="isShowLoad"></ScrollLoad>

		<!-- 弹窗 -->
		<Toast :Toast="ToastMsg" v-show="toastShow"></Toast>

		<!-- 置顶 -->
		<a href="#gotop" class="go-top">置顶</a>
		<FooterView></FooterView>
	</div>
</template>

<script>
	import { mallIndex } from '../index.js'
	import TitleBar from '../components/index/title-bar/title-bar'
	import Region from '../components/index/title-bar/region'
	import Filters from '../components/index/filter/filter'
	import ScrollLoad from '../components/index/scroll-load/scroll-load'
	import Toast from '../components/toast'
	import FooterView from '../components/app-footer'

	export default {
		components: {
			TitleBar,
			Filters,
			Region,
			ScrollLoad,
			Toast,
			FooterView
		},
		data () {
			return {
				ToastMsg : "",
				isShowLoad : true,
				toastShow : false,
				isShowRegion : false
			}
		}
	}
</script>
   
<style lang="less">
	@import "../assets/css/index/index.less";
	@import "../assets/css/index/filter/filter.less";
	@import "../assets/css/index/roll/roll.less";
	@import "../assets/css/index/scroll-load/scroll-load.less";
	@import "../assets/css/gotop/gotop.less";
	@import "../assets/css/footer/footer.less";
</style>
