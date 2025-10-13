<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";
import * as z from "zod";
import type { ExtendedBusInfo, SeatRow } from "../types";
import { getTotalSeats, handleDeleteDivider, handleUpdateTotalRows, handleUpdateType } from "~/utils/bus/seat-layout";

const props = defineProps<{
	bus: ExtendedBusInfo;
}>();

const rows = ref<SeatRow[]>(props.bus.layout.seatRows);
const totalRows = ref(props.bus.layout.seatRows.length);

const schema = z.object({
	name: z.string().min(1, "Morate uneti naziv autobusa!"),
	registration: z.string().min(1, "Morate uneti registraciju autobusa!"),
});
type Schema = z.output<typeof schema>;

const state = reactive({
	name: props.bus.name,
	registration: props.bus.registration,
});

const toast = useToast();

const isPendingSubmit = ref(false);

const { apiFetch } = useApiFetch();

async function onSubmit(event: FormSubmitEvent<Schema>) {
	isPendingSubmit.value = true;

	const totalSeats = getTotalSeats(rows.value);

	const payload = {
		id: props.bus.id,
		name: event.data.name,
		registration: event.data.registration,
		layout: {
			seatRows: rows.value,
			totalSeats,
		},
	};

	try {
		await apiFetch(`/buses/edit`, {
			method: "POST",
			body: payload,
		});

		toast.add({
			title: "Uspešno ste sačuvali promene!",
			color: "success",
			icon: "i-heroicons-check-circle",
		});

		navigateTo("/admin/buses");
	}
	catch (error) {
		console.error(error);

		toast.add({
			title: "Greška!",
			description: "Došlo je do greške prilikom čuvanja promena!",
			color: "error",
			icon: "i-heroicons-x-circle",
		});
	}
	finally {
		isPendingSubmit.value = false;
	}
}

const isLastRowDivider = computed(() => {
	return rows.value[rows.value.length - 1]?.dividerText !== undefined;
});

const isFirstRowDivider = computed(() => {
	return rows.value[0]?.dividerText !== undefined;
});

const removeDevider = (dividerIndex: number) => {
	handleDeleteDivider(rows.value, dividerIndex);
	totalRows.value--;
};
</script>

<template>
	<div class="flex flex-col md:flex-row gap-20">
		<UForm
			:schema="schema"
			:state="state"
			class="space-y-4"
			@submit="onSubmit"
		>
			<UFormField
				label="Naziv autobusa"
				name="name"
			>
				<UInput v-model="state.name" />
			</UFormField>

			<UFormField
				label="Registracija"
				name="registration"
			>
				<UInput v-model="state.registration" />
			</UFormField>

			<UButton
				type="submit"
				class="cursor-pointer w-full justify-center"
				:loading="isPendingSubmit"
			>
				Sačuvaj promene
			</UButton>
		</UForm>

		<div class="flex flex-col gap-4">
			<div class="flex flex-col gap-2 items-center">
				<h2>Broj redova</h2>
				<UInputNumber
					v-model="totalRows"
					:min="1"
					class="w-2/3"
					@update:model-value="(value) => handleUpdateTotalRows(rows, value)"
				/>
			</div>

			<BusesSeatLayout
				:rows="rows"
				:total-rows="totalRows"
				:is-last-row-divider="isLastRowDivider"
				:is-first-row-divider="isFirstRowDivider"
				@update:type="(type, rowIndex, seatIndex) => handleUpdateType(rows, type, rowIndex, seatIndex)"
				@update:total-rows="totalRows++"
				@delete:divider="dividerIndex => removeDevider(dividerIndex)"
			/>
		</div>
	</div>
</template>
