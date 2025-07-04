<script setup lang="ts">
defineProps<{
	text: string;
}>();
</script>

<template>
	<div
		class="w-full col-span-5 flex items-center justify-center gap-2 p-2"
	>
		<div class="bg-black h-0.5 w-full" />

		<span class="text-xs text-gray-700 text-nowrap font-bold">{{ text }}</span>

		<div class="bg-black h-0.5 w-full" />
	</div>
</template>
