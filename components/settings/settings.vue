<script setup lang="ts">
import SettingsActions from "./settings-actions.vue";
import type { Settings } from "./settings.types";

const { data: settings, refresh: refetchSettings } = await useFetch<Settings>("/apis/settings");

const userSeatLimit = ref(settings?.value?.userSeatLimit);

const isPendingSubmit = ref(false);

const toast = useToast();

const updateSettings = async () => {
	try {
		isPendingSubmit.value = true;
		await $fetch("/apis/settings", {
			method: "POST",
			body: {
				userSeatLimit: userSeatLimit.value,
			},
		});

		toast.add({
			title: "Uspešno sačuvani podaci",
			color: "success",
		});

		refetchSettings();
	}
	catch (error) {
		console.error(error);

		toast.add({
			title: "Greška prilikom sačuvanja podataka",
			color: "error",
		});
	}
	finally {
		isPendingSubmit.value = false;
	}
};

const resetSettings = () => {
	userSeatLimit.value = settings?.value?.userSeatLimit;
};

const isSaveDisabled = computed(() => {
	return userSeatLimit.value === settings?.value?.userSeatLimit;
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
					:is-pending="isPendingSubmit"
					@save="updateSettings"
					@cancel="resetSettings"
				/>
			</template>
		</UCard>
	</div>
</template>
