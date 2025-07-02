<script setup lang="ts">
import type { DropdownMenuItem } from "@nuxt/ui";

const props = defineProps<{
	busId: string;
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
		onSelect: () => {
			console.log(`Uklonjen je autobus ${props.busId}`);
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
