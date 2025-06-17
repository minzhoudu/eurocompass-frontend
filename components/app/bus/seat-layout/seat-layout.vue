<script setup lang="ts">
import { ref, computed } from "vue";
import type { ReservationSlot } from "@/mock/seats";

const props = defineProps<{
	seats: ReservationSlot[];
	rows?: number;
	seatsPerRow?: number;
	reservedSeats?: number[];
	stairs?: number[];
}>();

const toast = useToast();

const emit = defineEmits<{
	(e: "update:selectedSeats", val: number[]): void;
}>();

const MAX_SELECTED_SEATS = 2;

const rows = props.rows ?? 10;
const seatsPerRow = props.seatsPerRow ?? 4;
const reservedSeats = props.reservedSeats ?? [];
const stairs = props.stairs ?? [];

const selectedSeats = ref<number[]>([]);

function toggleSeat(seatNumber?: number) {
	if (!seatNumber) return;

	if (reservedSeats.includes(seatNumber)) return;

	if (selectedSeats.value.includes(seatNumber)) {
		selectedSeats.value = selectedSeats.value.filter(s => s !== seatNumber);
		return;
	}

	if (selectedSeats.value.length >= MAX_SELECTED_SEATS) {
		toast.add({
			title: `Maksimalan broj rezervisanih sedišta je ${MAX_SELECTED_SEATS}`,
			color: "error",
		});
		return;
	}

	selectedSeats.value.push(seatNumber);
	emit("update:selectedSeats", selectedSeats.value);
}

const seatLayout = computed(() => {
	const layout = [];
	let seatNumber = 1;
	let seatIndex = 1;

	for (let i = 0; i < rows; i++) {
		const row = [];

		for (let j = 0; j < seatsPerRow; j++) {
			if (stairs.includes(seatIndex)) {
				row.push({
					type: "stairs",
					index: seatIndex,
				});
			}
			else {
				row.push({
					type: "seat",
					number: seatNumber,
					isReserved: reservedSeats.includes(seatNumber),
					isSelected: selectedSeats.value.includes(seatNumber),
					index: seatIndex,
				});
				seatNumber++;
			}
			seatIndex++;
		}
		layout.push(row);
	}

	return layout;
});

const getSeatLabel = (seatNumber?: number) => {
	const seat = props.seats.find(seat => seat.number === seatNumber);

	if (seat?.reservationData) {
		return seat.reservationData.name;
	}

	return seatNumber?.toString() ?? "";
};
</script>

<template>
	<div class="flex flex-col items-center gap-2">
		<div
			v-for="(row, rowIndex) in seatLayout"
			:key="rowIndex"
			class="flex gap-4"
		>
			<template
				v-for="seat in row"
				:key="seat.index"
			>
				<div
					v-if="seat.type === 'stairs'"
					class="w-10 h-10 flex items-center justify-center text-xl text-gray-400"
				>
					<Icon name="tabler:stairs-up" />
				</div>

				<UTooltip
					v-else
					:text="getSeatLabel(seat.number)"
					:content="{ side: 'top' }"
					:disabled="!seat.isReserved"
				>
					<button
						:disabled="seat.isReserved"
						class="w-10 h-10 rounded text-sm font-medium transition-all duration-200 cursor-pointer"
						:class="{
							'bg-error/70 text-white !cursor-not-allowed scale-95': seat.isReserved,
							'bg-green-500 text-white scale-105': seat.isSelected,
							'bg-white border border-gray-500 hover:bg-blue-100': !seat.isReserved && !seat.isSelected,
							'!cursor-not-allowed': selectedSeats.length >= MAX_SELECTED_SEATS && !seat.isSelected,
						}"
						@click="toggleSeat(seat.number)"
					>
						{{ seat.number }}
					</button>
				</UTooltip>
			</template>
		</div>
	</div>
</template>
