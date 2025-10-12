export default defineNuxtPlugin(async () => {
	const authStore = useAuthStore();

	if (!authStore.user) {
		await authStore.fetchUser();
	}

	const settingsStore = useSettingsStore();

	if (!settingsStore.settings) {
		callOnce(async () => {
			await Promise.all([
				settingsStore.fetchSettings(),
				settingsStore.fetchTickets(),
			]);
		});
	}
});
