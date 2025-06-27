export enum ReservationSeatsType {
	FREE = "FREE",
	OCCUPIED = "OCCUPIED",
	NOT = "NOT",
	STAIRS = "STAIRS",
}

export type ReservationSlot = {
	type: ReservationSeatsType.FREE;
	number: number;
} | {
	type: ReservationSeatsType.OCCUPIED;
	reservationData: ReservationData;
	number: number;
} | {
	type: ReservationSeatsType.NOT | ReservationSeatsType.STAIRS;
};

export type ReservationData = {
	id?: string;
	name: string;
	phone?: string;
};

export type ReservationSeatsRow = {
	reservationSlots: ReservationSlot[] | null;
	dividerText?: string;
};

export type Bus = {
	busNumber: number;
	reservationSeatsRows: ReservationSeatsRow[];
};

export type Ride = {
	buses: Bus[];
	departure: number;
	id: string;
	routeId: string;
};

export type Reservation = {
	id: string;
	from: string;
	to: string;
	time: string;
	actions: string;
};

export type SelectedSeats = {
	seats: number[];
	busNumber: number;
};
