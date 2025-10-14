<script setup lang="ts">
const settingsStore = useSettingsStore();

const userSeatLimit = ref(settingsStore.settings?.userSeatLimit);

const isSaveDisabled = computed(() => {
	return userSeatLimit.value == settingsStore.settings?.userSeatLimit;
});
</script>

<template>
	<div class="flex gap-2 justify-center">
		<div class="flex gap-5 justify-between w-full mb-1">
			<h2 class="lg:text-lg font-bold">
				Limit sedišta za rezervaciju:
			</h2>

			<UInput
				v-model="userSeatLimit"
				:min="1"
				:ui="{ trailing: 'pe-1' }"
			>
				<template #trailing>
					<UButton
						class="cursor-pointer"
						:disabled="isSaveDisabled"
						:color="isSaveDisabled ? 'neutral' : 'success'"
						variant="link"
						size="sm"
						icon="i-lucide-save"
						aria-label="Sacuvaj"
						@click="settingsStore.updateSettings({ userSeatLimit: Number(userSeatLimit) })"
					/>
				</template>
			</UInput>
		</div>
	</div>
</template>
