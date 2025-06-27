import type { SelectedSeats } from "~/components/home/reservations/types";

export const getSelectedSeatsForBus = (selectedSeats: SelectedSeats[], busNumber: number): number[] => {
	const busSeats = selectedSeats.find(item => item.busNumber === busNumber);
	return busSeats ? busSeats.seats : [];
};

export const getTotalSelectedSeats = (selectedSeats: SelectedSeats[]): number => {
	return selectedSeats.reduce((total, bus) => total + bus.seats.length, 0);
};
