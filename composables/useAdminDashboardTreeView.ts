import type { DateValue } from "@internationalized/date";
import type { TreeItem } from "@nuxt/ui";
import dayjs from "@/utils/dayjs";
import type { Bus, Ride } from "~/components/home/reservations/types";

export type Orphan = {
	userId: string;
	name: string;
	lastName: string;
	phone: string;
};

export type ExtendedBus = Omit<Bus, "id"> & {
	busId: string | null;
	freeSeats: number;
	name: string;
	registration: string;
};

export type ExtendedRide = Ride & {
	buses: ExtendedBus[];
	orphans: Orphan[];
	totalFreeSeats: number;
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
				label: dayjs.utc(ride.departure).format("HH:mm"),
				class: "font-semibold border-t border-black/30 py-3",
				icon: "material-symbols:alarm",
				slot: "ride-item",
				orphans: ride.orphans,
				rideId: ride.id,
				buses: ride.buses,
				totalFreeSeats: ride.totalFreeSeats,
				children: [...ride.buses.map(bus => ({
					rideId: ride.id,
					bus,
					slot: "bus-item",
				})), {
					rideId: ride.id,
					selectedBuses: ride.buses,
					slot: "add-bus-item",
				}],
			})),
		};
	});
};

export const useAdminDashboardTreeView = async (from: Ref<DateValue | undefined>, to: Ref<DateValue | undefined>) => {
	const body = computed(() => ({
		from: from.value?.toString() || null,
		to: to.value?.toString() || null,
	}));

	const { data: routesWithRides, error: getRidesError, pending: getRidesLoading, refresh: refetchGetRides } = await useLazyFetch("/apis/admin/getRides", {
		method: "post",
		body,
		transform: (data: Routes) => data.routes,
	});

	const getTreeItems = (route: Route): TreeItem[] => {
		if (!route) return [];

		return [{
			defaultExpanded: true,
			value: route.from + " - " + route.to,
			label: route.from + " - " + route.to,
			class: "bg-warning-300 rounded-lg py-4 font-semibold md:text-lg",
			icon: "material-symbols:location-on-rounded",
			children: mapTimetable(route.timetable, route.id),

		}];
	};

	return {
		routesWithRides,
		getRidesError,
		getRidesLoading,
		getTreeItems,
		refetchGetRides,
	};
};
