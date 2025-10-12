<script setup lang="ts">
import type { DefaultPlatform } from "~/components/settings/settings.types";

const settingsStore = useSettingsStore();

const { platform } = defineProps<{
	platform: DefaultPlatform;
}>();

const value = ref(platform.platform);
const startValue = computed(() => platform.platform);

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
		<div class="flex gap-5  justify-between w-full mb-1">
			<h2 class="lg:text-lg font-bold">
				{{ platform.route }}
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
						class="cursor-pointer"
						:disabled="hasValueChanged"
						:color="hasValueChanged ? 'neutral' : 'success'"
						variant="link"
						size="sm"
						icon="i-lucide-save"
						aria-label="Sacuvaj"
						@click="settingsStore.updateDefaultPlatform({
							platform: value,
							routeId: platform.id,
						})"
					/>
				</template>
			</UInput>
		</div>
	</div>
</template>
