<script setup lang="ts">
import type { DateValue } from "@internationalized/date";
import type { TableColumn } from "@nuxt/ui";
import type { Location } from "../header/types";
import type { Reservation, Ride } from "./types";
import dayjs from "@/utils/dayjs";

const props = defineProps<{
	selectedDate: DateValue;
	selectedLocation: Location;
}>();

const { data: rides, pending, refresh: refreshRides } = await useFetchCustom<Ride[]>("/rides/getride", {
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

const ReservationButton = resolveComponent("HomeReservationsReservationButton");
const Cell = resolveComponent("HomeReservationsCell");
const UButton = resolveComponent("UButton");

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

			return h(ReservationButton, {
				"label": cell.getValue(),
				"ride": currentRide,
				"onReservation:success": () => {
					refreshRides();
				},
			});
		},
	},
]);

const getRowId = (row: Reservation) => {
	return row.id;
};
</script>

<template>
	<div
		class="bg-warning-300  pt-4 pb-2 lg:rounded-xl"
	>
		<HomeReservationsTableHeader :pending="pending" />

		<UTable
			v-if="!pending"
			:sorting="[{ id: 'time', desc: false }]"
			:get-row-id="getRowId"
			:data="data"
			:columns="columns"
			class="md:w-2/3 mx-auto mt-4"
			empty="Ne postoje polasci za odabrani datum"
			:ui="{
				thead: '[&>tr]:after:h-0 [&>tr]:after:bg-white',
				tr: 'border-white text-center sm:text-left',
				td: 'text-black/80 px-1 py-2 md:p-3 lg:p-4',
				th: 'text-xs md:text-sm lg:text-lg font-bold bg-white md:first:rounded-l-lg md:last:rounded-r-lg py-1 md:py-2 px-1 lg:px-4 text-center lg:text-left',
			}"
		/>

		<HomeReservationsTableSkeleton v-else />
	</div>
</template>
