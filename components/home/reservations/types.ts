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
	reservationData?: ReservationData;
	number: number;
} | {
	type: ReservationSeatsType.NOT | ReservationSeatsType.STAIRS;
};

export type ReservationData = {
	userId?: string;
	name: string;
	lastName?: string;
	phone: string;
};

export type ReservationSeatsRow = {
	reservationSlots: ReservationSlot[] | null;
	dividerText?: string;
};

export type Bus = {
	id: string;
	busNumber: number;
	platform: number | undefined;
	reservationSeatsRows: ReservationSeatsRow[];
};

export type Ride = {
	buses: Bus[];
	departure: Date;
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
