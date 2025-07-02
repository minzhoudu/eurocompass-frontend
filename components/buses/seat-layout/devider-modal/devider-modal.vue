<script setup lang="ts">
const deviderText = ref("");

const open = ref(false);

const emit = defineEmits<{
	(e: "update:devider", text: string): void;
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
					v-model="deviderText"
					class="w-full"
				/>

				<UButton
					label="Sačuvaj"
					class="cursor-pointer"
					:disabled="!deviderText"
					@click="emit('update:devider', deviderText); open = false; deviderText = ''"
				/>
			</div>
		</template>
	</UModal>
</template>
