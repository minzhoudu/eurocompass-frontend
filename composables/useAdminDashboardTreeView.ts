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
	[key: string]: ExtendedRide[];
};

type Route = {
	id: string;
	from: string;
	to: string;
	searchableName: string;
	timetable: Timetable;
};

type Routes = {
	routes: Route[];
};

const mapTimetable = (timetable: Timetable): TreeItem[] => {
	const timetableItems: TreeItem[] = [];

	for (const [key, value] of Object.entries(timetable)) {
		timetableItems.push({
			label: key,
			icon: "material-symbols:calendar-month-rounded",
			children: value.map(ride => ({
				label: new Date(ride.departure).toLocaleTimeString("sr-RS", { hour: "2-digit", minute: "2-digit" }),
				icon: "material-symbols:alarm",
				children: [...ride.buses.map(bus => ({
					bus,
					slot: "bus-item",
				})), {
					label: "Dodaj autobus",
					rideId: ride.id,
					slot: "add-bus-item",
				}],
			})),
		});
	}

	return timetableItems;
};

export const useAdminDashboardTreeView = async () => {
	const { data: routesWithRides, refresh } = await useLazyFetch("/apis/admin/getRides", {
		method: "post",
		transform: (data: Routes) => data.routes,
	});

	const expandedRoutes = ref<string[]>([]);

	watchEffect(() => {
		console.log(expandedRoutes.value);
	});

	const getTreeItems = (route: Route): TreeItem[] => {
		if (!route) return [];

		return [{
			label: route.from + " - " + route.to,
			class: "bg-warning-300 rounded-lg py-2 font-semibold md:text-lg",
			icon: "material-symbols:location-on-rounded",
			children: mapTimetable(route.timetable),
			onToggle: () => {
				if (expandedRoutes.value.length > 0) {
					expandedRoutes.value.splice(1, expandedRoutes.value.length - 1);
				}
			},
		}];
	};

	return {
		expandedRoutes,
		routesWithRides,
		getTreeItems,
		refetchGetRides: refresh,
	};
};
