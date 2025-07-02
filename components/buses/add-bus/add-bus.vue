<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";
import { z } from "zod";
import { Type, type SeatRow } from "../types";
import { handleUpdateTotalRows, handleUpdateType } from "~/utils/bus/seat-layout";

const rows = ref<SeatRow[]>([
	{
		slots: [
			{
				type: Type.FREE,
				number: 1,
			},
			{
				type: Type.FREE,
				number: 2,
			},
			{
				type: Type.FREE,
				number: 3,
			},
			{
				type: Type.FREE,
				number: 4,
			},
			{
				type: Type.FREE,
				number: 5,
			},
		],
	},
]);

const totalRows = ref(rows.value.length);

const schema = z.object({
	name: z.string().min(1, "Morate uneti naziv autobusa!"),
	registration: z.string().min(1, "Morate uneti registraciju autobusa!"),
});
type Schema = z.output<typeof schema>;

const state = reactive({
	name: "",
	registration: "",
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
	const payload = {
		name: event.data.name,
		registration: event.data.registration,
		rows: toRaw(rows.value),
	};

	console.log(payload);
}

const isLastRowDevider = computed(() => {
	return rows.value[rows.value.length - 1].deviderText !== undefined;
});

const isFirstRowDevider = computed(() => {
	return rows.value[0].deviderText !== undefined;
});
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
				class="cursor-pointer"
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
				:is-last-row-devider="isLastRowDevider"
				:is-first-row-devider="isFirstRowDevider"
				@update:type="(type, rowIndex, seatIndex) => handleUpdateType(rows, type, rowIndex, seatIndex)"
				@update:total-rows="totalRows++"
			/>
		</div>
	</div>
</template>
