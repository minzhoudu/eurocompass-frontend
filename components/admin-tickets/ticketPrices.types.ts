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

type CreateTicketByPriceId = {
	name: string;
	priceId: string;
	priceName?: never;
	priceAmount?: never;
	text: TicketTextItem[];
};

type CreateTicketByPriceValue = {
	name: string;
	priceId?: never;
	priceName: string;
	priceAmount: number;
	text: TicketTextItem[];
};
export type CreateTicketRequest = {
	name: string;
	priceId?: string;
	priceName?: string;
	priceAmount?: number;
	text: TicketTextItem[];
};
// TODO VP
// Da se izabere stara cena ili kreira nova
// validacija da je izabran tekst, i proveriti ostatak

// export type CreateTicketRequest = CreateTicketByPriceId | CreateTicketByPriceValue;
