type User = {
	id: string;
	name: string;
	role: "ADMIN" | "USER";
	avatar?: string;
};

export const useAuthStore = defineStore("user", () => {
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

	return { user, fetchUser };
});
