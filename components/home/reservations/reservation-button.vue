<script setup lang="ts">
import { mockSeats } from "@/mock/seats";

const props = defineProps<{
	label: string;
	reservationId: number;
}>();

const handleSeatChange = (seats: number[]) => {
	console.log({ reservationId: props.reservationId, seats: toRaw(seats) });
};

const rows = Math.ceil(mockSeats.length / 4);
const reservedSeats = mockSeats.filter(seat => seat.type === "OCCUPIED").map(seat => seat.number);
const stairs = mockSeats.filter(seat => seat.type === "STAIRS").map(seat => seat.number);
</script>

<template>
	<UModal
		title="Rezervacija"
		description="Izaberite svoje sedište"
	>
		<UButton
			:label="label"
			variant="solid"
			color="neutral"
			size="sm"
			class="py-2 cursor-pointer"
			icon="lucide:ticket"
		/>

		<template #body>
			<div>
				<AppBusSeatLayout
					:seats="mockSeats"
					:rows="rows"
					:seats-per-row="4"
					:reserved-seats="reservedSeats"
					:stairs="stairs"
					@update:selected-seats="handleSeatChange"
				/>
			</div>
		</template>

		<template
			#footer
		>
			<div class="flex gap-2 w-full justify-end">
				<UButton
					label="Odustani"
					variant="outline"
					color="error"
				/>
				<UButton
					label="Rezerviši"
				/>
			</div>
		</template>
	</UModal>
</template>
