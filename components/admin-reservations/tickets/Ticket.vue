<script setup lang="ts">
import TicketCard from "./TicketCard.vue";
import type { Ride } from "~/components/home/reservations/types";
import { useTicketsStore, type RouteInfo, type Ticket } from "~/stores/tickets";

const store = useTicketsStore();
const route = ref<RouteInfo | undefined>();

const props = defineProps<{
	routeId: string;
	seat?: number;
	busNumber?: number;
	platform?: number;
	ticket?: Ticket;
	ride: Ride | null;
}>();

onMounted(async () => {
	route.value = await store.getRoute(props.routeId);
});
const departureTime = computed(() => {
	if (props.ride?.departure != null) {
		return dayjs.utc(props.ride.departure).format("HH:mm");
	}
	return "";
});
const departureDate = computed(() => {
	if (props.ride?.departure != null) {
		return dayjs.utc(props.ride.departure).format("DD.MM.YYYY.");
	}
	return "";
});
</script>

<template>
	<div
		v-if="ticket != null"
		style="width:750px; page-break-after:always;"
		class="flex flex-col gap-48 mt-48 ml-5"
	>
		<div
			v-for="(relation, i) in ticket.relations"
			:key="i"
			class="flex gap-10"
		>
			<TicketCard
				title=" AUTOBUSKA KARTA"
				:ticket="{
					relation1: relation.name,
					price: ticket.relations.length - 1 == i ? ticket.price.amount - 1 : 1,
					date: departureDate,
					time: departureTime,
					seat: props.seat,
					platform: props.platform,
					note: 'U cenu karte je uracunat osvezavajuci napitak',
				}"
			/>
			<TicketCard
				v-if="relation.coupon2"
				title="KUPON"
				:ticket="{
					relation1: relation.coupon2,
					price: 'OVERA',
					date: departureDate,
					time: departureTime,
					seat: props.seat,
					platform: props.platform,
				}"
			/>
			<TicketCard
				title="KUPON"
				:ticket="{
					relation1: relation.coupon1,
					price: ticket.relations.length - 1 == i ? ticket.price.amount - 1 : 1,
					date: departureDate,
					time: departureTime,
					seat: props.seat,
					platform: props.platform,
				}"
			/>
		</div>
	</div>
</template>
