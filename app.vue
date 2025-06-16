<script setup lang="ts">
// hardcoded theme for now
// TODO: add theme support
useHead({
	bodyAttrs: {
		class: "light",
	},
});
</script>

<template>
	<UApp>
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</UApp>
</template>
