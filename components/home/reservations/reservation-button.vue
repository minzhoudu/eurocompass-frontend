<script setup lang="ts">
import type { TabsItem } from "@nuxt/ui";
import type { Ride, SelectedSeats } from "./types";
import { getSelectedSeatsForBus, getTotalSelectedSeats } from "~/utils/bus/reservation";

const props = defineProps<{
	label: string;
	ride: Ride;
}>();

const authStore = useAuthStore();

const isModalOpen = ref(false);
const selectedSeats = ref<SelectedSeats[]>([]);

const toast = useToast();
const MAX_SELECTED_SEATS = 2;

const handleCancel = () => {
	isModalOpen.value = false;
	selectedSeats.value = [];
};

const tabItems = computed<TabsItem[]>(() => {
	return props.ride.buses.map(bus => ({
		label: `Kola ${bus.busNumber}`,
		value: bus.busNumber,
		disabled: !authStore.user,
	}));
});

const updateSelectedSeatsForBus = (busNumber: number, seats: number[]) => {
	const existingIndex = selectedSeats.value.findIndex(item => item.busNumber === busNumber);
	const currentBusSeats = existingIndex !== -1 ? selectedSeats.value[existingIndex].seats : [];
	const otherBusesTotalSeats = getTotalSelectedSeats(selectedSeats.value) - currentBusSeats.length;

	// Check if the new selection would exceed the maximum
	if (seats.length + otherBusesTotalSeats > MAX_SELECTED_SEATS) {
		toast.add({
			title: "Maksimalan broj rezervacija je 2",
			color: "error",
		});
		return;
	}

	if (existingIndex !== -1) {
		if (seats.length === 0) {
			selectedSeats.value.splice(existingIndex, 1);
		}
		else {
			selectedSeats.value[existingIndex].seats = seats;
		}
	}
	else if (seats.length > 0) {
		selectedSeats.value.push({ busNumber, seats });
	}
};
</script>

<template>
	<UModal
		v-model:open="isModalOpen"
		title="Rezervacija"
		description="Izaberite svoje sedište"
	>
		<UButton
			:label="label"
			variant="solid"
			color="neutral"
			size="sm"
			class="md:py-2 cursor-pointer"
			icon="lucide:ticket"
		/>

		<template #body>
			<div
				v-if="!authStore.user"
				class="mb-4 text-center flex flex-col gap-2 justify-center items-center bg-warning-300 p-4 rounded-lg"
			>
				<h2 class="text-2xl font-semibold text-primary">
					Prijavi se
				</h2>

				<p class="font-semibold w-10/12 text-left text-primary/70 text-sm md:text-base">
					Da biste rezervisali sedište, morate biti prijavljeni na svoj nalog.
				</p>

				<UButton
					label="Prijavi se"
					icon="lucide:log-in"
					class="bg-white text-black hover:bg-white/80 transition-all duration-300 px-4 py-2"
					to="/login"
				/>
			</div>

			<UTabs
				:default-value="ride.buses[0].busNumber"
				:items="tabItems"
				:ui="{
					list: tabItems.length > 1 ? '' : 'max-w-1/2',
				}"
			>
				<template #content="{ item }">
					<AppBusSeatLayout
						:disabled="!!item.disabled"
						:selected-seats="getSelectedSeatsForBus(selectedSeats, item.value as number)"
						:rows="ride.buses.find(bus => bus.busNumber === item.value)?.reservationSeatsRows ?? []"
						:max-seats-reached="getTotalSelectedSeats(selectedSeats) >= MAX_SELECTED_SEATS"
						@update:selected-seats="(seats) => updateSelectedSeatsForBus(item.value as number, seats)"
					/>
				</template>
			</UTabs>
		</template>

		<template
			#footer
		>
			<div class="flex gap-2 w-full justify-end">
				<UButton
					label="Odustani"
					variant="outline"
					color="error"
					class="cursor-pointer"
					@click="handleCancel"
				/>
				<UButton
					label="Rezerviši"
					class="cursor-pointer"
					:disabled="getTotalSelectedSeats(selectedSeats) === 0 || !authStore.user"
				/>
			</div>
		</template>
	</UModal>
</template>
