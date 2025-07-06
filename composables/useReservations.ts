import type { Bus, SelectedSeats } from "~/components/home/reservations/types";
import { getTotalSelectedSeats } from "~/utils/bus/reservation";

export const useReservations = (rideId: string) => {
	const MAX_SELECTED_SEATS = 4;

	const isModalOpen = ref(false);
	const selectedSeats = ref<SelectedSeats[]>([]);

	watch(selectedSeats, (newVal) => {
		console.log(newVal);
	});

	const toast = useToast();

	const handleCancelReservation = () => {
		isModalOpen.value = false;
		selectedSeats.value = [];
	};

	const reserveSeats = async () => {
		const seatsNotChosen = selectedSeats.value.length === 0;

		if (seatsNotChosen) {
			toast.add({
				title: "Morate izabrati sedišta",
				color: "error",
			});

			return;
		}

		try {
			await $fetch("/apis/users/reserve", {
				method: "POST",
				body: {
					reservations: selectedSeats.value,
					rideId,
				},
			});

			toast.add({
				title: "Rezervacija je uspešna",
				color: "success",
			});

			handleCancelReservation();
		}
		catch {
			toast.add({
				title: "Greška prilikom rezervacije",
				description: "Molimo pokušajte ponovo kasnije",
				color: "error",
			});
		}
	};

	const updateSelectedSeatsForBus = (buses: Bus[], busNumber: number, seats: number[], userId?: string) => {
		const existingIndex = selectedSeats.value.findIndex(item => item.busNumber === busNumber);
		const currentBusSeats = existingIndex !== -1 ? selectedSeats.value[existingIndex].seats : [];
		const otherBusesTotalSeats = getTotalSelectedSeats(selectedSeats.value, buses, userId) - currentBusSeats.length;

		if (seats.length + otherBusesTotalSeats > MAX_SELECTED_SEATS) {
			toast.add({
				title: "Maksimalan broj rezervacija je 2",
				color: "error",
			});
			return;
		}

		if (existingIndex !== -1) {
			if (seats.length === 0) {
				selectedSeats.value.splice(existingIndex, 1);
			}
			else {
				selectedSeats.value[existingIndex].seats = seats;
			}
		}
		else if (seats.length > 0) {
			selectedSeats.value.push({ busNumber, seats });
		}
	};

	return {
		MAX_SELECTED_SEATS,
		isModalOpen,
		selectedSeats,
		handleCancelReservation,
		reserveSeats,
		updateSelectedSeatsForBus,
	};
};
