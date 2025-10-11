export type Settings = {
	userSeatLimit: number;
};

export type TicketPrice = {
	id: string;
	name: string;
	amount: number;
};

export type DefaultPlatform = {
	id: string;
	route: string;
	platform: number;
};
