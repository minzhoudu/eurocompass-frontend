<script setup lang="ts">
// import type { Ride } from "~/components/home/reservations/types";

// const { data: routes } = await useLazyFetch<Ride[]>("/apis/routes");

// const { data: rides } = await useLazyFetch<Ride[]>("/apis/rides/getride", {
// 	method: "post",
// 	body: {
// 		date: "2025-07-10",
// 		routeId: "685e8092dc9a36ac2c8a4190",
// 	},
// });
</script>

<template>
	<div class="container min-h-[calc(100vh-121px)] flex items-center">
		<h1 class="text-2xl font-bold">
			Stranica u izradi
		</h1>
		<!-- <div>
			<div
				v-for="ride in rides"
				:key="ride.id"
				class="flex gap-5"
			>
				<h1>{{ ride.id }}</h1>
				<p>{{ ride.departure }}</p>
				<p>{{ ride.routeId }}</p>
			</div>
		</div> -->
	</div>
</template>
