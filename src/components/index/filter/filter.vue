<template>
	<div>
		<div class="filter">
			<div class="filter-wrap">
				<div data-name="brand" class="actionsheet" data-id="brand_list">
					<div data-value="brand" class="value">品牌</div>
				</div>
				<div data-name="price" class="actionsheet" data-id="price_list">
					<div data-value="price" class="value">价格</div>
				</div>
			</div> 
			<div id="brand" style="display: none;">
				<ul class="actionsheet-cells" id="brand_list">
					<li>
						<label for="c555">
							<input type="radio" name="price" id="c555" value="10005"> 
							<span>20万以上</span>
						</label>
					</li>
				</ul>
			</div>
		</div>
		<i class="mask" style="display: none;"></i>
	</div>
    
</template>
<script>

	export default {
		data () {
		return {	
			showContent1: false,
			}
		}
	}
</script>