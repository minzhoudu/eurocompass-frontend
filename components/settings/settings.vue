<script setup lang="ts">
import SettingsActions from "./settings-actions.vue";

const settingsStore = useSettingsStore();

const userSeatLimit = ref(settingsStore.settings?.userSeatLimit);

const resetSettings = () => {
	userSeatLimit.value = settingsStore.settings?.userSeatLimit;
};

const isSaveDisabled = computed(() => {
	return userSeatLimit.value === settingsStore.settings?.userSeatLimit;
});
</script>

<template>
	<div class="flex justify-center">
		<UCard class="w-full max-w-2xl">
			<template #header>
				<div class="text-2xl font-bold text-center">
					Settings
				</div>
			</template>

			<SettingsFields v-model:user-seat-limit="userSeatLimit" />

			<template #footer>
				<SettingsActions
					:is-save-disabled="isSaveDisabled"
					:is-pending="settingsStore.isPendingUpdate"
					@save="() => settingsStore.updateSettings({ userSeatLimit })"
					@cancel="resetSettings"
				/>
			</template>
		</UCard>
	</div>
</template>
