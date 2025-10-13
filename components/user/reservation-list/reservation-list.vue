<script setup lang="ts">
import type { AccordionItem } from "@nuxt/ui";

export type Seat = {
	busNumber: number;
	seat: number;
	platform: number | undefined;
};

type UserReservation = {
	rideId: string;
	route: string;
	departure: string;
	seats: Seat[];
	expired: boolean;
};

const { data, refresh: refetchReservations, pending } = await useFetchCustom<UserReservation[]>("	/users/reservations", {
	transform: (data) => {
		data.sort(
			(d1, d2) =>
				new Date(d2.departure).getTime() - new Date(d1.departure).getTime(),
		);

		return data;
	},
});

const reservations = computed<AccordionItem[]>(() => {
	if (!data.value) return [];

	return data.value.map((reservation) => {
		return {
			departure: reservation.departure,
			route: reservation.route,
			seats: reservation.seats,
			rideId: reservation.rideId,
			expired: reservation.expired,
			slot: "reservation-item",
			icon: "i-heroicons-ticket-solid",
		};
	});
});

const accordionRef = ref<HTMLElement>();
const showBottomArrow = ref(false);

const checkScroll = () => {
	if (accordionRef.value) {
		const { scrollTop, scrollHeight, clientHeight } = accordionRef.value;
		showBottomArrow.value = scrollTop + clientHeight < scrollHeight - 20;
	}
};

const scrollToBottom = () => {
	if (accordionRef.value) {
		accordionRef.value.scrollTo({
			top: accordionRef.value.scrollHeight,
			behavior: "smooth",
		});
		setTimeout(checkScroll, 500);
	}
};

watch(accordionRef, (newRef, oldRef) => {
	if (oldRef) {
		oldRef.removeEventListener("scroll", checkScroll);
	}

	if (newRef) {
		newRef.addEventListener("scroll", checkScroll);
		checkScroll();
	}
}, { immediate: true });

onUnmounted(() => {
	if (accordionRef.value) {
		accordionRef.value.removeEventListener("scroll", checkScroll);
	}
});

watch(reservations, () => {
	nextTick(() => checkScroll());
}, { deep: true });
</script>

<template>
	<div class="mt-10 px-4 lg:w-1/2 mx-auto">
		<div
			v-if="reservations.length > 0"
			class="relative"
		>
			<div
				ref="accordionRef"
				class="max-h-[500px] overflow-auto"
			>
				<UAccordion
					type="multiple"
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
								locale="sr-Latn-RS"
							/>
						</div>
					</template>

					<template #reservation-item="{ item }: { item: UserReservation }">
						<div class="grid grid-cols-1 md:grid-cols-2 gap-2">
							<UserReservationListItem
								v-for="seat in item.seats"
								:key="seat.seat"
								:ride-id="item.rideId"
								:seat="seat"
								:expired="!!item.expired"
								@cancel-reservation="refetchReservations"
							/>
						</div>
					</template>
				</UAccordion>
			</div>

			<!-- Bottom scroll indicator -->

			<div
				v-if="showBottomArrow"
				class="absolute bottom-0 left-1/2 flex justify-center items-center transform -translate-x-1/2 translate-y-16 bg-white dark:bg-gray-900 rounded-full p-2 shadow-lg border border-gray-200 dark:border-gray-700 cursor-pointer hover:scale-110 transition-transform duration-200"
				@click="scrollToBottom"
			>
				<UIcon
					name="i-heroicons-chevron-down"
					class="w-5 h-5 text-gray-600 dark:text-gray-400"
				/>
			</div>
		</div>

		<div
			v-else-if="pending"
			class="flex flex-col gap-2"
		>
			<USkeleton class="h-12 w-full" />
			<USkeleton class="h-12 w-full" />
		</div>

		<div v-else>
			<p class="text-center text-2xl font-bold">
				Trenutno nemate rezervacija.
			</p>
		</div>
	</div>
</template>
