<script setup lang="ts">
import type { AccordionItem } from "@nuxt/ui";

const authStore = useAuthStore();

const reservations = computed<AccordionItem[]>(() => {
	if (!authStore.user?.reservations) return [];

	return authStore.user?.reservations?.map((reservation) => {
		return {
			label: `Bus ${reservation.busNumber} - Seat ${reservation.seat}`,
			busNumber: reservation.busNumber,
			seat: reservation.seat,
			content: "You have nothing to do, @nuxt/icon will handle it automatically.",
			slot: "reservation-item",
			icon: "i-heroicons-ticket-solid",
		};
	});
});
</script>

<template>
	<div class="mt-10 px-4 lg:w-1/2 mx-auto">
		<div v-if="reservations.length > 0">
			<UAccordion
				:ui="{
					label: 'text-xl',
				}"
				:items="reservations"
			>
				<template #reservation-item="{ item }: { item: AccordionItem }">
					<UserReservationListItem
						:bus-number="item.busNumber"
						:seat="item.seat"
					/>
				</template>
			</UAccordion>
		</div>

		<div v-else>
			<p class="text-center text-2xl font-bold">
				Trenutno nemate rezervacija.
			</p>
		</div>
	</div>
</template>
