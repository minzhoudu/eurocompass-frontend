<script setup lang="ts">
import type { TicketPrice } from "~/components/settings/settings.types";

const settingsStore = useSettingsStore();

const { ticket } = defineProps<{
	ticket: TicketPrice;
}>();
const value = ref(ticket.amount);
const startValue = ref(ticket.amount);

const hasValueChanged = computed(() => startValue.value == value.value);
function onBlur() {
	const n = Number(value.value);
	if (!Number.isFinite(n)) {
		value.value = 0;
		return;
	}
	value.value = Math.max(0, n);
}
</script>

<template>
	<div class="flex gap-2 justify-center">
		<div class="flex gap-5 items-center">
			<h2 class="lg:text-lg font-bold">
				{{ ticket.name }}
			</h2>
			<UInput
				v-model="value"
				type="number"
				:ui="{ trailing: 'pe-1' }"
				:min="0"
				@blur="onBlur"
			>
				<template #trailing>
					<UButton
						:disabled="hasValueChanged"
						:color="hasValueChanged ? 'neutral' : 'success'"
						variant="link"
						size="sm"
						icon="i-lucide-save"
						aria-label="Sacuvaj"
						@click="settingsStore.updatePrice({
							newValue: value,
							priceId: ticket.id,
						})"
					/>
				</template>
			</UInput>
		</div>
	</div>
</template>
