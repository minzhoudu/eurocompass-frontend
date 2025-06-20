<script setup lang="ts">
import { Icon } from "#components";
import type { ReservationSlot } from "~/mock/seats";

const { seats, selectedSeats } = defineProps<{
	seats: ReservationSlot[];
	selectedSeats: number[];
}>();

const emit = defineEmits<{
	"update:selectedSeats": [value: number[]];
}>();

const toast = useToast();

const MAX_SELECTED_SEATS = 2;

const handleClick = (seat: typeof seats[number]) => {
	if (seat.type !== "FREE") return;

	const index = selectedSeats.indexOf(seat.number);
	const newSelectedSeats = [...selectedSeats];

	if (index !== -1) {
		newSelectedSeats.splice(index, 1);
		emit("update:selectedSeats", newSelectedSeats);
		return;
	}
	if (selectedSeats.length >= MAX_SELECTED_SEATS) {
		toast.add({
			title: "Maksimalan broj rezervacija je 2",
			color: "error",
		});
		return;
	}

	newSelectedSeats.push(seat.number);
	emit("update:selectedSeats", newSelectedSeats);
};

const isSelected = (seat: ReservationSlot) => {
	if (seat.type !== "FREE") return false;

	return selectedSeats.includes(seat.number);
};

const isDisabled = (seat: ReservationSlot) => {
	if (seat.type !== "FREE") return true;

	return selectedSeats.length >= MAX_SELECTED_SEATS;
};
</script>

<template>
	<div class="grid grid-cols-5 gap-2 gap-x-0 place-items-center max-w-64 mx-auto">
		<template
			v-for="(seat, index) in seats"
			:key="index"
		>
			<div
				v-if="seat.type === 'FREE'"
				class="cursor-pointer flex items-center justify-center w-10 h-10 rounded border hover:bg-primary-300 transition-all duration-300"
				:class="{
					'bg-primary-300 scale-105': isSelected(seat),
					'opacity-50 !cursor-not-allowed hover:bg-white': isDisabled(seat) && !isSelected(seat),
				}"
				@click="handleClick(seat)"
			>
				{{ seat.number }}
			</div>

			<UTooltip
				v-else-if="seat.type === 'OCCUPIED'"
				:text="seat.reservationData.name"
				:content="{ side: 'top' }"
				:delay-duration="0"
			>
				<div
					class="cursor-not-allowed flex items-center justify-center w-10 h-10 bg-red-300 rounded text-white scale-95"
					:title="seat.reservationData?.name"
				>
					{{ seat.number }}
				</div>
			</UTooltip>

			<div
				v-else-if="seat.type === 'STAIRS'"
				class="flex items-center justify-center w-10 h-10 rounded"
			>
				<Icon
					name="i-tabler:stairs-up"
					class="text-gray-700"
				/>
			</div>

			<div
				v-else-if="seat.type === 'NOT'"
				class="w-10 h-10 opacity-0"
			/>
		</template>
	</div>
</template>
