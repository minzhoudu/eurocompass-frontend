<script lang="ts" setup>
import type { TabsItem } from "@nuxt/ui";
import type { Ride, SelectedSeats } from "~/components/home/reservations/types";
import { getSelectedSeatsForBus } from "~/utils/bus/reservation";
import { useTicketsStore } from "@/stores/tickets";

const store = useTicketsStore();
const router = useRouter();
const props = defineProps<{
	label: string;
	ride: Ride;
}>();

const isModalOpen = ref(false);
const selectedSeats = ref<SelectedSeats[]>([]);

const tabItems = computed<TabsItem[]>(() => {
	return props.ride.buses.map(bus => ({
		label: `Kola ${bus.busNumber}`,
		value: bus.busNumber,
	}));
});

const updateSelectedSeatsForBus = (busNumber: number, seats: number[]) => {
	const existingIndex = selectedSeats.value.findIndex(item => item.busNumber === busNumber);

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

const clearSelectedSeats = () => {
	selectedSeats.value = [];
};

const toast = useToast();

const onSubmit = async (user: {
	name: string;
	lastName: string;
	phone: string;
}) => {
	const body = {
		...user,
		reservations: selectedSeats.value,
		rideId: props.ride.id,
	};

	try {
		await $fetch("/apis/admin/reserve", {
			method: "POST",
			body,
		});

		emit("reservation:success");

		isModalOpen.value = false;

		store.selectedSeats = selectedSeats.value[0];
		store.ride = props.ride;
		router.push({
			name: "tickets",
		});

		clearSelectedSeats();
		toast.add({ title: "Success", description: "Rezervacija je uspešno kreirana.", color: "success" });
	}
	catch (error) {
		toast.add({ title: "Error", description: "Greška prilikom rezervacije.", color: "error" });
		console.error(error);
	}
};

const emit = defineEmits<{
	(e: "reservation:success"): void;
}>();
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
			<UTabs
				:default-value="ride.buses[0].busNumber"
				:items="tabItems"
				:ui="{
					list: tabItems.length > 1 ? '' : 'max-w-1/2',
				}"
			>
				<template #content="{ item }">
					<AppBusSeatLayout
						:disabled="false"
						:selected-seats="getSelectedSeatsForBus(selectedSeats, item.value as number)"
						:rows="ride.buses.find(bus => bus.busNumber === item.value)?.reservationSeatsRows ?? []"
						:max-seats-reached="false"
						@update:selected-seats="(seats) => updateSelectedSeatsForBus(item.value as number, seats)"
					/>
				</template>
			</UTabs>
		</template>

		<template #footer>
			<div class="flex gap-2 w-full justify-end">
				<UButton
					label="Odustani"
					variant="outline"
					color="error"
					class="cursor-pointer"
					@click="() => {
						clearSelectedSeats();
						isModalOpen = false;
					}"
				/>

				<AdminReservationsTableUserDataForm
					:submit-disabled="selectedSeats.length === 0"
					@submit="onSubmit"
				/>
			</div>
		</template>
	</UModal>
</template>
