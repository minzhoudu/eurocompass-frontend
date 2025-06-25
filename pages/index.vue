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
	<div class="flex flex-col gap-10">
		<div class="container mt-10 flex flex-col gap-10">
			<HomeHeader @data-selected="handleDateSelected" />

			<Transition>
				<HomeReservations
					v-if="selectedDate && selectedLocation"
					:selected-date="selectedDate"
					:selected-location="selectedLocation"
				/>
			</Transition>
		</div>

		<HomeHero />
	</div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease-out;
  overflow: hidden;
}

.v-enter-active {
  transition-delay: 0.5s;
}

.v-leave-active {
  transition-timing-function: ease-in;
}

.v-enter-from,
.v-leave-to {
  height: 0;
  opacity: 0;
  transform: translateY(-10px);
}
</style>
