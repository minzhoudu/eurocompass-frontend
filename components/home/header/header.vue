<script setup lang="ts">
import type { DateValue } from "@internationalized/date";
import type { Location } from "./types";

const startValue = ref<DateValue>();

const { data: locations, error } = await useFetch<Location[]>("/apis/routes", {
	onRequestError: (error) => {
		console.error({
			message: error.error.message,
			response: error.response,
			cause: error.error.cause,
		});
	},
});

const selectedLocation = ref<Location | undefined>(locations.value?.[0]);

const emit = defineEmits<{
	(e: "data-selected", date?: DateValue, location?: Location): void;
}>();
</script>

<template>
	<div class="flex flex-col md:flex-row justify-center items-center gap-5 bg-warning-300 p-4 lg:rounded-xl">
		<USelectMenu
			v-if="!error"
			v-model="selectedLocation"
			:items="locations ?? []"
			class="min-w-48 py-2"
			color="neutral"
			:filter-fields="['name']"
			@update:model-value="emit('data-selected', startValue, $event)"
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
			v-model="startValue"
			placeholder="Datum polaska"
			@update:model-value="emit('data-selected', $event, selectedLocation)"
		/>

		<div v-if="error">
			<p class="text-red-500 font-bold">
				Dogodila se greška prilikom dobavljanja podataka. Pokušajte ponovno kasnije.
			</p>
		</div>
	</div>
</template>
