<script setup lang="ts">
import type { TabsItem } from "@nuxt/ui";
import type { Bus } from "~/components/home/reservations/types";
import type { Orphan } from "~/composables/useAdminDashboardTreeView";
import { getSelectedSeatsForBus } from "~/utils/bus/reservation";

const props = defineProps<{
	icon: string;
	label: string;
	orphans: Orphan[];
	buses: Bus[];
	rideId: string;
	expandedRoutes: string[];
}>();

const emit = defineEmits<{
	(e: "orphan-assigned"): void;
}>();

const tabItems = computed<TabsItem[]>(() => {
	return props.buses.map(bus => ({
		label: `Kola ${bus.busNumber}`,
		value: bus.busNumber,
	}));
});
const seatSelectionModalOpen = ref(false);

const { selectedSeats } = useReservations(props.rideId);
const selectSeat = (seats: number[], busNumber: number) => {
	const lastSelectedSeat = seats[seats.length - 1];

	selectedSeats.value = [{
		seats: [lastSelectedSeat],
		busNumber,
	}];
};

const reserveSeat = async (busNumber: number, orphan: Orphan) => {
	const seatNumber = selectedSeats.value.find(seat => seat.busNumber === busNumber)?.seats[0];

	const reservation = {
		rideId: props.rideId,
		orphan: orphan,
		busNumber: busNumber,
		seat: seatNumber,
	};

	try {
		await $fetch("/apis/admin/assignOrphan", {
			method: "post",
			body: reservation
		});

	}
	catch (error) {
		console.error(error);
	}
	console.log(reservation);
	seatSelectionModalOpen.value = false
	emit("orphan-assigned")

};

const isExpanded = computed(() => props.expandedRoutes.includes(props.rideId));
</script>

<template>
	<div class="flex justify-between items-center w-full">
		<div class="flex gap-2 items-center px-2 py-1 rounded">
			<Icon :name="icon" size="20" />

			<p>{{ label }}</p>

			<UModal v-if="orphans.length > 0" title="Neprijavljeni putnici"
				description="Putnici koji su se prijavili na ovoj liniji, ali su izbrisani sa linije zbog promene autobusa.">
				<UButton color="error" class="cursor-pointer p-0 sm:p-0" size="xl" variant="link"
					icon="material-symbols:warning-rounded" @click="(e) => e.stopPropagation()" />

				<template #body>
					<div class="flex flex-col gap-2">
						<div v-for="orphan in orphans" :key="orphan.userId"
							class="flex gap-2 items-center justify-between text-sm">
							<div class="flex gap-2 items-center">
								<Icon name="material-symbols:person-outline"
									size="20" />

								<p>{{ orphan.name }} {{ orphan.lastName }}</p>
							</div>

							<UModal :open="seatSelectionModalOpen" title="Autobus"
								description="Izaberite novo sedište.">
								<UButton label="Dodeli novo sedište" color="secondary"
									icon="material-symbols:add-circle-outline"
									@click="seatSelectionModalOpen = true" size="sm"
									class="cursor-pointer" />

								<template #body>
									<div class="flex flex-col gap-2">
										<UTabs :default-value="buses[0].busNumber"
											:items="tabItems" :ui="{
												list: tabItems.length > 1 ? '' : 'max-w-1/2',
											}">
											<template #content="{ item }">
												<div
													class="flex flex-col gap-5">
													<AppBusSeatLayout
														:disabled="false"
														:selected-seats="getSelectedSeatsForBus(selectedSeats, item.value as number)"
														:rows="buses.find(bus => bus.busNumber === item.value)?.reservationSeatsRows ?? []"
														:max-seats-reached="false"
														@update:selected-seats="(seats) => selectSeat(seats, item.value as number)" />

													<UButton label="Potvrdi sedište"
														color="success"
														icon="material-symbols:check-circle-outline"
														class="cursor-pointer self-center"
														@click="reserveSeat(item.value as number, orphan)" />
												</div>
											</template>
										</UTabs>
									</div>
								</template>
							</UModal>
						</div>
					</div>
				</template>
			</UModal>
		</div>

		<Icon name="lucide:chevron-down" size="20"
			class="transform transition-transform duration-200 ease-in-out"
			:class="{ 'rotate-180': isExpanded }" />
	</div>
</template>
