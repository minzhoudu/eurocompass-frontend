<script setup lang="ts">
defineProps<{
	isMobile: boolean;
	isOpen: boolean;
	onClick: () => void;
}>();
</script>

<template>
	<div
		class="flex items-center p-3"
		:class="{
			'justify-between': isMobile,
			'justify-center': !isMobile,
		}"
	>
		<div>
			<h1>LOGO</h1>
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
