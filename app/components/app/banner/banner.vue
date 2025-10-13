<script setup lang="ts">
defineProps<{
	title: string;
	description: string;
	buttonLabel?: string;
	buttonIcon?: string;
	navigateTo: string;
}>();
</script>

<template>
	<div
		class="mb-4 text-center flex flex-col gap-2 justify-center items-center bg-warning-300 p-4 rounded-lg"
	>
		<h2 class="text-2xl font-semibold text-primary">
			{{ title }}
		</h2>

		<p class="font-semibold w-10/12 text-left text-primary/70 text-sm md:text-base">
			{{ description }}
		</p>

		<UButton
			v-if="buttonLabel"
			:label="buttonLabel"
			:icon="buttonIcon"
			class="bg-white text-black hover:bg-white/80 transition-all duration-300 px-4 py-2"
			:to="navigateTo"
		/>
	</div>
</template>
