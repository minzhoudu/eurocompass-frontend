<script setup lang="ts">
defineProps<{
	text: string;
	dividerIndex: number;
}>();

const showDeleteButton = ref(false);

const emit = defineEmits<{
	(e: "delete:divider", dividerIndex: number): void;
}>();
</script>

<template>
	<div
		class="w-full col-span-5 flex items-center justify-center gap-2 p-2 h-10"
		@click="showDeleteButton = !showDeleteButton"
		@mouseenter="showDeleteButton = true"
		@mouseleave="showDeleteButton = false"
	>
		<div class="bg-black h-0.5 w-full" />

		<span
			class="text-xs text-gray-700 text-nowrap font-bold"
			:class="{ hidden: showDeleteButton, block: !showDeleteButton }"
		>{{ text }}</span>

		<UButton
			icon="tabler:trash"
			size="xs"
			color="error"
			class="cursor-pointer bg-white text-black border outline-none transition-all duration-300"
			:class="{ hidden: !showDeleteButton, flex: showDeleteButton }"
			@click.stop="emit('delete:divider', dividerIndex)"
		/>

		<div class="bg-black h-0.5 w-full" />
	</div>
</template>
