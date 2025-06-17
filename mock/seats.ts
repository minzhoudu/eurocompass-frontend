export type ObjectId = string; // MongoDB ObjectId represented as string in JSON

export type ReservationType = "NOT" | "OCCUPIED" | "FREE" | "STAIRS";

export interface ReservationSlot {
	type: ReservationType;
	reservationData?: ReservationData;
	number: number;
}

export interface ReservationData {
	id?: ObjectId;
	name: string;
	phone?: string;
}

export const mockSeats: ReservationSlot[] = [
	{ type: "OCCUPIED", number: 1, reservationData: { id: "1", name: "Paja", phone: "1234567890" } },
	{ type: "OCCUPIED", number: 2, reservationData: { id: "2", name: "Voja", phone: "1234567890" } },
	{ type: "FREE", number: 3 },
	{ type: "FREE", number: 4 },
	{ type: "FREE", number: 5 },
	{ type: "FREE", number: 6 },
	{ type: "FREE", number: 7 },
	{ type: "FREE", number: 8 },
	{ type: "FREE", number: 9 },
	{ type: "FREE", number: 10 },
	{ type: "STAIRS", number: 11 },
	{ type: "STAIRS", number: 12 },
	{ type: "FREE", number: 13 },
	{ type: "FREE", number: 14 },
	{ type: "FREE", number: 15 },
	{ type: "FREE", number: 16 },
	{ type: "OCCUPIED", number: 17, reservationData: { id: "3", name: "Pera", phone: "1234567890" } },
	{ type: "OCCUPIED", number: 18, reservationData: { id: "4", name: "Zika", phone: "1234567890" } },
	{ type: "FREE", number: 19 },
	{ type: "FREE", number: 20 },
	{ type: "FREE", number: 21 },
	{ type: "FREE", number: 22 },
	{ type: "FREE", number: 23 },
	{ type: "FREE", number: 24 },
	{ type: "FREE", number: 25 },
	{ type: "FREE", number: 26 },
	{ type: "STAIRS", number: 27, reservationData: { id: "5", name: "Laza", phone: "1234567890" } },
	{ type: "STAIRS", number: 28, reservationData: { id: "6", name: "Djole", phone: "1234567890" } },
	{ type: "FREE", number: 29 },
	{ type: "FREE", number: 30 },
	{ type: "FREE", number: 31 },
	{ type: "FREE", number: 32 },
	{ type: "FREE", number: 33 },
	{ type: "FREE", number: 34 },
	{ type: "FREE", number: 35 },
	{ type: "FREE", number: 36 },
];
