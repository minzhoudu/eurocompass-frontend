import type { ReservationSeatsRow } from "../home/reservations/types";

export type BaseBusInfo = {
	id: string;
	name: string;
	registration: string;
	totalSeats: number;
};

export type ExtendedBusInfo = Omit<BaseBusInfo, "totalSeats"> & {
	layout: {
		totalSeats: number;
		seatRows: ReservationSeatsRow[];
	};
};
