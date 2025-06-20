export type ObjectId = string; // MongoDB ObjectId represented as string in JSON

export type ReservationType = "NOT" | "OCCUPIED" | "FREE" | "STAIRS";

export type ReservationSlot = {
	type: "OCCUPIED" | "FREE";
	reservationData?: ReservationData;
	number: number;
} | {
	type: "NOT" | "STAIRS";
};

export interface ReservationData {
	id?: ObjectId;
	name: string;
	phone?: string;
}

export const mockSeats: ReservationSlot[] = [
	{ type: "OCCUPIED", number: 1, reservationData: { id: "1", name: "Paja", phone: "1234567890" } },
	{ type: "OCCUPIED", number: 2, reservationData: { id: "2", name: "Voja", phone: "1234567890" } },
	{ type: "NOT" },
	{ type: "FREE", number: 3 },
	{ type: "FREE", number: 4 },

	{ type: "FREE", number: 5 },
	{ type: "FREE", number: 6 },
	{ type: "NOT" },
	{ type: "FREE", number: 7 },
	{ type: "FREE", number: 8 },

	{ type: "FREE", number: 9 },
	{ type: "FREE", number: 10 },
	{ type: "NOT" },
	{ type: "STAIRS" },
	{ type: "STAIRS" },

	{ type: "FREE", number: 11 },
	{ type: "FREE", number: 12 },
	{ type: "NOT" },
	{ type: "FREE", number: 13 },
	{ type: "OCCUPIED", number: 14, reservationData: { id: "3", name: "Pera", phone: "1234567890" } },

	{ type: "OCCUPIED", number: 15, reservationData: { id: "4", name: "Zika", phone: "1234567890" } },
	{ type: "FREE", number: 16 },
	{ type: "NOT" },
	{ type: "FREE", number: 17 },
	{ type: "FREE", number: 18 },

	{ type: "FREE", number: 19 },
	{ type: "FREE", number: 20 },
	{ type: "NOT" },
	{ type: "FREE", number: 21 },
	{ type: "FREE", number: 22 },

	{ type: "FREE", number: 23 },
	{ type: "FREE", number: 24 },
	{ type: "NOT" },
	{ type: "STAIRS" },
	{ type: "STAIRS" },

	{ type: "FREE", number: 25 },
	{ type: "FREE", number: 26 },
	{ type: "NOT" },
	{ type: "FREE", number: 27 },
	{ type: "FREE", number: 28 },

	{ type: "FREE", number: 29 },
	{ type: "FREE", number: 30 },
	{ type: "FREE", number: 31 },
	{ type: "FREE", number: 32 },
	{ type: "FREE", number: 33 },
];
