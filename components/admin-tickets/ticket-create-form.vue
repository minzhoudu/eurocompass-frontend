<script setup lang="ts">
import { ref, computed } from "vue";
import type { TicketText, TicketTextItem, CreateTicketRequest } from "./ticketPrices.types";

const settingsStore = useSettingsStore();

// form state
const ticketName = ref<string>("");
const ticketPrice = ref<number>();
const selectedTex = ref<TicketTextItem[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);
const success = ref<string | null>(null);

// validation
const isNameValid = computed(() => ticketName.value.trim().length > 0);
const isPriceValid = computed(() => ticketPrice.value !== undefined && !Number.isNaN(ticketPrice.value) && ticketPrice.value > 0);
const isSelectValid = computed(() => selectedTex.value !== undefined && selectedTex.value !== "");
const isFormValid = computed(() => isNameValid.value && isPriceValid.value && isSelectValid.value);

const selectItems = computed(() => {
	return (settingsStore.ticketTexts ?? []).map((t: TicketText) => ({
		label: t.name,
		value: t.data,
	}));
});

async function submit() {
	error.value = null;
	success.value = null;

	if (!isFormValid.value) {
		error.value = "Popunite sva polja ispravno.";
		return;
	}

	loading.value = true;
	try {
		const payload: CreateTicketRequest = {
			priceName: ticketName.value.trim(),
			priceAmount: ticketPrice.value,
			text: selectedTex.value,
		};
		settingsStore.createTicket(payload);

		console.log(payload);

		success.value = "Karta uspešno kreirana.";
		ticketName.value = "";
		ticketPrice.value = undefined;
		selectedTex.value = [];
	}
	catch (e: any) {
		error.value = e?.message || "Greška pri slanju zahteva.";
	}
	finally {
		loading.value = false;
	}
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
			<div>
				<label class="block text-sm font-medium mb-1">Naziv karte</label>
				<UInput
					v-model="ticketName"
					placeholder="Unesite naziv"
					:error="!isNameValid && ticketName !== ''"
				/>
			</div>

			<div>
				<label class="block text-sm font-medium mb-1">Cena</label>
				<UInput
					v-model="ticketPrice"
					type="number"
					placeholder="0.00"
					inputmode="decimal"
					:error="!isPriceValid && ticketPrice !== null"
				/>
			</div>

			<div>
				<label class="block text-sm font-medium mb-1">Tip/tekst karte</label>
				<USelect
					v-model="selectedTex"
					:items="selectItems"
					placeholder="Izaberite…"
					:clearable="false"
				/>
			</div>

			<div
				v-if="error"
				class="text-sm text-red-600"
			>
				{{ error }}
			</div>
			<div
				v-if="success"
				class="text-sm text-green-600"
			>
				{{ success }}
			</div>

			<div class="flex justify-end">
				<UButton
					:disabled="!isFormValid || loading"
					@click="submit"
				>
					<template #default>
						<span v-if="!loading">Kreiraj</span>
						<span v-else>Šaljem...</span>
					</template>
				</UButton>
			</div>
		</div>
	</UCard>
</template>
