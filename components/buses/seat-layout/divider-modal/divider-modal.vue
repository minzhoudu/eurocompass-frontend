<script setup lang="ts">
const dividerText = ref("");

const open = ref(false);

const emit = defineEmits<{
	(e: "update:divider", text: string): void;
}>();

const handleUpdateDivider = (event: KeyboardEvent) => {
	if (!dividerText.value) return;

	if (event.key === "Enter") {
		emit("update:divider", dividerText.value);
		open.value = false;
		dividerText.value = "";
	}
};
</script>

<template>
	<UModal
		title="Naziv sprata"
		description="Unesite naziv sprata. (npr. I, II, prvi sprat, donji sprat...)"
		:open="open"
		@update:open="(value) => { open = value }"
	>
		<Icon
			name="tabler:separator-horizontal"
			class="cursor-pointer"
			size="24"
			@click="open = true"
		/>

		<template #body>
			<div
				class="flex gap-2 p-5"
				@keydown="handleUpdateDivider"
			>
				<UInput
					v-model="dividerText"
					:autofocus="true"
					class="w-full"
					leading-icon="tabler:separator-horizontal"
				/>

				<UButton
					label="Sačuvaj"
					class="cursor-pointer"
					:disabled="!dividerText"
					@click="emit('update:divider', dividerText); open = false; dividerText = ''"
				/>
			</div>
		</template>
	</UModal>
</template>
