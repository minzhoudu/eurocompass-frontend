export default defineNuxtRouteMiddleware((to) => {
	const authStore = useAuthStore();

	if (authStore.user && to.path === "/login") {
		return navigateTo("/");
	}

	if (to.path.startsWith("/admin") && (!authStore.user || authStore.user.role !== "ADMIN")) {
		return navigateTo("/");
	}
});
