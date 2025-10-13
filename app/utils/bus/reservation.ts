import { ReservationSeatsType, type Bus, type SelectedSeats } from "~/components/home/reservations/types";

export const getSelectedSeatsForBus = (selectedSeats: SelectedSeats[], busNumber: number): number[] => {
	const busSeats = selectedSeats.find(item => item.busNumber === busNumber);
	return busSeats ? busSeats.seats : [];
};

export const getTotalSelectedSeats = (selectedSeats: SelectedSeats[], buses: Bus[], userId?: string): number => {
	const numberOfUsersReservedSeats = getUsersReservedSeats(buses, userId);
	return selectedSeats.reduce((total, bus) => total + bus.seats.length, 0) + numberOfUsersReservedSeats;
};

const getUsersReservedSeats = (buses: Bus[], userId?: string) => {
	if (!userId) return 0;

	return buses.reduce((acc, bus) => {
		const busReservedSeats = bus.reservationSeatsRows.reduce((rowAcc, row) => {
			const rowReservedSeats = row.reservationSlots?.reduce((slotAcc, slot) => {
				const isUserSeatReserved = slot.type === ReservationSeatsType.OCCUPIED && slot.reservationData?.userId === userId;
				return slotAcc + (isUserSeatReserved ? 1 : 0);
			}, 0) || 0;
			return rowAcc + rowReservedSeats;
		}, 0);
		return acc + busReservedSeats;
	}, 0);
};
