<script setup lang="ts">
import TicketRow from "./TicketRow.vue";
import { useTicketsStore, type RouteInfo } from "~/stores/tickets";

const store = useTicketsStore();
const route = ref<RouteInfo | undefined>();

const props = defineProps<{
	routeId: string;
	seat?: number;
	busNumber?: number;
	platform?: number;
}>();

const ticket = computed(() => {
	if (!route.value) return null;
	return route.value.tickets[0];
});

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
		<TicketRow
			:left="{
				title: 'AUTOBUSKA KARTA',
				ticket: {
					relation1: ticket.relation1,
					price: 1,
					date: '21.6.2025',
					time: '07-00',
					seat: props.seat,
					platform: props.platform,
					note: 'U cenu karte je uracunat osvezavajuci napitak',
				},
			}"
			:right="{
				title: 'KUPON',
				ticket: {
					relation1: ticket.relation1,
					price: 1,
					date: '21.6.2025',
					time: '07-00',
					seat: props.seat,
					platform: props.platform,
				},
			}"
		/>

		<TicketRow
			:left="{
				title: 'AUTOBUSKA KARTA',
				ticket: {
					relation1: ticket.relation2,
					price: ticket.price - 1,
					date: '21.6.2025',
					time: '07-00',
					seat: props.seat,
					platform: props.platform,
					note: 'U cenu karte je uracunat osvezavajuci napitak',
				},
			}"
			:right="{
				title: 'KUPON',
				ticket: {
					relation1: ticket.relation2,
					price: ticket.price - 1,
					date: '21.6.2025',
					time: '07-00',
					seat: props.seat,
					platform: props.platform,
				},
			}"
		/>
	</div>
</template>
