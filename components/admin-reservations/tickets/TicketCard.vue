<script setup lang="ts">
import TicketBox from "./TicketBox.vue";

export type TicketData = {
	relation1: string;
	date?: string;
	price: number | string;
	time?: string;
	seat?: number;
	platform?: number;
	note?: string;
};

defineProps<{
	title: string;
	ticket: TicketData;
	topRight?: string;
}>();
</script>

<template>
	<div class="flex-grow basis-1/2">
		<div class="flex w-full">
			<p class="flex-grow relacija">
				{{ title }}
			</p>
			<div class="ticket-box">
				{{ topRight }}
			</div>
		</div>

		<div class="flex gap-3 w-full">
			<div class="flex w-full flex-col">
				<p>Relacija:</p>
				<p class="w-full relacija">
					{{ ticket.relation1 }}
				</p>
			</div>
		</div>

		<div class="flex gap-3 w-full">
			<TicketBox
				label="Datum"
				:value="ticket.date ?? '21.6.2025'"
				class="flex-grow-3"
			/>
			<TicketBox
				label="Cena"
				:value="ticket.price"
				class="flex-grow-2"
			/>
		</div>

		<div class="flex gap-3 w-full">
			<TicketBox
				label="Vreme"
				:value="ticket.time ?? '07-00'"
				class="flex-grow-4"
			/>
			<TicketBox
				label="Sediste"
				:value="ticket.seat ?? 59"
				class="flex-grow-3"
			/>
			<TicketBox
				label="Peron"
				:value="ticket.platform ?? 8"
				class="flex-grow-3"
			/>
		</div>

		<h6 v-if="ticket.note">
			{{ ticket.note }}
		</h6>
	</div>
</template>

<style lang="css" scoped>
.relacija {
	font-weight: bold;
	text-align: center;
}
</style>
