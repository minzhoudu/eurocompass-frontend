import type { Settings, DefaultPlatform } from "~/components/settings/settings.types";
import type { TicketPrice, TicketText, CreateTicketRequest } from "~/components/admin-tickets/ticketPrices.types";

export const useSettingsStore = defineStore("settings", () => {
	const toast = useToast();

	const settings = ref<Settings | null>(null);
	const defaultPlatforms = ref<DefaultPlatform[]>([]);

	const ticketPrices = ref<TicketPrice[]>([]);
	const ticketTexts = ref<TicketText[]>([]);

	const isPendingUpdate = ref(false);

	const { apiFetch } = useApiFetch();

	const fetchSettings = async () => {
		const [settingsResult, platformsResult] = await Promise.all([
			useFetchCustom<Settings>("/settings"),
			useFetchCustom<DefaultPlatform[]>("/routes/platforms"),
		]);

		if (!settingsResult.error.value && settingsResult.data.value) {
			settings.value = settingsResult.data.value;
		}
		if (!platformsResult.error.value && platformsResult.data.value) {
			defaultPlatforms.value = platformsResult.data.value;
		}
	};
	const fetchTickets = async () => {
		const [pricesResult, textsResult] = await Promise.all([
			useFetchCustom<TicketPrice[]>("/tickets/prices"),
			useFetchCustom<TicketText[]>("/tickets/texts"),
		]);

		if (!pricesResult.error.value && pricesResult.data.value) {
			ticketPrices.value = pricesResult.data.value;
		}
		if (!textsResult.error.value && textsResult.data.value) {
			ticketTexts.value = textsResult.data.value;
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

	const createTicket = async (data: CreateTicketRequest) => {
		try {
			const response = await apiFetch("/tickets/create", {
				method: "POST",
				body: data,
			});

			console.log(response);

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
		isPendingUpdate,
		fetchSettings,
		updateSettings,
		updateDefaultPlatform,

		ticketPrices,
		ticketTexts,
		fetchTickets,
		updatePrice,
		createTicket,
	};
});
