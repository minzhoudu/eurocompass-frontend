export const useApiFetch = () => {
	const config = useRuntimeConfig();

	const apiFetch = $fetch.create({
		baseURL: config.public.apiHost,
		credentials: "include",
	});

	return {
		apiFetch,
	};
};
