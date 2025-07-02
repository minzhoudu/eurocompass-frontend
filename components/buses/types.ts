export type BaseBusInfo = {
	id: string;
	name: string;
	registration: string;
	totalSeats: number;
};

export enum Type {
	Free = "FREE",
	Not = "NOT",
	Stairs = "STAIRS",
}

export type Slot = {
	type: Type;
	number?: number;
};

export type SeatRow = {
	slots: Slot[];
	dividerText?: string;
};

export type Layout = {
	totalSeats: number;
	seatRows: SeatRow[];
};

export type ExtendedBusInfo = Omit<BaseBusInfo, "totalSeats"> & {
	layout: Layout;
};
