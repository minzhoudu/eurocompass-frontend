<script setup lang="ts">
import { getLocalTimeZone, type DateValue } from "@internationalized/date";

const startValue = ref<DateValue>();

const startLocations = ref([{ from: "Krusevac", to: "Beograd", search: "Krusevac Beograd" }, { from: "Krusevac", to: "Novi Sad", search: "Krusevac Novi Sad" }, { from: "Beograd", to: "Krusevac", search: "Beograd Krusevac" }]);
const startLocation = ref({ from: "Krusevac", to: "Beograd", search: "Krusevac Beograd" });

const { currentDate } = useCurrentDate();

const isStartDateUnavailable = (date: DateValue) => {
	return date.toDate(getLocalTimeZone()) < currentDate.value.toDate(getLocalTimeZone());
};
</script>

<template>
	<div class="flex flex-col md:flex-row justify-center items-center gap-5 bg-warning-300 p-4 lg:rounded-xl">
		<USelectMenu
			v-model="startLocation"
			:items="startLocations"
			class="min-w-48 py-2"
			color="neutral"
			:filter-fields="['search']"
		>
			<template #default="{ modelValue }">
				<p class="font-bold">
					{{ modelValue?.from }}
				</p>

				<Icon
					name="i-lucide:arrow-right"
					size="14"
					class="font-bold"
				/>

				<p class="font-bold">
					{{ modelValue?.to }}
				</p>
			</template>

			<template #item="{ item }">
				<div class="flex items-center gap-2">
					{{ item.from }}
					<Icon
						name="i-lucide:arrow-right"
						size="14"
					/>
					{{ item.to }}
				</div>
			</template>
		</USelectMenu>

		<AppDatePicker
			v-model="startValue"
			:is-date-unavailable="isStartDateUnavailable"
			placeholder="Datum polaska"
		/>
	</div>
</template>
