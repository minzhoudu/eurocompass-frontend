export default defineNuxtPlugin((nuxtApp) => {
	const config = useRuntimeConfig();

	const apiFetch = $fetch.create({
		baseURL: config.public.apiHost,
	});

	return {
		provide: {
			api: apiFetch,
		},
	};
});
