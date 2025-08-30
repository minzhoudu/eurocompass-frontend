<script setup lang="ts">
const { busNumber, seat, rideId } = defineProps<{
	busNumber: number;
	seat: number;
	rideId: string;
}>();

const toast = useToast();

const emit = defineEmits<{
	(e: "cancelReservation"): void;
}>();

const handleCancelReservation = async () => {
	try {
		await $fetch("/apis/users/cancelReservations", {
			method: "DELETE",
			body: {
				reservations: [
					{
						busNumber,
						seats: [seat],
					},
				],
				rideId,
			},
		});

		emit("cancelReservation");

		toast.add({
			title: "Rezervacija je uspešno otkazana!",
			description: `Uspešno ste otkazali rezervaciju na sedištu broj ${seat}`,
			color: "success",
		});
	}
	catch (error) {
		console.error(error);
		toast.add({
			title: "Greška prilikom otkazivanja rezervacije!",
			description: "Došlo je do greške prilikom otkazivanja vaše rezervacije, molimo pokušajte ponovo.",
			color: "error",
		});
	}
};
</script>

<template>
	<div class="bg-slate-200 p-4 rounded-lg text-primary font-bold">
		<p>Kola: <span class="bg-warning-300 px-2 py-1 rounded-md">{{ busNumber }}</span></p>
		<p>Sediste: <span class="bg-warning-300 px-2 py-1 rounded-md">{{ seat }}</span></p>

		<UModal
			title="Otkazivanje rezervacije"
			description=""
		>
			<UButton
				label="Otkaži rezervaciju"
				color="error"
				class="mt-4 cursor-pointer"
			/>

			<template #body>
				<p class="text-sm text-center">
					Da li ste sigurni da želite da otkažete rezervaciju za sedište broj <span class="font-bold">{{ seat }}</span>?
				</p>
			</template>

			<template #footer>
				<div class="flex w-full justify-end">
					<UButton
						label="Otkaži rezervaciju"
						color="error"
						class="cursor-pointer"
						@click="handleCancelReservation"
					/>
				</div>
			</template>
		</UModal>
	</div>
</template>
