<script setup lang="ts">
import type { DateValue } from "@internationalized/date";
import type { Location } from "../../home/header/types";

defineProps<{
	locations: Location[];
	error: boolean;
}>();

const selectedLocation = defineModel<Location | undefined>("selected-location");
const startDateValue = defineModel<DateValue>("selected-date");
</script>

<template>
	<div class="bg-warning-300 py-2 rounded-md flex justify-center sm:gap-5 w-full">
		<USelectMenu
			v-if="!error && locations?.length"
			v-model="selectedLocation"
			:items="locations ?? []"
			class="sm:min-w-48 py-2 text-sm"
			color="neutral"
			:filter-fields="['searchableName']"
		>
			<template #default="{ modelValue }">
				<HomeHeaderSelectedItem :item="modelValue" />
			</template>

			<template #item="{ item }">
				<HomeHeaderListItem :item="item" />
			</template>
		</USelectMenu>

		<AppDatePicker
			v-if="!error"
			v-model="startDateValue"
			placeholder="Datum polaska"
		/>

		<div v-if="error">
			<p class="text-red-500 font-bold">
				Dogodila se greška prilikom dobavljanja podataka. Pokušajte ponovno kasnije.
			</p>
		</div>
	</div>
</template>
