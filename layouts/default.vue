<script setup lang="ts">
import { useMediaQuery } from "@vueuse/core";

const isMobile = useMediaQuery("(max-width: 768px)", { ssrWidth: 768 });
const isOpen = ref(false);

const items = useNavItems();

const showMenu = computed(() => {
	if (isMobile.value) {
		return isOpen.value;
	}
	return true;
});
</script>

<template>
	<div class="flex flex-col min-h-screen">
		<AppHeader
			:is-open="isOpen"
			@click="isOpen = !isOpen"
		/>

		<UNavigationMenu
			v-if="showMenu"
			:items="items"
			class="justify-around w-full bg-warning-300 pb-1"
			color="neutral"
			content-orientation="vertical"
			:orientation="isMobile ? 'vertical' : 'horizontal'"
			:ui="{
				link: 'md:text-lg text-black data-[state=open]:text-black/50 hover:text-black/50',
				linkLeadingIcon: 'text-black group-data-[state=open]:text-black/50 group-hover:text-black/50',
				list: 'gap-2',
				childItem: 'not-last:border-b not-last:border-b-white',
				separator: 'bg-white',
			}"
		/>

		<div>
			<slot />
		</div>
	</div>
</template>
