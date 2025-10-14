<script setup lang="ts">
import { ref, computed } from "vue";
import type { TicketText, TicketTextItem, CreateTicketRequest } from "./ticketPrices.types";

const settingsStore = useSettingsStore();

// form state
const ticketName = ref<string>("");
const priceName = ref<string>("");
const priceAmount = ref<number>();
const selectedTex = ref<TicketTextItem[]>([]);
const priceId = ref<string | undefined>();
const loading = ref(false);

// validation
const isNameValid = computed(() => ticketName.value.trim().length > 0);
const isPriceNameValid = computed(() => priceName.value.trim().length > 0);
const isPriceValid = computed(() => priceAmount.value !== undefined && !Number.isNaN(priceAmount.value) && priceAmount.value > 0);
const isSelectValid = computed(() => selectedTex.value !== undefined);
const isFormValid = computed(() => {
	if (!ticketName.value || !isSelectValid.value) return false;
	if (priceId.value == undefined) {
		return isPriceNameValid.value && isPriceValid.value;
	}

	return true;
});

const textTypesItems = computed(() => {
	return settingsStore.ticketTexts.map((t: TicketText) => ({
		label: t.name,
		value: t.data,
	}));
});

const priceIdsItems = computed(() => {
	return settingsStore.ticketPrices.map(t => ({
		label: t.name,
		value: t.id,
	}));
});

async function submit() {
	const payload: CreateTicketRequest = {
		name: ticketName.value.trim(),
		priceName: priceName.value.trim(),
		priceAmount: priceAmount.value,
		text: selectedTex.value,
	};
	settingsStore.createTicket(payload);

	ticketName.value = "";
	priceAmount.value = undefined;
	selectedTex.value = [];
}
</script>

<template>
	<UCard class="w-full max-w-2xl mb-3">
		<template #header>
			<div class="text-2xl font-bold text-center">
				Nova Karata
			</div>
		</template>

		<div class="p-4 space-y-4">
			<div class="flex justify-evenly">
				<div>
					<div>
						<label class="block text-sm font-medium mb-1">Naziv karte</label>
						<UInput
							v-model="ticketName"
							placeholder="Unesite naziv"
							:error="!isNameValid && ticketName !== ''"
						/>
					</div>

					<div>
						<label class="block text-sm font-medium mb-1">Tekst karte</label>
						<USelect
							v-model="selectedTex"
							:items="textTypesItems"
							placeholder="Izaberite…"
							:clearable="false"
						/>
					</div>
				</div>
				<div class="flex flex-col">
					<label class="block text-sm font-medium mb-1">Nova cena</label>
					<UInput
						v-model="priceName"
						class="mb-1"
						placeholder="Unesite naziv"
					/>
					<UInput
						v-model="priceAmount"
						class="mb-1"
						type="number"
						placeholder="0.00"
						inputmode="decimal"
						:error="!isPriceValid && priceAmount !== null"
					/>

					<label class="block text-sm font-medium mb-1">Postojeća cena</label>
					<USelect
						v-model="priceId"
						:items="priceIdsItems"
						placeholder="Izaberite…"
						:clearable="false"
					/>
				</div>
			</div>

			<div class="flex justify-end">
				<UButton
					:disabled="!isFormValid || loading"
					@click="submit"
				>
					<template #default>
						<span>Kreiraj</span>
					</template>
				</UButton>
			</div>
		</div>
	</UCard>
</template>
