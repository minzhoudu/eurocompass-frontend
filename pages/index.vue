<script setup lang="ts">
import type { DateValue } from "@internationalized/date";
import type { Location } from "~/components/home/header/types";

useHead({
	titleTemplate: (titleChunk) => {
		return titleChunk ? `${titleChunk} - Rezervacija karte` : "Rezervacija karte";
	},
});

const selectedDate = ref<DateValue>();
const selectedLocation = ref<Location>();

const handleDateSelected = (date?: DateValue, location?: Location) => {
	selectedDate.value = date;
	selectedLocation.value = location;
};
</script>

<template>
	<div class="container mt-10 flex flex-col gap-10">
		<HomeHeader @date-selected="handleDateSelected" />

		<HomeReservations
			v-if="selectedDate && selectedLocation"
			:selected-date="selectedDate"
			:selected-location="selectedLocation"
		/>
	</div>
</template>
