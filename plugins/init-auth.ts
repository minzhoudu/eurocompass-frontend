export default defineNuxtPlugin(async () => {
	const authStore = useAuthStore();

	if (!authStore.user) {
		await authStore.fetchUser();
	}
});
