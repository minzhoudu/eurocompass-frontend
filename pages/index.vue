<script setup lang="ts">
const value = ref("");
</script>

<template>
	<div>
		<h1>Home Page</h1>
		<UInput
			v-model="value"
			placeholder="Search..."
			variant="subtle"
			size="xl"
			trailing-icon="i-lucide-search"
			loading
			loading-icon="i-lucide-loader"
		/>
	</div>
</template>
