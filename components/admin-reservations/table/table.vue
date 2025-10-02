<script lang="ts" setup>
import type { DateValue } from "@internationalized/date";
import type { TableColumn } from "@nuxt/ui";
import dayjs from "@/utils/dayjs";
import type { Location } from "~/components/home/header/types";
import type { Reservation, Ride } from "~/components/home/reservations/types";

const props = defineProps<{
	selectedDate: DateValue;
	selectedLocation: Location;
}>();

const { data: rides, pending, refresh: refreshRides } = await useFetch<Ride[]>("/apis/rides/getride", {
	key: `ride-${props.selectedLocation.id}`,
	method: "POST",
	body: computed(() => ({
		date: props.selectedDate.toString(),
		routeId: props.selectedLocation.id,
	})),
});

const data = computed(() => {
	if (!rides.value) return [];

	return rides.value.map((ride: Ride) => {
		return {
			id: ride.id,
			from: props.selectedLocation.from,
			to: props.selectedLocation.to,
			time: ride.departure.toString(),
			actions: "Rezervisi",
		};
	});
});

const Cell = resolveComponent("HomeReservationsCell");
const UButton = resolveComponent("UButton");
const ActionModal = resolveComponent("AdminReservationsTableActionModal");

const columns = ref<TableColumn<Reservation>[]>([
	{
		accessorKey: "from",
		header: "Polazna lokacija",
		cell: ({ cell }) => {
			return h(Cell, {
				label: cell.getValue(),
				type: "start",
			});
		},
	},
	{
		accessorKey: "to",
		header: "Dolazna lokacija",
		cell: ({ cell }) => {
			return h(Cell, {
				label: cell.getValue(),
				type: "end",
			});
		},
	},
	{
		accessorKey: "time",
		header: ({ column }) => {
			const isSorted = column.getIsSorted();

			return h(UButton, {
				color: "neutral",
				variant: "ghost",
				label: "Vreme",
				icon: isSorted
					? isSorted === "asc"
						? "i-lucide-arrow-up-narrow-wide"
						: "i-lucide-arrow-down-wide-narrow"
					: "i-lucide-arrow-up-down",
				class: "-mx-2.5 text-xs md:text-sm lg:text-lg font-bold cursor-pointer",
				onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
			});
		},
		cell: ({ cell }) => {
			const time = dayjs.utc(cell.getValue() as Date).format("HH:mm");

			return h(Cell, {
				label: time,
				type: "time",
			});
		},
	},
	{
		accessorKey: "actions",
		header: () => {
			return h("div");
		},
		cell: ({ cell, row }) => {
			const currentRide = rides.value?.find((ride: Ride) => ride.id === row.original.id);

			return h(ActionModal, {
				"label": cell.getValue(),
				"ride": currentRide,
				"onReservation:success": () => {
					refreshRides();
				},
			});
		},
	},
]);
</script>

<template>
	<UTable
		v-if="!pending"
		:columns="columns"
		:data="data"
	/>
</template>
