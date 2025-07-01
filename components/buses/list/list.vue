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
		</div>
	</template>

	<BusesListSkeleton
		v-if="pending"
		:pending="pending"
	/>
</template>
