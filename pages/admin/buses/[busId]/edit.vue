<script setup lang="ts">
import type { BreadcrumbItem } from "@nuxt/ui";

import type { ExtendedBusInfo } from "~/components/buses/types";

const route = useRoute();

const { data: bus } = await useLazyFetch<ExtendedBusInfo>(`/apis/buses/${route.params.busId}`);

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
		<div class="flex flex-col gap-10">
			<UBreadcrumb
				:items="breadcrumbs"
				class="place-self-start"
			/>

			<BusesEditBus
				v-if="bus"
				:bus="bus"
			/>
		</div>
	</div>
</template>
