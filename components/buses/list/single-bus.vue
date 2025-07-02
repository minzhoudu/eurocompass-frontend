<script setup lang="ts">
import type { BaseBusInfo } from "../types";

defineProps<{
	bus: BaseBusInfo;
}>();
</script>

<template>
	<UCard
		:ui="{
			header: 'bg-warning-300',
		}"
	>
		<template #header>
			<div class="flex justify-between">
				<h2 class="font-bold text-lg">
					{{ bus.name }}
				</h2>

				<BusesListActionsMenu :bus-id="bus.id" />
			</div>
		</template>

		<div class="flex flex-col gap-2 font-semibold">
			<div class="flex items-center gap-2">
				<p class="text-lg lg:text-xl">
					Registracija:
				</p>
				<span class="text-primary text-xl lg:text-2xl rounded-sm px-2 border">{{ bus.registration }}</span>
			</div>

			<div class="flex items-center gap-2 text-lg lg:text-xl">
				<p>
					Broj sedišta:
				</p>

				<div class="bg-warning-300 rounded-lg px-2 py-1">
					{{ bus.totalSeats }}
				</div>
			</div>
		</div>
	</UCard>
</template>
