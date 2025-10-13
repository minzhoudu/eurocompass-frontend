export default defineNuxtRouteMiddleware((to) => {
	const authStore = useAuthStore();

	if (to.path.startsWith("/user") && !authStore.user) {
		return navigateTo("/login");
	}
});
