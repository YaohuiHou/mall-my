<template>
    <li>
        <label v-bind:for="changeId">
            <input type="radio" name="bid" v-bind:id="changeId" v-bind:value="changeVal"/>
            <span>{{ changeItem }}</span>
        </label>
    </li>
</template>
<script>
export default {
	props : ['changeId','changeItem','changeVal']
}
</script>