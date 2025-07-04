<script setup lang="ts">
import type { DropdownMenuItem } from "@nuxt/ui";

const props = defineProps<{
	busId: string;
}>();

const toast = useToast();

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
		label: "Ukloni",
		icon: "material-symbols:delete-outline",
		color: "error",
		onSelect: async () => {
			try {
				await $fetch(`/apis/buses/${props.busId}`, {
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
		},
	},
];
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
	</UDropdownMenu>
</template>
