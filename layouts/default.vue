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
	<div class="flex flex-col h-screen">
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

			<button
				v-if="isMobile"
				class="self-end flex items-center justify-center "
				@click="isOpen = !isOpen"
			>
				<UIcon
					name="i-lucide-menu"
					size="24"
				/>
			</button>
		</div>

		<UNavigationMenu
			v-if="showMenu"
			:items="items"
			class="justify-evenly w-full"
			color="neutral"
			content-orientation="vertical"
			:orientation="isMobile ? 'vertical' : 'horizontal'"
		>
			<template #colormode>
				<AppColorMode />
			</template>
		</UNavigationMenu>

		<div>
			<slot />
		</div>
	</div>
</template>
