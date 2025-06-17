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
				class="flex items-center justify-center transition-transform duration-300 ease-in-out"
				:class="{ 'rotate-90': isOpen }"
				@click="onClick"
			>
				<UIcon
					:name="isOpen ? 'i-lucide-x' : 'i-lucide-menu'"
					size="24"
					class="transition-all duration-200 ease-in-out"
				/>
			</button>
		</div>
	</div>
</template>
