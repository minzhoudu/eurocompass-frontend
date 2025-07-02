<script lang="ts" setup>
import type { BaseBusInfo } from "../types";

const { data: buses, pending } = await useLazyFetch<BaseBusInfo[]>("/apis/buses/info");
</script>

<template>
	<template v-if="buses && !pending">
		<div
			class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
		>
			<BusesListSingleBus
				v-for="bus in buses"
				:key="bus.id"
				:bus="bus"
			/>

			<NuxtLink
				to="/admin/buses/add"
				class="flex items-center justify-center w-full h-full cursor-pointer border rounded-md gap-2 hover:bg-primary/10 transition-all duration-300"
			>
				<Icon
					name="tabler:circle-plus-filled"
					size="30"
				/>

				<h2>Dodaj novi autobus</h2>
			</NuxtLink>
		</div>
	</template>

	<BusesListSkeleton
		v-if="pending"
		:pending="pending"
	/>
</template>
