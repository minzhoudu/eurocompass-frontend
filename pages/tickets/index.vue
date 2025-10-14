<script setup lang="ts">
import { useTicketsStore } from "@/stores/tickets";

definePageMeta({ layout: false });

const store = useTicketsStore();
const router = useRouter();
const selectedSeats = store.selectedSeats;
const ride = store.ride;
const printTickets = () => {
	window.onafterprint = afterPrint;
	window.print();
};
const afterPrint = () => {
	router.back();
};

const ticketList = computed(() => {
	if (!ride?.routeId) return [];

	const route = store.routes[ride.routeId];

	if (!route) return [];

	return route.tickets.map(ticket => ({
		label: ticket.name,
		ticket,
	}));
});

const selectedValue = ref();

watchEffect(() => {
	selectedValue.value = ticketList.value[0]?.ticket;
});
</script>

<template>
	<div v-if="selectedSeats">
		<div id="tickets-section">
			<AdminReservationsTicketsTicket
				v-for="(seat, i) in selectedSeats.seats"
				:key="i"
				:ticket="selectedValue"
				:route-id="ride?.routeId ?? ''"
				:ride="ride"
				:class="{ 'break-after-page': i !== selectedSeats.seats.length - 1 }"
				:seat="seat"
			/>
		</div>
		<div
			id="print-controls"
			class="fixed flex flex-col gap-5 bottom-10 left-[50%] -translate-x-[50%]"
		>
			<USelect
				v-model="selectedValue"
				:loading="store.loading"
				:content="{
					align: 'center',
					side: 'top',
					sideOffset: 8,
				}"
				:items="ticketList"
				value-key="ticket"
				class="w-48"
			/>

			<UButton
				class="text-3xl cursor-pointer"
				@click="printTickets"
			>
				Štampaj kartu
			</UButton>
		</div>
	</div>
</template>

<style lang="css" scoped>
@media print {
	#print-controls {
		display: none;
	}

	#tickets-section,
	#tickets-section * {
		visibility: visible;
	}
}
</style>
