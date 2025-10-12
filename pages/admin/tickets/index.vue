<script setup lang="ts">
import TicketPriceRow from "~/components/admin-tickets/ticket-price-row.vue";
import TicketCreateForm from "~/components/admin-tickets/ticket-create-form.vue";

const settingsStore = useSettingsStore();
</script>

<template>
	<div class="container mt-10">
		<div class="flex flex-col items-center justify-center">
			<TicketCreateForm />

			<UCard class="w-full max-w-2xl mb-3">
				<template #header>
					<div class="text-2xl font-bold text-center">
						Izmeni cene karata
					</div>
				</template>
				<TicketPriceRow
					v-for="ticket in settingsStore.ticketPrices"
					:key="ticket.id"
					:ticket="ticket"
				/>
			</UCard>
		</div>
	</div>
</template>
