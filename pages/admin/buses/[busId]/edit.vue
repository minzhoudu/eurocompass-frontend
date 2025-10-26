<script setup lang="ts">
import type { BreadcrumbItem } from "@nuxt/ui";

import type { ExtendedBusInfo } from "~/components/buses/types";

const route = useRoute();

const { data: bus, pending } = await useFetchCustom<ExtendedBusInfo>(`/buses/${route.params.busId}`, { lazy: true });

const breadcrumbs = computed<BreadcrumbItem[]>(() => {
	return [
		{
			label: "Lista autobusa",
			to: "/admin/buses",
			icon: "tabler:arrow-back-up",
		},
		{
			label: bus.value?.name ?? "",
		},
	];
});
</script>

<template>
	<div class="container mt-10 flex justify-center">
		<div
			v-if="bus"
			class="flex flex-col gap-10"
		>
			<UBreadcrumb
				:items="breadcrumbs"
				class="place-self-start"
			/>

			<BusesEditBus
				:bus="bus"
			/>
		</div>

		<USkeleton
			v-if="pending"
			class="h-32 w-full flex items-center justify-center font-bold text-xl md:text-2xl"
		>
			Učitavanje podataka...
		</USkeleton>
	</div>
</template>
