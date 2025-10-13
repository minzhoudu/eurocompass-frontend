<script setup lang="ts">
import type { BreadcrumbItem } from "@nuxt/ui";

const breadcrumbs: BreadcrumbItem[] = [
	{
		label: "Lista autobusa",
		to: "/admin/buses",
		icon: "tabler:arrow-back-up",
	},
	{
		label: "Novi autobus",
	},
];
</script>

<template>
	<div class="container mt-10 flex justify-center">
		<div class="flex flex-col gap-10">
			<UBreadcrumb
				:items="breadcrumbs"
				class="place-self-start"
			/>

			<BusesAddBus />
		</div>
	</div>
</template>
