<script setup lang="ts">
const value = ref("");
</script>

<template>
	<div class="container">
		<h1>Home Page</h1>
		<UInput
			v-model="value"
			placeholder="Search..."
			variant="subtle"
			size="xl"
			trailing-icon="i-lucide-search"
			loading-icon="i-lucide-loader"
		/>
	</div>
</template>
