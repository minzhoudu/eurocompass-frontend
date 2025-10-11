<script setup lang="ts">
import type { Seat } from "../reservation-list.vue";

const { seat, rideId, expired } = defineProps<{
	seat: Seat;
	rideId: string;
	expired: boolean;
}>();

const toast = useToast();

const emit = defineEmits<{
	(e: "cancelReservation"): void;
}>();

const { apiFetch } = useApiFetch();

const handleCancelReservation = async () => {
	if (expired) return;

	try {
		await apiFetch("/users/cancelReservations", {
			method: "DELETE",
			body: {
				reservations: [
					{
						busNumber: seat.busNumber,
						seats: [seat.seat],
					},
				],
				rideId,
			},
		});

		emit("cancelReservation");

		toast.add({
			title: "Rezervacija je uspešno otkazana!",
			description: `Uspešno ste otkazali rezervaciju na sedištu broj ${seat.seat}`,
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
		<div class="flex flex-col gap-2">
			<p>Kola: <span class="bg-warning-300 px-2 py-1 rounded-md">{{ seat.busNumber }}</span></p>
			<p>
				Peron: <span class="bg-warning-300 px-2 py-1 rounded-md">{{ !seat.platform ? "Proverite kasnije"
					: seat.platform }}</span>
			</p>
			<p>Sedište: <span class="bg-warning-300 px-2 py-1 rounded-md">{{ seat.seat }}</span></p>
		</div>

		<UModal
			v-if="!expired"
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
					Da li ste sigurni da želite da otkažete rezervaciju za sedište broj
					<span class="font-bold">{{ seat.seat }}</span>
					?
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
