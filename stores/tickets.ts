import type { Ride, SelectedSeats } from "~/components/home/reservations/types";

type State = {
	selectedSeats: SelectedSeats | null;
	ride: Ride | null;
	routes: Record<string, RouteInfo>;
	loading: boolean;
};

export interface RouteInfo {
	id: string;
	from: string;
	to: string;
	tickets: Ticket[];
}
export interface Ticket {
	id: string;
	name: string;
	price: TicketPrice;
	relations: TicketRelation[];
}
export interface TicketRelation {
	name: string;
	coupon1: string;
	coupon2?: string;
}
export interface TicketPrice {
	id: string;
	name: string;
	amount: number;
}

export const useTicketsStore = defineStore("tickets", {
	state: (): State => {
		return {
			selectedSeats: null,
			ride: null,
			routes: {},
			loading: false,
		};
	},
	actions: {
		async getRoute(routeId: string): Promise<RouteInfo | undefined> {
			if (Object.keys(this.routes).length === 0) {
				await this.fetchAllRoutes();
			}
			return this.routes[routeId];
		},
		async fetchAllRoutes(): Promise<void> {
			const { apiFetch } = useApiFetch();
			this.loading = true;
			try {
				const routes = await apiFetch<RouteInfo[]>("/routes/info");

				routes.forEach((r) => {
					this.routes[r.id] = r;
				});
			}
			catch (err) {
				console.error("Failed to fetch all routes:", err);
				throw err;
			}
			finally {
				this.loading = false;
			}
		},
	},
});
