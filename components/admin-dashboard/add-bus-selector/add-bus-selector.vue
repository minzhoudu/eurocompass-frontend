<script setup lang="ts">
import type { BaseBusInfo } from "~/components/buses/types";

const props = defineProps<{
	buses: BaseBusInfo[];
	selectedBuses: ExtendedBus[];
	busesLoading: boolean;
	rideId: string;
}>();

const busItems = computed(() => {
	return props.buses
		.filter(bus => !props.selectedBuses.some(selBus => selBus.busId === bus.id))
		.map(bus => ({
			label: bus.name,
			value: bus.id,
		}));
});

const selectedBus = ref<{ label: string; value: string }>();
const loadingAddBus = ref(false);

const toast = useToast();

const emit = defineEmits<{
	(e: "busAdded"): void;
}>();

const handleAddBus = async () => {
	try {
		loadingAddBus.value = true;
		await $fetch("/apis/rides/addBus", {
			method: "post",
			body: {
				rideId: props.rideId,
				busId: selectedBus.value?.value,
			},
		});

		toast.add({
			title: "Autobus je uspešno dodan",
			color: "success",
		});

		emit("busAdded");
	}
	catch (error) {
		loadingAddBus.value = false;

		console.error(error);

		toast.add({
			title: "Greška prilikom dodavanja autobusa",
			color: "error",
		});
	}
};
</script>

<template>
	<div class="flex gap-2 w-full items-center justify-between">
		<USelectMenu
			v-model="selectedBus"
			:items="busItems"
			label="Broj autobusa"
			placeholder="Dodaj novi autobus"
			class="w-full"
			:loading="busesLoading"
		/>

		<UButton
			:disabled="!selectedBus"
			:loading="loadingAddBus"
			@click="handleAddBus"
		>
			Dodaj
		</UButton>
	</div>
</template>
