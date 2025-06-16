<script setup lang="ts">
defineProps<{
	isMobile: boolean;
	isOpen: boolean;
	onClick: () => void;
}>();
</script>

<template>
	<div
		class="flex items-center p-3 bg-warning-300"
		:class="{
			'justify-between': isMobile,
			'justify-center': !isMobile,
		}"
	>
		<div class="flex items-center gap-2 text-xl font-bold tracking-wider">
			<Icon name="i-lucide-compass" />
			<h1>EUROCOMPASS</h1>
		</div>

		<div
			v-if="isMobile"
			class="flex items-center justify-center gap-4"
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
