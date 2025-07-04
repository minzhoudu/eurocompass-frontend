<script setup lang="ts">
import { type SeatRow, Type } from "../types";
import { handleUpdateDivider } from "~/utils/bus/seat-layout";

defineProps<{
	rows: SeatRow[];
	totalRows: number;
	isLastRowDivider: boolean;
	isFirstRowDivider: boolean;
}>();

const emit = defineEmits<{
	(e: "update:type", type: Type, rowIndex: number, seatIndex: number): void;
	(e: "update:divider", text: string): void;
	(e: "update:total-rows"): void;
	(e: "delete:divider", dividerIndex: number): void;
}>();
</script>

<template>
	<div class="grid grid-cols-5 gap-2 gap-x-0 place-items-center max-w-64 mx-auto">
		<div
			v-if="!isFirstRowDivider"
			class="col-span-5 flex items-center justify-center"
		>
			<BusesSeatLayoutDividerModal @update:divider="(text) => { handleUpdateDivider(rows, text, { firstRow: true }); emit('update:total-rows') }" />
		</div>

		<template
			v-for="(row, rowIndex) in rows"
			:key="rowIndex"
		>
			<div
				v-for="(seat, seatIndex) in row.slots"
				:key="`${rowIndex}-${seatIndex}-${seat.type}`"
			>
				<UPopover
					:content="{ side: 'top' }"
					:arrow="true"
				>
					<div
						v-if="seat.type === 'FREE'"
						class="relative flex items-center justify-center"
					>
						<Icon
							name="ic:round-event-seat"
							class="cursor-pointer flex items-center justify-center w-12 h-12 rounded border sm:hover:bg-primary/70 transition-all duration-300"
						/>

						<span
							v-if="seat.number"
							class="absolute flex z-10 w-full h-full justify-center text-xs top-2 font-bold text-white pointer-events-none"
						>
							{{ seat.number }}
						</span>
					</div>

					<div
						v-else-if="seat.type === 'STAIRS'"
						class="flex items-center justify-center w-12 h-12 cursor-pointer"
					>
						<Icon
							size="26"
							name="i-tabler:stairs"
							class="text-gray-700 transition-all duration-300 sm:hover:text-primary/70 hover:scale-110"
						/>
					</div>

					<div
						v-else-if="seat.type === 'NOT'"
						class="w-10 h-10 cursor-pointer transition-all duration-300 hover:bg-primary/70 rounded border border-dashed border-gray-400 bg-gray-100"
					/>

					<template #content>
						<div class="flex gap-2 bg-white px-4 py-2 shadow-xl rounded-lg border">
							<UButton
								icon="ic:round-event-seat"
								class="cursor-pointer bg-white text-black border outline-none"
								:class="{ 'bg-primary text-white': seat.type === 'FREE' }"
								@click="emit('update:type', Type.FREE, rowIndex, seatIndex)"
							/>

							<UButton
								icon="tabler:stairs"
								class="cursor-pointer bg-white text-black border outline-none"
								:class="{ 'bg-primary text-white': seat.type === 'STAIRS' }"
								@click="emit('update:type', Type.STAIRS, rowIndex, seatIndex)"
							/>

							<UButton
								icon="tabler:arrow-autofit-width"
								class="cursor-pointer bg-white text-black border outline-none"
								:class="{ 'bg-primary text-white': seat.type === 'NOT' }"
								@click="emit('update:type', Type.NOT, rowIndex, seatIndex)"
							/>
						</div>
					</template>
				</UPopover>
			</div>

			<AppBusSeatLayoutDivider
				v-if="row.dividerText"
				:text="row.dividerText"
				:divider-index="rowIndex"
				@delete:divider="emit('delete:divider', rowIndex)"
			/>
		</template>

		<div
			v-if="!isLastRowDivider"
			class="col-span-5 flex items-center justify-center"
		>
			<BusesSeatLayoutDividerModal @update:divider="(text) => { handleUpdateDivider(rows, text); emit('update:total-rows') }" />
		</div>
	</div>
</template>
