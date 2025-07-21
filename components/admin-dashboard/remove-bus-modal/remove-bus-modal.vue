<script setup lang="ts">
const props = defineProps<{ busId: string; rideId: string }>();

const isLoading = ref(false);

const toast = useToast();

const emit = defineEmits<{
	(e: "bus-removed"): void;
}>();

const removeBusFromRide = async () => {
	isLoading.value = true;

	try {
		await $fetch("/apis/rides/cancelBus", {
			method: "post",
			body: {
				busId: props.busId,
				rideId: props.rideId,
			},
		});

		toast.add({
			title: "Uspešno",
			description: "Autobus je uspešno obrisan sa vožnje",
			color: "success",
		});

		emit("bus-removed");
	}
	catch (error) {
		console.error(error);

		toast.add({
			title: "Greška",
			description: "Došlo je do greške pri brisanju autobusa sa vožnje",
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
		title="Brisanje autobusa"
		description="Da li ste sigurni da želite da obrišete ovaj autobus? Sve rezervacije za ovaj autobus na ovoj vožnji će biti obrisane."
		:ui="{
			body: 'p-2 sm:p-3',
		}"
	>
		<UButton
			size="xs"
			class="py-0.5 cursor-pointer text-white hover:text-error border"
			variant="solid"
			icon="material-symbols:delete-outline"
		/>

		<template #body>
			<div class="flex justify-end">
				<UButton
					label="Potvrdi"
					size="xs"
					class="py-2 px-4 cursor-pointer"
					color="error"
					variant="solid"
					icon="tabler:trash"
					:loading="isLoading"
					@click="removeBusFromRide"
				/>
			</div>
		</template>
	</UModal>
</template>
