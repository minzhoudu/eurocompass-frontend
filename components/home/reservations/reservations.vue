<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";

type Reservation = {
	from: string;
	to: string;
	time: string;
	actions: string;
};

const UButton = resolveComponent("UButton");
const Cell = resolveComponent("HomeReservationsCell");

const data = ref<Reservation[]>([
	{ from: "Krusevac", to: "Beograd", time: "09:00", actions: "Rezervisi" },
	{ from: "Krusevac", to: "Beograd", time: "10:00", actions: "Rezervisi" },
	{ from: "Krusevac", to: "Beograd", time: "11:00", actions: "Rezervisi" },
]);

const columns = ref<TableColumn<Reservation>[]>([
	{
		accessorKey: "from",
		header: "Polazna lokacija",
		cell: ({ cell }) => {
			return h(Cell, {
				label: cell.getValue(),
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
		header: "Vreme",
		cell: ({ cell }) => {
			return h(Cell, {
				label: cell.getValue(),
				type: "time",
			});
		},
	},
	{
		accessorKey: "actions",
		header: "",
		cell: ({ cell }) => {
			return h(UButton, {
				label: cell.getValue(),
				variant: "solid",
				color: "neutral",
				size: "sm",
				class: "py-2",
				icon: "lucide:ticket",
			});
		},
	},
]);
</script>

<template>
	<div class="bg-warning-300  pt-4 pb-2 rounded-xl">
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
				tr: 'border-white',
				td: 'text-black/80 px-1 py-2 md:p-3 lg:p-4',
				th: 'text-xs md:text-sm lg:text-lg font-bold bg-white md:first:rounded-l-lg md:last:rounded-r-lg py-1 md:py-2 px-1 md:px-4 text-center lg:text-left',
			}"
		/>
	</div>
</template>
