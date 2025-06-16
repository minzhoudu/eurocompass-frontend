<script setup lang="ts">
defineProps<{
	isOpen: boolean;
	onClick: () => void;
}>();
</script>

<template>
	<div
		class="flex items-center p-3 md:py-4 bg-warning-300 justify-between md:border-b md:border-b-white md:justify-center"
	>
		<div class="flex items-center gap-2 text-xl font-bold tracking-wider pointer-events-none select-none">
			<Icon name="i-lucide-compass" />
			<h1>EUROCOMPASS</h1>
		</div>

		<div
			class="items-center justify-center gap-4 flex md:hidden"
		>
			<button
				class="flex items-center justify-center "
				@click="onClick"
			>
				<UIcon
					name="i-lucide-menu"
					size="24"
				/>
			</button>
		</div>
	</div>
</template>
