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

from.value = route.query.from === "all" ? undefined : route.query.from ? parseDate(route.query.from as string) : today(getLocalTimeZone());
to.value = route.query.to === "all" ? undefined : route.query.to ? parseDate(route.query.to as string) : today(getLocalTimeZone()).add({ days: 15 });

const { routesWithRides, getTreeItems, refetchGetRides, getRidesError, getRidesLoading } = await useAdminDashboardTreeView(from, to);

const { data: buses, pending: busesLoading, error: busInfoError } = await useFetchCustom<BaseBusInfo[]>("/buses/info", { lazy: true });

const expandedRoutes = ref<string[]>(["Krusevac - Beograd", "Beograd - Krusevac"]);

type UpdateQueryParams = {
	date?: DateValue;
	key?: "from" | "to";
	all?: boolean;
};

const updateQuery = ({ date, key, all }: UpdateQueryParams) => {
	if (all) {
		router.push({ query: { ...route.query, from: "all", to: "all" } });
	}

	if (key) {
		router.push({ query: { ...route.query, [key]: date?.toString() } });
	}
};

const seat = computed(() => {
	return Number(route.query.seat);
});

const { apiFetch } = useApiFetch();

const toast = useToast();
const isPendingCancelReservation = ref(false);
const handleCancelReservation = async (busNumber: number, rideId: string) => {
	isPendingCancelReservation.value = true;
	try {
		await apiFetch("/admin/cancelReservations", {
			method: "DELETE",
			body: {
				reservations: [
					{
						busNumber,
						seats: [
							seat.value,
						],
					},
				],
				rideId,
			},
		});

		toast.add({
			title: "Rezervacija je uspešno otkazana",
			color: "success",
		});

		router.push({ query: { ...route.query, seat: undefined } });
		await refetchGetRides();
	}
	catch (error) {
		console.error(error);

		toast.add({
			title: "Greška prilikom otkazivanja rezervacije",
			color: "error",
		});
	}
	finally {
		isPendingCancelReservation.value = false;
	}
};
</script>

<template>
	<AdminDashboardError
		v-if="busInfoError || getRidesError"
		:is-info-error="!!busInfoError"
	/>

	<template v-else>
		<div class="flex items-center flex-col gap-10 w-full">
			<div class="bg-warning-300 px-5 py-2 rounded-lg">
				<h1 class="text-2xl font-bold">
					Podešavanje linija
				</h1>
			</div>

			<div class="flex flex-col sm:flex-row gap-5">
				<AppDatePicker
					v-model="from"
					placeholder="Od"
					enable-all-dates
					@update:model-value="(date) => updateQuery({ date, key: 'from' })"
				/>

				<div class="flex gap-3">
					<UButton
						label="Sve linije"
						class="cursor-pointer flex-1 flex items-center justify-center"
						@click="() => {
							from = undefined
							to = undefined
							updateQuery({ all: true })
						}"
					/>

					<UButton
						label="Osveži podatke"
						class="cursor-pointer flex-1 flex items-center justify-center"
						@click="() => refetchGetRides()"
					/>
				</div>

				<AppDatePicker
					v-model="to"
					placeholder="Do"
					enable-all-dates
					@update:model-value="(date) => updateQuery({ date, key: 'to' })"
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
					class="w-full px-5"
				>
					<UTree
						v-model:expanded="expandedRoutes"
						:items="getTreeItems(routeWithRide)"
						class="border rounded-lg w-full max-h-[55vh] scroll-bar"
						:ui="{ listWithChildren: 'border-warning-300' }"
					>
						<template #ride-date="{ item }: {item: { hasOrphans: boolean, label: string }}">
							<div class="flex items-center w-full justify-between">
								<div class="flex items-center gap-4">
									<Icon
										name="material-symbols:calendar-month-rounded"
										size="18"
									/>
									<span>{{ item.label }}</span>

									<div
										v-if="item.hasOrphans"
										class="flex"
									>
										<Icon
											name="material-symbols:warning-rounded"
											size="24"
											class="text-error"
										/>
									</div>
								</div>

								<Icon
									name="lucide:chevron-down"
									size="20"
									class=""
								/>
							</div>
						</template>

						<template
							#bus-item="{ item }: { item: { bus: ExtendedBus, rideId: string } }"
						>
							<div class="flex flex-col gap-2 w-full">
								<div
									class="bg-primary text-white/90 p-2 rounded flex justify-between items-center lg:gap-4 font-bold flex-wrap md:flex-nowrap"
								>
									<UModal
										title="Rezervacije na autobusu"
										description="Provera rezervacija na sedištima autobusa na trenutnoj vožnji."
									>
										<UButton class="py-0.5 px-1 cursor-pointer border hover:text-info">
											<Icon
												name="lucide:bus"
												size="18"
											/>
										</UButton>

										<template #body>
											<AppBusSeatLayout
												:disabled="false"
												:selected-seats="[]"
												:rows="item.bus.reservationSeatsRows ?? []"
												:max-seats-reached="false"
												is-admin-dashboard
												@admin:cancel-reservation="() => handleCancelReservation(item.bus.busNumber, item.rideId)"
											/>
										</template>
									</UModal>

									<p>
										{{ item.bus.name }}
									</p>
									<p>
										Slobodnih mesta - {{
											item.bus.freeSeats }}
									</p>

									<div class="flex gap-2">
										<p>
											Peron
										</p>
										<span>-</span>
										<div class="flex items-center">
											<span v-if="item.bus.platform">{{ item.bus.platform }}</span>
											<Icon
												v-else
												class="text-error"
												size="20"
												name="subway:error"
											/>
										</div>
									</div>

									<div
										v-if="buses && item.bus && item.bus.busId"
										class="flex gap-1"
									>
										<AdminDashboardChangeBusPlatform
											:bus-platform="item.bus.platform"
											:bus-number="item.bus.busNumber"
											:ride-id="item.rideId"
											@platform-changed="refetchGetRides"
										/>

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
