<script setup lang="ts">
import type { Ride } from "./types";

defineProps<{
	label: string;
	ride: Ride;
}>();

const isModalOpen = ref(false);
const selectedSeats = ref<number[]>([]);

const selectedBus = ref(0);

const handleCancel = () => {
	isModalOpen.value = false;
	selectedSeats.value = [];
};
</script>

<template>
	<UModal
		v-model:open="isModalOpen"
		title="Rezervacija"
		description="Izaberite svoje sedište"
	>
		<UButton
			:label="label"
			variant="solid"
			color="neutral"
			size="sm"
			class="md:py-2 cursor-pointer"
			icon="lucide:ticket"
		/>

		<template #body>
			<div>
				<AppBusSeatLayout
					v-model:selected-seats="selectedSeats"
					:seats="ride.buses[selectedBus].reservationSlots"
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
					class="cursor-pointer"
					@click="handleCancel"
				/>
				<UButton
					label="Rezerviši"
					class="cursor-pointer"
					:disabled="selectedSeats.length === 0"
				/>
			</div>
		</template>
	</UModal>
</template>
