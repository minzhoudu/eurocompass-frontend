import type { Settings } from "~/components/settings/settings.types";

export const useSettingsStore = defineStore("settings", () => {
	const toast = useToast();

	const settings = ref<Settings | null>(null);

	const isPendingUpdate = ref(false);

	const fetchSettings = async () => {
		const { data } = await useFetch<Settings>("/apis/settings");
		settings.value = data.value;
	};

	const updateSettings = async (data: Partial<Settings>) => {
		isPendingUpdate.value = true;

		try {
			const updatedData = await $fetch<Settings>("/apis/settings", {
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

	return {
		settings,
		isPendingUpdate,
		fetchSettings,
		updateSettings,
	};
});
