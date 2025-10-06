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

	const { apiFetch } = useApiFetch();

	const toast = useToast();

	const user = ref<User | null>(null);

	const fetchUser = async () => {
		try {
			if (import.meta.server) {
				const { data } = await useFetchCustom<User>("/users/me");
				user.value = data.value;

				return;
			}

			const data = await apiFetch<User>("/users/me");
			user.value = data;
		}
		catch {
			user.value = null;
		}
	};

	const googleLogin = () => {
		window.location.href = config.public.apiHost;
	};

	const logOut = async () => {
		try {
			await apiFetch("/auth/logout");
			user.value = null;
			navigateTo("/login");
		}
		catch (error) {
			console.error(error);
		}
	};

	const updateUser = async (data: Partial<User>) => {
		try {
			await apiFetch("/users/updateInfo", { method: "POST", body: data });

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
