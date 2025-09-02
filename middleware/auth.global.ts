export default defineNuxtRouteMiddleware((to) => {
	const authStore = useAuthStore();

	if (authStore.user && to.path === "/login") {
		return navigateTo("/");
	}

	// TODO Delete this and move Tickets page under /admin pages
	if (to.path.startsWith("/tickets") && (!authStore.user || authStore.user.role !== "ADMIN")) {
		return navigateTo("/");
	}

	if (to.path.startsWith("/admin") && (!authStore.user || authStore.user.role !== "ADMIN")) {
		return navigateTo("/");
	}

	if (to.path.startsWith("/admin") && !to.meta.layout) {
		to.meta.layout = "admin";
	}
});
