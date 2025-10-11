export const useFetchCustom: typeof useFetch = (request, opts?) => {
	const config = useRuntimeConfig();
	const token = useCookie("token");

	return useFetch(request, {
		baseURL: config.public.apiHost,
		credentials: "include",
		headers: {
			...(token.value && { Cookie: `token=${token.value}` }),
			...opts?.headers,
		},
		...opts,
	});
};
