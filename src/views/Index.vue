<template>
	<p>
		<!-- 使用 router-link 组件来导航. -->
		<!-- 通过传入 `to` 属性指定链接. -->
		<!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
		<router-link class="link-item" to="/Home">车商城首页</router-link>
		<router-link class="link-item" to="/Order">我的订单</router-link>
		<router-link class="link-item" to="/ColleatsView">我收藏的订单</router-link>
		<router-link class="link-item" to="/News">商城消息</router-link>
	</p>
</template>

<style>
	.link-item{
		display: block;
		height: 40px;
		line-height: 40px;
		color: #333;
		border-bottom: 1px solid #eee;
		font-size: 16px;
		text-align: center;
		background: #fff;
	}
</style>