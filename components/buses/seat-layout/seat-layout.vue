<script setup lang="ts">
import type { SeatRow } from "../types";

defineProps<{
	rows: SeatRow[];
}>();

const editingSeat = ref();

const removeEditingSeat = (isOpen: boolean) => {
	if (!isOpen) {
		editingSeat.value = null;
	}
};
</script>

<template>
	<div class="grid grid-cols-5 gap-2 gap-x-0 place-items-center max-w-64 mx-auto">
		<template
			v-for="(row, rowIndex) in rows"
			:key="rowIndex"
		>
			<div
				v-for="(seat, seatIndex) in row.slots"
				:key="seatIndex"
			>
				<UPopover
					:content="{ side: 'top' }"
					:arrow="true"
					@update:open="removeEditingSeat"
				>
					<div
						v-if="seat.type === 'FREE'"
						class="relative flex items-center justify-center"
						@click="editingSeat = seat.number"
					>
						<Icon
							name="ic:round-event-seat"
							class="cursor-pointer flex items-center justify-center w-12 h-12 rounded border sm:hover:bg-primary/70 transition-all duration-300"
							:class="{ 'bg-primary/70': editingSeat === seat.number }"
						/>

						<span class="absolute flex z-10 w-full h-full justify-center text-xs top-2 font-bold text-white pointer-events-none">{{ seat.number }}</span>
					</div>

					<div
						v-else-if="seat.type === 'STAIRS'"
						class="flex items-center justify-center w-12 h-12 cursor-pointer"
						@click="editingSeat = null"
					>
						<Icon
							size="26"
							name="i-tabler:stairs"
							class="text-gray-700 transition-all duration-300 sm:hover:text-primary/70 hover:scale-110"
						/>
					</div>

					<div
						v-else-if="seat.type === 'NOT'"
						class="w-10 h-10 cursor-pointer transition-all duration-300 hover:bg-primary/70 rounded border"
						@click="editingSeat = null"
					/>

					<template #content>
						<div class="flex gap-2 bg-white px-4 py-2 shadow-xl rounded-lg border">
							<UButton
								icon="ic:round-event-seat"
								class="cursor-pointer outline-none"
							/>

							<UButton
								icon="tabler:stairs"
								class="cursor-pointer"
							/>

							<UButton
								icon="tabler:arrow-autofit-width"
								class="cursor-pointer"
							/>
						</div>
					</template>
				</UPopover>
			</div>

			<AppBusSeatLayoutDevider
				v-if="row.dividerText"
				:text="row.dividerText"
			/>
		</template>
	</div>
</template>
