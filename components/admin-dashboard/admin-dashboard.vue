<script setup lang="ts">
import type { BaseBusInfo } from "../buses/types";
import type { ExtendedBus } from "~/composables/useAdminDashboardTreeView";

const { routesWithRides, getTreeItems, refetchGetRides, expandedRoutes, getRidesError } = await useAdminDashboardTreeView();

const { data: buses, pending: busesPending, error: busInfoError } = await useLazyFetch<BaseBusInfo[]>("/apis/buses/info");
</script>

<template>
	<template v-if="busInfoError || getRidesError">
		<div class="flex flex-col items-center w-full bg-warning-300 text-error font-semibold py-3">
			<h1 class="text-lg">
				Došlo je do greške pri dobavljanju informacija o {{ busInfoError ? "autobusima" : "polascima" }}. Pokušajte ponovo.
			</h1>
			<p class="text-error/90">
				Ako se greška ponovi, molimo prijavite problem.
			</p>

			<UButton
				label="Pokušajte ponovo"
				class="cursor-pointer mt-4"
				@click="() => $router.go(0)"
			/>
		</div>
	</template>

	<template v-else>
		<div class="flex items-center flex-col gap-10 lg:gap-30 w-full">
			<div class="bg-warning-300 px-5 py-2 rounded-lg">
				<h1 class="text-2xl font-bold">
					Podešavanje linija
				</h1>
			</div>

			<div class="grid grid-cols-1 lg:grid-cols-2 w-full lg:justify-around gap-x-5 lg:gap-x-0 gap-y-10 lg:gap-y-30 lg:justify-items-center">
				<div
					v-for="route in routesWithRides"
					:key="route.id"
				>
					<UTree
						v-model:expanded="expandedRoutes"
						:items="getTreeItems(route)"
						class="border rounded-lg w-full lg:w-[500px] max-h-96 scroll-bar"
						:ui="{ listWithChildren: 'border-warning-300' }"
					>
						<template #bus-item="{ item }: { item: {bus: ExtendedBus} }">
							<UTooltip
								:content="{ side: 'top' }"
								:delay-duration="0"
								:ui="{
									content: 'bg-primary',
								}"
							>
								<div class="flex flex-col gap-2 w-full">
									<div class="bg-primary text-white/90 px-2 py-1 rounded flex justify-between items-center lg:gap-5 font-bold">
										<Icon
											name="lucide:bus"
											size="20"
										/>

										<p>
											{{ item.bus.name }}
										</p>
										<p>Slobodnih mesta - {{ item.bus.freeSeats }}</p>

										<UButton
											size="xs"
											class="py-0.5 cursor-pointer"
											variant="outline"
											color="neutral"
											icon="material-symbols:delete-outline"
										/>
									</div>
								</div>

								<template #content>
									<div class="flex flex-col gap-2 text-white/90 px-2 py-1 rounded">
										<p>Registracija: <span class="font-bold">{{ item.bus.registration }}</span></p>
									</div>
								</template>
							</UTooltip>
						</template>

						<template #add-bus-item="{ item }: { item: { rideId: string } }">
							<AdminDashboardAddBusSelector
								v-if="buses"
								:buses="buses"
								:buses-loading="busesPending"
								:ride-id="item.rideId"
								@bus-added="refetchGetRides"
							/>
						</template>
					</UTree>
				</div>
			</div>
		</div>
	</template>
</template>

<style>
.scroll-bar{
	overflow-y: auto;
	scrollbar-color: yellow;
}

.scroll-bar::-webkit-scrollbar {
  width: 3px;
}

.scroll-bar::-webkit-scrollbar-track {
  border-radius: 11px;
}

.scroll-bar::-webkit-scrollbar-thumb {
  background: #314158;
  border-radius: 11px;
}
</style>
