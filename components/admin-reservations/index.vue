<script setup lang="ts">
import type { DateValue } from "@internationalized/date";
import type { Location } from "../home/header/types";

const { data: locations, error } = await useFetch<Location[]>("/apis/routes", {
	onRequestError: (error) => {
		console.error({
			message: error.error.message,
			response: error.response,
			cause: error.error.cause,
		});
	},
});

const selectedDate = ref<DateValue>();
const selectedLocation = ref<Location | undefined>();

watchEffect(() => {
	if (locations.value?.length) {
		selectedLocation.value = locations.value[0];
	}
});
</script>

<template>
	<div class="flex flex-col gap-5 ">
		<h1 class="text-2xl font-bold text-center mb-5">
			Admin Rezervacije
		</h1>

		<AdminReservationsHeader
			v-model:selected-location="selectedLocation"
			v-model:selected-date="selectedDate"
			:locations="locations ?? []"
			:error="!!error"
		/>

		<Transition>
			<AdminReservationsTable
				v-if="selectedDate && selectedLocation"
				:selected-date="selectedDate"
				:selected-location="selectedLocation"
			/>
		</Transition>
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
