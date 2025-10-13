<script setup lang="ts">
defineProps<{
	pending: boolean;
}>();
</script>

<template>
	<h1
		class="md:text-2xl font-bold text-center"
		:class="{
			'animate-pulse': pending,
		}"
	>
		{{ pending ? "Učitavanje polazaka..." : "Vožnje za odabrani datum" }}
	</h1>
</template>
