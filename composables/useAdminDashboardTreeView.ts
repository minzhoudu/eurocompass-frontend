import type { TreeItem } from "@nuxt/ui";
import type { Bus, Ride } from "~/components/home/reservations/types";

export type ExtendedBus = Bus & {
	busId: string | null;
	freeSeats: number;
	name: string;
	registration: string;
};

export type ExtendedRide = Ride & {
	buses: ExtendedBus[];
};

type Timetable = {
	date: string;
	rides: ExtendedRide[];
};

type Route = {
	id: string;
	from: string;
	to: string;
	searchableName: string;
	timetable: Timetable[] | null;
};

type Routes = {
	routes: Route[];
};

const mapTimetable = (timetable: Timetable[] | null, routeId: string): TreeItem[] => {
	if (!timetable) return [];

	return timetable.map((table) => {
		return {
			value: `${table.date}-${routeId}`,
			label: table.date,
			class: "font-bold py-4",
			icon: "material-symbols:calendar-month-rounded",
			children: table.rides.map(ride => ({
				value: ride.id,
				label: new Date(ride.departure).toLocaleTimeString("sr-RS", { hour: "2-digit", minute: "2-digit" }),
				class: "font-semibold border-t border-black/30 py-3",
				icon: "material-symbols:alarm",
				children: [...ride.buses.map(bus => ({
					rideId: ride.id,
					bus,
					slot: "bus-item",
				})), {
					rideId: ride.id,
					slot: "add-bus-item",
				}],
			})),
		};
	});
};

export const useAdminDashboardTreeView = async () => {
	const { data: routesWithRides, error: getRidesError, pending: getRidesLoading, refresh: refetchGetRides } = await useLazyFetch("/apis/admin/getRides", {
		method: "post",
		body: {
			from: null,
			to: null,
		},
		transform: (data: Routes) => data.routes,
	});

	const expandedRoutes = ref<string[]>([]);

	const getTreeItems = (route: Route): TreeItem[] => {
		if (!route) return [];

		expandedRoutes.value.push(`${route.from} - ${route.to}`);

		return [{
			value: route.from + " - " + route.to,
			label: route.from + " - " + route.to,
			class: "bg-warning-300 rounded-lg py-4 font-semibold md:text-lg",
			icon: "material-symbols:location-on-rounded",
			children: mapTimetable(route.timetable, route.id),
		}];
	};

	return {
		expandedRoutes,
		routesWithRides,
		getRidesError,
		getRidesLoading,
		getTreeItems,
		refetchGetRides,
	};
};
