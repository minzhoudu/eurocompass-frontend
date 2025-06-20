<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";

type Reservation = {
	id: number;
	from: string;
	to: string;
	time: string;
	actions: string;
};

const ReservationButton = resolveComponent("HomeReservationsReservationButton");
const Cell = resolveComponent("HomeReservationsCell");
const UButton = resolveComponent("UButton");

const data = ref<Reservation[]>([
	{ id: 1, from: "Krusevac", to: "Beograd", time: "09:00", actions: "Rezervisi" },
	{ id: 2, from: "Krusevac", to: "Beograd", time: "10:00", actions: "Rezervisi" },
	{ id: 3, from: "Krusevac", to: "Beograd", time: "11:00", actions: "Rezervisi" },
]);

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
			return h(Cell, {
				label: cell.getValue(),
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
			return h(ReservationButton, {
				label: cell.getValue(),
				reservationId: row.original.id,
			});
		},
	},
]);
</script>

<template>
	<div class="bg-warning-300  pt-4 pb-2 lg:rounded-xl">
		<h1 class="md:text-2xl font-bold text-center">
			Vožnje za odabrani datum
		</h1>

		<UTable
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
	</div>
</template>
