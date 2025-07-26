<script setup lang="ts">
import type { BaseBusInfo } from "~/components/buses/types";

const props = defineProps<{
	buses: BaseBusInfo[];
	currentBus: ExtendedBus;
	rideId: string;
}>();

const selectedBus = ref<{ label: string; value: string }>({ label: props.currentBus.name, value: props.currentBus.busId ?? "" });

const emit = defineEmits<{
	(e: "bus-changed"): void;
}>();

const isLoading = ref(false);
const toast = useToast();

const changeBus = async () => {
	try {
		isLoading.value = true;
		await $fetch("/apis/rides/changeBus", {
			method: "post",
			body: {
				newBusId: selectedBus.value.value,
				oldBusId: props.currentBus.busId,
				rideId: props.rideId,
			},
		});

		toast.add({
			title: "Uspešno",
			description: "Autobus je uspešno promenjen",
			color: "success",
		});

		emit("bus-changed");
	}
	catch (error) {
		console.error(error);
		toast.add({
			title: "Greška",
			description: "Došlo je do greške pri promeni autobusa",
			color: "error",
		});
	}
	finally {
		isLoading.value = false;
	}
};
</script>

<template>
	<UModal
		title="Promena autobusa"
		description="Izaberite novi autobus za ovu liniju"
		:loading="isLoading"
	>
		<UButton
			size="xs"
			class="py-0.5 cursor-pointer text-white hover:text-success border"
			variant="solid"
			icon="tabler:switch-2"
		/>

		<template #body>
			<div class="flex gap-2 w-full">
				<USelectMenu
					v-model="selectedBus"
					:default-value="{ label: currentBus.name, value: currentBus.busId as string }"
					:items="buses.map((bus) => ({
						label: bus.name,
						value: bus.id,
					}))"
					placeholder="Izaberite autobus"
					class="w-full"
				/>

				<UButton
					size="xs"
					class="px-4 cursor-pointer text-white border"
					variant="solid"
					icon="tabler:switch-2"
					:loading="isLoading"
					:disabled="currentBus.busId === selectedBus.value"
					@click="changeBus"
				/>
			</div>
		</template>
	</UModal>
</template>
