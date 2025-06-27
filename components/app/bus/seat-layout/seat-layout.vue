<script setup lang="ts">
import { Icon } from "#components";
import type { ReservationSeatsRow, ReservationSlot } from "~/components/home/reservations/types";
import { isDisabled, isSelected } from "~/utils/bus/seat-layout";

const { rows, selectedSeats, maxSeatsReached } = defineProps<{
	rows: ReservationSeatsRow[];
	selectedSeats: number[];
	maxSeatsReached: boolean;
}>();

const emit = defineEmits<{
	"update:selectedSeats": [value: number[]];
}>();

const handleSelectSeat = (seat: ReservationSlot) => {
	if (seat.type !== "FREE") return;

	const index = selectedSeats.indexOf(seat.number);
	const newSelectedSeats = [...selectedSeats];

	if (index !== -1) {
		newSelectedSeats.splice(index, 1);
		emit("update:selectedSeats", newSelectedSeats);
		return;
	}

	newSelectedSeats.push(seat.number);
	emit("update:selectedSeats", newSelectedSeats);
};
</script>

<template>
	<div class="grid grid-cols-5 gap-2 gap-x-0 place-items-center max-w-64 mx-auto">
		<AppBusSeatLayoutDevider text="Gornji sprat" />

		<template
			v-for="(row, rowIndex) in rows"
			:key="rowIndex"
		>
			<div
				v-for="(seat, seatIndex) in row.reservationSlots"
				:key="seatIndex"
			>
				<div
					v-if="seat.type === 'FREE'"
					class="relative flex items-center justify-center"
				>
					<Icon
						name="ic:round-event-seat"
						class="cursor-pointer flex items-center justify-center w-12 h-12 rounded border sm:hover:bg-primary-300 transition-all duration-300"
						:class="{
							'bg-primary-300 scale-105': isSelected(seat, selectedSeats),
							'opacity-50 !cursor-not-allowed hover:!bg-current': isDisabled(seat, maxSeatsReached, selectedSeats) && !isSelected(seat, selectedSeats),
						}"
						@click="handleSelectSeat(seat)"
					/>

					<span class="absolute flex z-10 w-full h-full justify-center text-xs top-2 font-bold text-white pointer-events-none">{{ seat.number }}</span>
				</div>

				<UTooltip
					v-else-if="seat.type === 'OCCUPIED'"
					:text="seat.reservationData.name"
					:content="{ side: 'top' }"
					:delay-duration="0"
				>
					<div class="relative flex items-center justify-center">
						<Icon
							name="ic:round-event-seat"
							class="cursor-not-allowed flex items-center justify-center w-12 h-12 bg-red-300 rounded text-white scale-95"
						/>

						<span class="absolute flex z-10 w-full h-full justify-center text-xs top-2 font-bold text-white pointer-events-none">{{ seat.number }}</span>
					</div>
				</UTooltip>

				<div
					v-else-if="seat.type === 'STAIRS'"
					class="flex items-center justify-center w-12 h-12"
				>
					<Icon
						size="26"
						name="i-tabler:stairs-up"
						class="text-gray-700"
					/>
				</div>

				<div
					v-else-if="seat.type === 'NOT'"
					class="w-10 h-10 opacity-0"
				/>
			</div>

			<AppBusSeatLayoutDevider
				v-if="row.dividerText"
				:text="row.dividerText"
			/>
		</template>
	</div>
</template>
