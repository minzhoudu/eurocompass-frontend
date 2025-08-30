import type { Ride, SelectedSeats } from "~/components/home/reservations/types";

type state = {
	selectedSeats: SelectedSeats | null;
	ride: Ride | null;
	routes: Record<string, RouteInfo>;
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
	price: number;
	relation1: string;
	relation2: string;
}

export const useTicketsStore = defineStore("tickets", {
	state: (): state => {
		return {
			selectedSeats: null,
			ride: null,
			routes: {},
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
			try {
				const routes = await $fetch<RouteInfo[]>("/apis/routes/info", {
					method: "GET",
				});

				routes.forEach((r) => {
					this.routes[r.id] = r;
				});
			}
			catch (err) {
				console.error("Failed to fetch all routes:", err);
				throw err;
			}
		},
	},
});
