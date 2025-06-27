type User = {
	id: string;
	name: string;
	role: "ADMIN" | "USER";
	avatar?: string;
};

export const useUserStore = defineStore("user", () => {
	const user = ref<User | null>(null);

	const fetchUser = async () => {
		try {
			const { data } = await useFetch<User>("/apis/users/me", { credentials: "include" });
			user.value = data.value;
		}
		catch (e) {
			console.error(e);
			user.value = null;
		}
	};

	return { user, fetchUser };
});
