<script lang="ts" setup>
import type { BaseBusInfo } from "../types";

const { data: buses, pending, refresh } = await useFetchCustom<BaseBusInfo[]>("/buses/info", {
	lazy: true,
	transform: (data) => {
		if (!data) return [];

		return data;
	},
});

const handleBusDeleted = () => {
	refresh();
};
</script>

<template>
	<div class="mb-5">
		<template v-if="!pending">
			<div
				class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 w-11/12 mx-auto sm:w-full"
			>
				<BusesListSingleBus
					v-for="bus in buses"
					:key="bus.id"
					:bus="bus"
					@bus:deleted="handleBusDeleted"
				/>

				<NuxtLink
					to="/admin/buses/add"
					class="flex items-center justify-center min-h-40 h-full cursor-pointer border rounded-md gap-2 hover:bg-primary/10 transition-all duration-300"
				>
					<Icon
						name="tabler:circle-plus-filled"
						size="30"
					/>

					<h2 class="font-semibold">Dodaj novi autobus</h2>
				</NuxtLink>
			</div>
		</template>

		<BusesListSkeleton
			v-if="pending"
			:pending="pending"
		/>
	</div>
</template>
