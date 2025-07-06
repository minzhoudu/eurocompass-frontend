<script setup lang="ts">
import type { TabsItem } from "@nuxt/ui";
import type { Ride } from "./types";
import { getSelectedSeatsForBus, getTotalSelectedSeats } from "~/utils/bus/reservation";

const props = defineProps<{
	label: string;
	ride: Ride;
}>();

const authStore = useAuthStore();

const { isModalOpen, selectedSeats, reserveSeats, handleCancelReservation, MAX_SELECTED_SEATS, updateSelectedSeatsForBus } = useReservations(props.ride.id);

const tabItems = computed<TabsItem[]>(() => {
	return props.ride.buses.map(bus => ({
		label: `Kola ${bus.busNumber}`,
		value: bus.busNumber,
		disabled: !authStore.user,
	}));
});

const emit = defineEmits<{
	(e: "reservation:success"): void;
}>();

const handleReserve = async () => {
	await reserveSeats();
	emit("reservation:success");
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
						:max-seats-reached="getTotalSelectedSeats(selectedSeats, ride.buses, authStore.user?.id) >= MAX_SELECTED_SEATS"
						@update:selected-seats="(seats) => updateSelectedSeatsForBus(ride.buses, item.value as number, seats, authStore.user?.id)"
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
					@click="handleCancelReservation"
				/>
				<UButton
					label="Rezerviši"
					class="cursor-pointer"
					:disabled="getTotalSelectedSeats(selectedSeats, ride.buses, authStore.user?.id) === 0 || !authStore.user"
					@click="handleReserve"
				/>
			</div>
		</template>
	</UModal>
</template>
