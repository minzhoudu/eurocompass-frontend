<script setup lang="ts">
defineProps<{
	busNumber: number;
	seat: number;
}>();
</script>

<template>
	<div class="bg-slate-200 p-4 rounded-lg text-primary font-bold">
		<p>Kola: <span class="bg-warning-300 px-2 py-1 rounded-md">{{ busNumber }}</span></p>
		<p>Sediste: <span class="bg-warning-300 px-2 py-1 rounded-md">{{ seat }}</span></p>

		<UButton
			label="Otkazi rezervaciju"
			color="error"
			class="mt-4 cursor-pointer"
		/>
	</div>
</template>
