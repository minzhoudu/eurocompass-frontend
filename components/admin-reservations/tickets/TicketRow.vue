<template>
	<div class="flex gap-15">
		<TicketCard :title="left.title" :ticket="left.ticket" :topRight="left.topRight" />
		<TicketCard :title="right.title" :ticket="right.ticket" :topRight="right.topRight" />
	</div>
</template>

<script setup lang="ts">
import TicketCard from './TicketCard.vue';

interface TicketRowItem {
	title: string;
	ticket: any;
	topRight?: string;
}

defineProps<{
	left: TicketRowItem;
	right: TicketRowItem;
}>();
</script>
