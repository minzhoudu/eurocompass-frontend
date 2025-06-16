<script setup lang="ts">
import { useMediaQuery } from "@vueuse/core";

const items = useNavItems();

const isMobile = useMediaQuery("(max-width: 768px)", { ssrWidth: 769 });
const isOpen = ref(false);

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
			v-if="isMobile"
			:is-open="isOpen"
			:is-mobile="isMobile"
			@click="isOpen = !isOpen"
		/>

		<UNavigationMenu
			v-if="showMenu"
			:items="items"
			class="justify-evenly w-full bg-warning-300"
			color="neutral"
			content-orientation="vertical"
			:orientation="isMobile ? 'vertical' : 'horizontal'"
			:ui="{
				link: 'md:text-lg text-black data-[state=open]:text-black/50 hover:text-black/50',
				linkLeadingIcon: 'text-black group-data-[state=open]:text-black/50 group-hover:text-black/50',
				list: 'gap-2',
			}"
		>
			<template
				v-if="!isMobile"
				#custom
			>
				<NuxtLink to="/profile">
					<h1>Profile</h1>
				</NuxtLink>
			</template>
		</UNavigationMenu>

		<div>
			<slot />
		</div>
	</div>
</template>
