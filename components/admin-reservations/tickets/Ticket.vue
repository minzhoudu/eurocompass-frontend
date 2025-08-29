<script setup lang="ts">
import TicketRow from "./TicketRow.vue";

export interface Ticket {
	id: string;
	name: string;
	price: number;
	relation1: string;
	relation2: string;
}

export interface RouteInfo {
	id: string;
	from: string;
	to: string;
	tickets: Ticket[];
}

const props = defineProps<{
	routeId?: string;
}>();

const { data: routes } = await useFetch<RouteInfo[]>("/apis/routes/info", {
	method: "GET",
	query: { id: props.routeId },
	onRequestError: (error) => {
		console.error({
			message: error.error.message,
			response: error.response,
			cause: error.error.cause,
		});
	},
	transform: (input: RouteInfo[]) => {
		if (!Array.isArray(input)) {
			return [input];
		}

		return input;
	},
});

const ticket = computed(() => {
	if (!routes.value) return null;

	return routes.value[0].tickets[0];
});
</script>

<template>
	<div
		v-if="ticket != null"
		style="width:750px"
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
					seat: 59,
					platform: 8,
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
					seat: 59,
					platform: 8,
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
					seat: 59,
					platform: 8,
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
					seat: 59,
					platform: 8,
				},
			}"
		/>
	</div>
</template>
