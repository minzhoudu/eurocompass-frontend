type User = {
	id: string;
	name: string;
	role: "ADMIN" | "USER";
	picture?: string;
};

export const useAuthStore = defineStore("user", () => {
	const config = useRuntimeConfig();

	const user = ref<User | null>(null);

	const fetchUser = async () => {
		try {
			if (import.meta.server) {
				const { data } = await useFetch<User>("/apis/users/me", { credentials: "include" });
				user.value = data.value;

				return;
			}

			const data = await $fetch<User>("/apis/users/me", { credentials: "include" });
			user.value = data;
		}
		catch {
			user.value = null;
		}
	};

	const googleLogin = () => {
		window.location.href = config.public.GOOGLE_LOGIN_URL;
	};

	const logOut = async () => {
		try {
			await $fetch("/apis/auth/logout", { credentials: "include" });
			user.value = null;
		}
		catch (error) {
			console.error(error);
		}
	};

	return { user, fetchUser, logOut, googleLogin };
});
