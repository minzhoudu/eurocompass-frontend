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
		disabled: !authStore.user || !authStore.user.phone,
	}));
});

const isReservationDisabled = computed(() => {
	const totalSelectedSeats = getTotalSelectedSeats(selectedSeats.value, props.ride.buses, authStore.user?.id);

	return totalSelectedSeats === 0 || totalSelectedSeats > MAX_SELECTED_SEATS || !authStore.user || !authStore.user.phone;
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
			<HomeReservationsModalBanner :user="authStore.user" />

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
					:disabled="isReservationDisabled"
					@click="handleReserve"
				/>
			</div>
		</template>
	</UModal>
</template>
