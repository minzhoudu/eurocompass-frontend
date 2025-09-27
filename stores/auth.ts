type UserReservation = {
	rideId: string;
	busNumber: number;
	seat: number;
};

export type User = {
	id: string;
	name: string;
	lastName?: string;
	phone?: string;
	role: "ADMIN" | "USER";
	picture?: string;
	reservations: UserReservation[] | null;
};


export const useAuthStore = defineStore("user", () => {
	const config = useRuntimeConfig();

	const toast = useToast();

	const user = ref<User | null>(null);

	const fetchUser = async () => {
		try {
			if (import.meta.server) {
				const { data } = await useFetch<User>("/users/me", { credentials: "include", baseURL: config.public.apiHost, });
				user.value = data.value;

				return;
			}

			const data = await $api<User>("/users/me", { credentials: "include" });
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
			await $api("auth/logout", { credentials: "include" });
			user.value = null;
			navigateTo("/login");
		}
		catch (error) {
			console.error(error);
		}
	};

	const updateUser = async (data: Partial<User>) => {
		try {
			await $api("users/updateInfo", { credentials: "include", method: "POST", body: data });

			await fetchUser();

			toast.add({ title: "Uspešno", description: "Podaci su sačuvani.", color: "success" });
		}
		catch (error) {
			console.error(error);

			toast.add({ title: "Greška", description: "Došlo je do greške prilikom čuvanja podataka.", color: "error" });
		}
	};

	return { user, fetchUser, logOut, googleLogin, updateUser };
});
