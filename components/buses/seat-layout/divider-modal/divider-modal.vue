<script setup lang="ts">
const dividerText = ref("");

const open = ref(false);

const emit = defineEmits<{
	(e: "update:divider", text: string): void;
}>();
</script>

<template>
	<UModal
		title="Naziv sprata"
		description="Unesite naziv sprata. (npr. prvi sprat, donji sprat...)"
		:open="open"
		:close="{ onClick: () => { open = false } }"
	>
		<Icon
			name="tabler:separator-horizontal"
			class="cursor-pointer"
			size="24"
			@click="open = true"
		/>

		<template #body>
			<div class="flex gap-2 p-5">
				<UInput
					v-model="dividerText"
					class="w-full"
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
