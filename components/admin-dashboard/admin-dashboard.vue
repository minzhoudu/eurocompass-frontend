<script setup lang="ts">
import { parseDate, today, type DateValue } from "@internationalized/date";
import { getLocalTimeZone } from "@internationalized/date";
import type { BaseBusInfo } from "../buses/types";
import type { Bus } from "../home/reservations/types";
import type { ExtendedBus, Orphan } from "~/composables/useAdminDashboardTreeView";

const router = useRouter();
const route = useRoute();

const from = ref<DateValue>();
const to = ref<DateValue>();

from.value = route.query.from ? parseDate(route.query.from as string) : today(getLocalTimeZone());
to.value = route.query.to ? parseDate(route.query.to as string) : today(getLocalTimeZone()).add({ days: 5 });

const { routesWithRides, getTreeItems, refetchGetRides, getRidesError, getRidesLoading } = await useAdminDashboardTreeView(from, to);

const { data: buses, pending: busesLoading, error: busInfoError } = await useLazyFetch<BaseBusInfo[]>("/apis/buses/info");

const expandedRoutes = ref<string[]>([]);

const updateQuery = (date: DateValue | undefined, key: "from" | "to") => {
	router.push({ query: { ...route.query, [key]: date?.toString() || null } });
};
</script>

<template>
	<AdminDashboardError
		v-if="busInfoError || getRidesError"
		:is-info-error="!!busInfoError"
	/>

	<template v-else>
		<div class="flex items-center flex-col gap-10 lg:gap-20 w-full">
			<div class="bg-warning-300 px-5 py-2 rounded-lg">
				<h1 class="text-2xl font-bold">
					Podešavanje linija
				</h1>
			</div>

			<div class="flex sm:gap-5">
				<AppDatePicker
					v-model="from"
					placeholder="Od"
					enable-all-dates
					@update:model-value="(date) => updateQuery(date, 'from')"
				/>

				<AppDatePicker
					v-model="to"
					placeholder="Do"
					enable-all-dates
					@update:model-value="(date) => updateQuery(date, 'to')"
				/>
			</div>

			<AdminDashboardLoading v-if="busesLoading || getRidesLoading" />

			<div
				v-else
				class="grid grid-cols-1 lg:grid-cols-2 w-full lg:justify-around gap-x-5 lg:gap-x-0 gap-y-10 lg:gap-y-30 lg:justify-items-center"
			>
				<div
					v-for="routeWithRide in routesWithRides"
					:key="routeWithRide.id"
				>
					<UTree
						v-model:expanded="expandedRoutes"
						:items="getTreeItems(routeWithRide)"
						class="border rounded-lg w-full lg:w-[500px] max-h-96 scroll-bar"
						:ui="{ listWithChildren: 'border-warning-300' }"
					>
						<template
							#bus-item="{ item }: { item: { bus: ExtendedBus, rideId: string } }"
						>
							<UTooltip
								:content="{ side: 'top' }"
								:delay-duration="0"
								:ui="{
									content: 'bg-primary',
								}"
							>
								<div class="flex flex-col gap-2 w-full">
									<div
										class="bg-primary text-white/90 p-2 rounded flex justify-between items-center lg:gap-4 font-bold flex-wrap md:flex-nowrap"
									>
										<Icon
											name="lucide:bus"
											size="20"
										/>

										<p>
											{{ item.bus.name }}
										</p>
										<p>
											Slobodnih mesta - {{
												item.bus.freeSeats }}
										</p>

										<div
											v-if="buses && item.bus && item.bus.busId"
											class="flex gap-1"
										>
											<AdminDashboardChangeBusSelector
												:buses="buses"
												:current-bus="item.bus"
												:ride-id="item.rideId"
												@bus-changed="refetchGetRides"
											/>

											<AdminDashboardRemoveBusModal
												:bus-id="item.bus.busId"
												:ride-id="item.rideId"
												@bus-removed="refetchGetRides"
											/>
										</div>
									</div>
								</div>

								<template #content>
									<div
										class="flex flex-col gap-2 text-white/90 px-2 py-1 rounded"
									>
										<p>
											Registracija: <span
												class="font-bold"
											>{{
												item.bus.registration
											}}</span>
										</p>
									</div>
								</template>
							</UTooltip>
						</template>

						<template
							#ride-item="{ item }: { item: { label: string, icon: string, orphans: Orphan[], rideId: string, buses: Bus[], totalFreeSeats: number } }"
						>
							<AdminDashboardRideItem
								:total-free-seats="item.totalFreeSeats"
								:icon="item.icon"
								:label="item.label"
								:orphans="item.orphans"
								:buses="item.buses"
								:ride-id="item.rideId"
								:expanded-routes="expandedRoutes"
								@orphan-assigned="refetchGetRides"
							/>
						</template>

						<template #add-bus-item="{ item }: { item: { rideId: string, selectedBuses: ExtendedBus[] } }">
							<AdminDashboardAddBusSelector
								v-if="buses"
								:buses="buses"
								:selected-buses="item.selectedBuses"
								:buses-loading="busesLoading"
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
.scroll-bar {
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
