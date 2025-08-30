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
</script>

<template>
	<div v-if="selectedSeats">
		<div id="print-controls">
			<button @click="printTickets">
				Print Tickets
			</button>
		</div>
		<div id="tickets-section">
			<AdminReservationsTicketsTicket
				v-for="(ticket, i) in selectedSeats.seats"
				:key="i"
				:route-id="ride?.routeId ?? ''"
				:class="{ 'break-after-page': i !== selectedSeats.seats.length - 1 }"
				:seat="ticket"
			/>
		</div>
	</div>
	<div v-else>
		TODO
	</div>
</template>

<style lang="css" scoped>
@media print {
	#print-controls {
		visibility: hidden;
	}

	#tickets-section,
	#tickets-section * {
		visibility: visible;
	}
}
</style>
