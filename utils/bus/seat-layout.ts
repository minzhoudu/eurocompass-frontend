import type { ReservationSlot } from "~/components/home/reservations/types";

export const isSelected = (seat: ReservationSlot, selectedSeats: number[]) => {
	if (seat.type !== "FREE") return false;

	return selectedSeats.includes(seat.number);
};

export const isDisabled = (seat: ReservationSlot, maxSeatsReached: boolean, selectedSeats: number[]) => {
	if (seat.type !== "FREE") return true;

	return maxSeatsReached && !isSelected(seat, selectedSeats);
};
