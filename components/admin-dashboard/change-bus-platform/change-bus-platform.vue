<script setup lang="ts">
const props = defineProps<{ busPlatform: number; busNumber: number; rideId: string }>();

const busPlatform = ref(props.busPlatform);

const isSubmitDisabled = computed(() => {
	return busPlatform.value === props.busPlatform;
});

const emit = defineEmits<{ (e: "platformChanged"): void }>();
const { apiFetch } = useApiFetch();
const toast = useToast();

const handleChangeBusPlatform = async () => {
	if (isSubmitDisabled.value) return;

	try {
		await apiFetch("/rides/setPlatform", {
			method: "POST",
			body: {
				busNumber: props.busNumber,
				rideId: props.rideId,
				platform: busPlatform.value,
			},
		});

		toast.add({ title: "Uspešno ste promenili peron na liniji.", color: "success" });
		emit("platformChanged");
	}
	catch (error) {
		console.error(error);
		toast.add({ title: "Došlo je do greške prilikom promene perona.", color: "error" });
	}
};
</script>

<template>
	<UModal
		title="Promena perona"
		description="Izaberite novi peron za ovaj autobus na trenutnoj vožnji"
	>
		<UTooltip
			text="Zameni peron"
			:delay-duration="0"
			:content="{ side: 'top' }"
		>
			<UButton
				size="xs"
				class="py-0.5 cursor-pointer text-white hover:text-warning border"
				variant="solid"
				icon="tabler:switch"
			/>
		</UTooltip>

		<template #body>
			<div class="flex w-full gap-2">
				<UInput
					v-model="busPlatform"
					type="number"
					class="w-full"
				/>

				<UButton
					class="py-0.5 px-4 cursor-pointer text-white hover:text-warning border"
					variant="solid"
					icon="tabler:switch"
					:disabled="isSubmitDisabled"
					@click="handleChangeBusPlatform"
				/>
			</div>
		</template>
	</UModal>
</template>
