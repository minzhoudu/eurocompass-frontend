<script setup lang="ts">
import TicketCard from "./TicketCard.vue";
import { useTicketsStore, type RouteInfo, type Ticket } from "~/stores/tickets";

const store = useTicketsStore();
const route = ref<RouteInfo | undefined>();

const props = defineProps<{
	routeId: string;
	seat?: number;
	busNumber?: number;
	platform?: number;
	ticket: Ticket;
}>();

onMounted(async () => {
	route.value = await store.getRoute(props.routeId);
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
					date: '21.6.2025',
					time: '07-00',
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
					date: '21.6.2025',
					time: '07-00',
					seat: props.seat,
					platform: props.platform,
				}"
			/>
			<TicketCard
				title="KUPON"
				:ticket="{
					relation1: relation.coupon1,
					price: ticket.relations.length - 1 == i ? ticket.price.amount - 1 : 1,
					date: '21.6.2025',
					time: '07-00',
					seat: props.seat,
					platform: props.platform,
				}"
			/>
		</div>
	</div>
</template>
