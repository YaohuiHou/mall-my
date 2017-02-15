<template>
	<li>
		<a href="#">
			<figure>
				<!-- <em>
					<img v-bind:src="trademark">
				</em> -->
				<img v-bind:src="wrapperImg">
			</figure>
			<p>{{ title }}</p>
			<div class="price">
				<span class="">{{ marketPrice }}</span>
				<i>{{ cheapPrice }}</i>
			</div>
		</a>
	</li>
</template>
<script>
	export default {
    	props : ['trademark','wrapperImg','title','marketPrice','cheapPrice']
	}
</script>