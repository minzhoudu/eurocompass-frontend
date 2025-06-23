export type ReservationSlot = {
	type: "FREE";
	number: number;
} | {
	type: "OCCUPIED";
	reservationData: ReservationData;
	number: number;
} | {
	type: "NOT" | "STAIRS";
};

export type ReservationData = {
	id?: string;
	name: string;
	phone?: string;
};

export type Bus = {
	busNumber: number;
	reservationSlots: ReservationSlot[];
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
