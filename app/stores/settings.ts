import type { Settings, TicketPrice, DefaultPlatform } from "~/components/settings/settings.types";

export const useSettingsStore = defineStore("settings", () => {
	const toast = useToast();

	const settings = ref<Settings | null>(null);
	const ticketPrices = ref<TicketPrice[]>([]);
	const defaultPlatforms = ref<DefaultPlatform[]>([]);

	const isPendingUpdate = ref(false);

	const { apiFetch } = useApiFetch();

	const fetchSettings = async () => {
		const [settingsResult, pricesResult, platformsResult] = await Promise.all([
			useFetchCustom<Settings>("/settings"),
			useFetchCustom<TicketPrice[]>("/tickets/prices"),
			useFetchCustom<DefaultPlatform[]>("/routes/platforms"),
		]);

		if (!settingsResult.error.value && settingsResult.data.value) {
			settings.value = settingsResult.data.value;
		}
		if (!pricesResult.error.value && pricesResult.data.value) {
			ticketPrices.value = pricesResult.data.value;
		}
		if (!platformsResult.error.value && platformsResult.data.value) {
			defaultPlatforms.value = platformsResult.data.value;
		}
	};

	const updateSettings = async (data: Partial<Settings>) => {
		isPendingUpdate.value = true;

		try {
			const updatedData = await apiFetch<Settings>("/settings", {
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

	const updatePrice = async (data: {
		newValue: number;
		priceId: string;
	}) => {
		isPendingUpdate.value = true;

		try {
			const newPrice = await apiFetch<TicketPrice>("/tickets/prices", {
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

	const updateDefaultPlatform = async (data: {
		platform: number;
		routeId: string;
	}) => {
		isPendingUpdate.value = true;

		try {
			const newPlatform = await apiFetch<DefaultPlatform>("/routes/setDefaultPlatform", {
				method: "POST",
				body: data,
			});

			for (const route of defaultPlatforms.value) {
				if (newPlatform.id === route.id) {
					route.platform = newPlatform.platform;
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
		defaultPlatforms,
		ticketPrices,

		isPendingUpdate,
		fetchSettings,
		updateSettings,
		updatePrice,
		updateDefaultPlatform,
	};
});
