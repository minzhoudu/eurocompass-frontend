<script setup lang="ts">
defineProps<{
	isSaveDisabled: boolean;
	isPending: boolean;
}>();

const emit = defineEmits<{
	(e: "save"): Promise<void>;
	(e: "cancel"): void;
}>();
</script>

<template>
	<div class="flex justify-end gap-2">
		<UButton
			color="success"
			class="cursor-pointer"
			:disabled="isSaveDisabled"
			:loading="isPending"
			@click="emit('save')"
		>
			Sačuvaj promene
		</UButton>

		<UButton
			color="error"
			class="cursor-pointer"
			:disabled="isSaveDisabled"
			@click="emit('cancel')"
		>
			Otkaži
		</UButton>
	</div>
</template>
