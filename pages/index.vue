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
			<!-- TODO REMOVE THIS ONCE THE SITE IS LIVE  -->
			<UAlert
				title="VAŽNO OBAVEŠTENJE: OVAJ SAJT JE TRENUTNO U IZRADI I NIJE ZA UPOTREBU, MOLIMO KORISTITE STARI SAJT"
				description="Vaše rezervacije na ovom sajtu neće biti važeće dok novi sajt ne bude završen. (sve dok je ova poruka prisutna, sajt je u izradi)"
				:actions="[{ label: '>>> Idi na stari sajt <<<', class: 'cursor-pointer h-10 mx-auto text-xl flex px-6 bg-white text-black border border-black hover:text-white hover:bg-black', to: 'https://eurocompass.site' }]"
				class="mx-auto text-center"
				:ui="{ title: 'text-2xl font-bold tracking-wider', description: 'text-lg' }"
				color="error"
			/>

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
