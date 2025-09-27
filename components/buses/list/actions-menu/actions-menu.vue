<script setup lang="ts">
import type { DropdownMenuItem } from "@nuxt/ui";

const props = defineProps<{
	busId: string;
}>();

const toast = useToast();
const isDeleteModalOpen = ref(false);

const emit = defineEmits<{
	(e: "bus:deleted"): void;
}>();

const actionItems: DropdownMenuItem[] = [
	{
		label: "Izmeni",
		icon: "mynaui:config",
		to: `/admin/buses/${props.busId}/edit`,
	},
	{
		slot: "delete-button",
	},
];

const handleDeleteBus = async () => {
	try {
		await $api(`buses/${props.busId}`, {
			method: "DELETE",
		});

		toast.add({
			title: "Autobus je uspešno uklonjen!",
			color: "success",
			icon: "i-heroicons-check-circle",
		});

		emit("bus:deleted");
	}
	catch (error) {
		console.error(error);

		toast.add({
			title: "Greška!",
			description: "Došlo je do greške prilikom uklanjanja autobusa!",
			color: "error",
			icon: "i-heroicons-x-circle",
		});
	}
	finally {
		isDeleteModalOpen.value = false;
	}
};
</script>

<template>
	<UDropdownMenu
		:items="actionItems"
		:ui="{
			item: 'cursor-pointer',
		}"
	>
		<UButton
			icon="lucide:settings"
			color="neutral"
			variant="ghost"
			class="cursor-pointer"
			:ui="{
				leadingIcon: 'hover:rotate-90 transition-transform duration-300',
			}"
		/>

		<template #delete-button>
			<UButton
				label="Ukloni"
				icon="material-symbols:delete-outline"
				color="error"
				variant="ghost"
				class="cursor-pointer w-full px-0"
				@click="isDeleteModalOpen = true"
			/>
		</template>
	</UDropdownMenu>

	<UModal
		:open="isDeleteModalOpen"
		title="Potvrdite uklanjanje autobusa"
		description="Ova akcija je nepovratna i nakon uklanjanja autobus ne može biti vraćen."
		:close="false"
	>
		<template #footer>
			<div class="flex justify-end gap-2 w-full">
				<UButton
					label="Odustani"
					variant="ghost"
					class="cursor-pointer"
					@click="isDeleteModalOpen = false"
				/>
				<UButton
					label="Ukloni"
					color="error"
					class="cursor-pointer"
					@click="handleDeleteBus"
				/>
			</div>
		</template>
	</UModal>
</template>
