export type TicketPrice = {
	id: string;
	name: string;
	amount: number;
};

export type TicketTextItem = {
	coupon1: string;
	coupon2: string;
	name: string;
};

export type TicketText = {
	data: TicketTextItem[];
	name: string;
};

export type CreateTicketRequest = {
	name: string;
	priceId?: string;
	priceName?: string;
	priceAmount?: number;
	text: TicketTextItem[];
};
