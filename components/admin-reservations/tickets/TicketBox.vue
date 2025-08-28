<script setup lang="ts">
defineProps<{
	label: string;
	value: string | number;
}>();
</script>
<template>
	<div class="flex flex-col">
		<p>{{ label }}</p>
		<div class="ticket-box">{{ value }}</div>
	</div>
</template>
<style lang="css" scoped>
.ticket-box {
	border: 1px solid black;
	text-align: center;
}
</style>
