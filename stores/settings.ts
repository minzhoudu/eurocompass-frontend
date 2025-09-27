import type { Settings, TicketPrice } from "~/components/settings/settings.types";
export const useSettingsStore = defineStore("settings", () => {
	const toast = useToast();

	const settings = ref<Settings | null>(null);
	const ticketPrices = ref<TicketPrice[]>([]);

	const isPendingUpdate = ref(false);

	const fetchSettings = async () => {
		const [settingsResult, pricesResult] = await Promise.all([
			useFetch<Settings>("/settings", {baseURL: config.public.apiHost,}),
			useFetch<TicketPrice[]>("/tickets/prices", {baseURL: config.public.apiHost,}),
		]);

		if (!settingsResult.error.value && settingsResult.data.value) {
			settings.value = settingsResult.data.value;
		}
		if (!pricesResult.error.value && pricesResult.data.value) {
			ticketPrices.value = pricesResult.data.value;
		}
	};

	const updateSettings = async (data: Partial<Settings>) => {
		isPendingUpdate.value = true;

		try {
			const updatedData = await $api<Settings>("/settings", {
				method: "POST",
				body: data,
			});

			settings.value = updatedData;

			toast.add({
				title: "Podaci su uspešno ažurirani",
				color: "success",
			});
		}
		catch (error) {
			console.error(error);
			toast.add({
				title: "Greška prilikom ažuriranja podataka",
				color: "error",
			});
		}
		finally {
			isPendingUpdate.value = false;
		}
	};
	const config = useRuntimeConfig()
	const updatePrice = async (data: {
		newValue: number;
		priceId: string;
	}) => {
		isPendingUpdate.value = true;

		try {
			const newPrice = await $fetch<TicketPrice>("/tickets/prices", {
				baseURL: config.public.apiHost,
				method: "POST",
				body: data,
			});

			for (const price of ticketPrices.value) {
				if (newPrice.id === price.id) {
					price.amount = newPrice.amount;
				}
			}

			toast.add({
				title: "Podaci su uspešno ažurirani",
				color: "success",
			});
		}
		catch (error) {
			console.error(error);
			toast.add({
				title: "Greška prilikom ažuriranja podataka",
				color: "error",
			});
		}
		finally {
			isPendingUpdate.value = false;
		}
	};

	return {
		settings,
		isPendingUpdate,
		fetchSettings,
		updateSettings,
		ticketPrices,
		updatePrice,
	};
});
