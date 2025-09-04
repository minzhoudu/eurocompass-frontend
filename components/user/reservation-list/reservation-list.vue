<script setup lang="ts">
import type { AccordionItem } from "@nuxt/ui";

export type Seat = {
	busNumber: number;
	seat: number;
};

type UserReservation = {
	rideId: string;
	route: string;
	departure: string;
	seats: Seat[];
	expired: boolean;
};

const { data, refresh: refetchReservations, pending } = await useFetch<UserReservation[]>("/apis/users/reservations");

const reservations = computed<AccordionItem[]>(() => {
	if (!data.value) return [];

	return data.value.map((reservation) => {
		return {
			departure: reservation.departure,
			route: reservation.route,
			seats: reservation.seats,
			rideId: reservation.rideId,
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
				<template #default="{ item }: { item: AccordionItem }">
					<div class="flex gap-10">
						<span>{{ item.route.split(" ").join(" -> ") }}</span>
						<NuxtTime
							:datetime="item.departure"
							date-style="full"
							time-style="short"
							locale="sr-RS"
						/>
					</div>
				</template>

				<template #reservation-item="{ item }: { item: UserReservation }">
					<div class="grid grid-cols-2 gap-2">
						<UserReservationListItem
							v-for="seat in item.seats"
							:key="seat.seat"
							:ride-id="item.rideId"
							:seat="seat"
							:expired="item.expired"
							@cancel-reservation="refetchReservations"
						/>
					</div>
				</template>
			</UAccordion>
		</div>

		<div
			v-else-if="pending"
			class="flex flex-col gap-2"
		>
			<USkeleton

				class="h-12 w-full"
			/>
			<USkeleton

				class="h-12 w-full"
			/>
		</div>

		<div v-else>
			<p class="text-center text-2xl font-bold">
				Trenutno nemate rezervacija.
			</p>
		</div>
	</div>
</template>
