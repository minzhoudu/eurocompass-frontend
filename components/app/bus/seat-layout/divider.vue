<script setup lang="ts">
withDefaults(defineProps<{
	text: string;
	dividerIndex: number;
	deleteButton?: boolean;
}>(), {
	deleteButton: false,
});

const showDeleteButton = ref(false);

const emit = defineEmits<{
	(e: "delete:divider", dividerIndex: number): void;
}>();
</script>

<template>
	<div
		class="w-full col-span-5 flex items-center justify-center gap-2 p-2 h-10"
		@click="deleteButton ? showDeleteButton = !showDeleteButton : null"
		@mouseenter="deleteButton ? showDeleteButton = true : null"
		@mouseleave="deleteButton ? showDeleteButton = false : null"
	>
		<div class="bg-black h-0.5 w-full" />

		<span
			class="text-xs text-gray-700 text-nowrap font-bold"
			:class="{ hidden: showDeleteButton, block: !showDeleteButton }"
		>{{ text }}</span>

		<UButton
			v-if="deleteButton"
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
