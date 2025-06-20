<script setup lang="ts">
useHead({
	titleTemplate: (titleChunk) => {
		return titleChunk ? `${titleChunk} - Rezervacija karte` : "Rezervacija karte";
	},
});
</script>

<template>
	<div class="container mt-10 flex flex-col gap-10">
		<HomeHeader />

		<HomeReservations />
	</div>
</template>
