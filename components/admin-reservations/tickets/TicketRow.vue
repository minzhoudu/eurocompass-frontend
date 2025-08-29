<template>
	<div class="flex gap-15">
		<TicketCard
			:title="left.title"
			:ticket="left.ticket"
			:top-right="left.topRight"
		/>
		<TicketCard
			:title="right.title"
			:ticket="right.ticket"
			:top-right="right.topRight"
		/>
	</div>
</template>

<script setup lang="ts">
import TicketCard, { type TicketData } from "./TicketCard.vue";

// TODO Fix the any type for the tickets
interface TicketRowItem {
	title: string;
	ticket: TicketData;
	topRight?: string;
}

defineProps<{
	left: TicketRowItem;
	right: TicketRowItem;
}>();
</script>
