<script lang="ts" setup>
import { ReservationSeatsType } from "~/components/home/reservations/types";
import type { ExtendedBus } from "~/composables/useAdminDashboardTreeView";

defineProps<{
	bus: ExtendedBus;
}>();

const route = useRoute();

console.log(route.params.busId);
console.log(route.params.rideId);

const handlePrintLayout = () => {
	window.print();
};
</script>

<template>
	<div class="flex flex-col gap-y-3">
		<div
			v-for="(row, index) in bus.reservationSeatsRows"
			:key="index"
		>
			<div class="grid grid-cols-5 place-items-center">
				<div
					v-for="(slot, slotIndex) in row.reservationSlots"
					:key="slotIndex"
					class="flex flex-col"
				>
					<div
						v-if="slot.type === ReservationSeatsType.FREE"
						class="bg-primary p-2 font-bold text-white text-center w-30 h-20 rounded-md flex items-center justify-center"
					>
						{{ slot.number }}
					</div>

					<div
						v-if="slot.type === ReservationSeatsType.OCCUPIED"
						class="bg-primary p-2 text-center w-30 h-20 rounded-md flex flex-col items-center justify-center"
					>
						<span class="text-white font-bold">{{ slot.number }}</span>
						<div class="flex flex-col bg-white px-2 rounded-md text-sm">
							<span>{{ slot.reservationData?.name }}</span>
							<span>{{ slot.reservationData?.lastName }}</span>
						</div>
					</div>

					<div
						v-if="slot.type === ReservationSeatsType.STAIRS"
						class="bg-primary p-2 text-center w-30 h-20 rounded-md flex flex-col items-center justify-center"
					>
						<span class="text-white">
							<Icon
								name="mdi:stairs"
								class="text-white"
								size="40"
							/>
						</span>
					</div>
				</div>
			</div>
		</div>

		<UButton
			class="flex justify-center self-center px-10 mt-10 cursor-pointer"
			size="xl"
			@click="handlePrintLayout"
		>
			Print
		</UButton>
	</div>
</template>

<style>
@media print {
	button {
		display: none;
	}

    * {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
}
</style>
