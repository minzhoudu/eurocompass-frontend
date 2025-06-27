export default defineNuxtRouteMiddleware((to) => {
	if (to.path.startsWith("/admin") && !to.meta.layout) {
		to.meta.layout = "admin";
	}
});
