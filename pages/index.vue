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
		<HomeHeader @data-selected="handleDateSelected" />

		<Transition>
			<HomeReservations
				v-if="selectedDate && selectedLocation"
				:key="`${selectedDate?.toString()}-${selectedLocation?.id}`"
				:selected-date="selectedDate"
				:selected-location="selectedLocation"
			/>
		</Transition>
	</div>
</template>

<style scoped>
.v-enter-active {
	transition: opacity 0.5s ease;
	transition-delay: 0.5s;
}
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
