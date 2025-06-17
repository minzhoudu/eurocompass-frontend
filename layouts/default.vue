<script setup lang="ts">
import { useMediaQuery } from "@vueuse/core";

const isMobile = useMediaQuery("(max-width: 768px)", { ssrWidth: 768 });
const isOpen = ref(false);

const items = useNavItems();

// const showMenu = computed(() => {
// 	if (isMobile.value) {
// 		return isOpen.value;
// 	}
// 	return true;
// });
</script>

<template>
	<div class="flex flex-col min-h-screen">
		<AppHeader
			:is-open="isOpen"
			@click="isOpen = !isOpen"
		/>

		<!-- Desktop Navigation - Always visible -->
		<UNavigationMenu
			:items="items"
			class="justify-around w-full bg-warning-300 pb-1 hidden md:flex"
			color="neutral"
			content-orientation="vertical"
			orientation="horizontal"
			:ui="{
				link: 'md:text-lg text-black data-[state=open]:text-black/50 hover:text-black/50',
				linkLeadingIcon: 'text-black group-data-[state=open]:text-black/50 group-hover:text-black/50',
				list: 'gap-2',
				childItem: 'not-last:border-b not-last:border-b-white',
				separator: 'bg-white',
			}"
		/>

		<!-- Mobile Navigation - Animated -->
		<Transition
			name="mobile"
		>
			<div
				v-if="isOpen"
				class="mobile-nav-wrapper md:hidden"
			>
				<UNavigationMenu
					:items="items"
					class="justify-around w-full bg-warning-300 pb-1 overflow-hidden"
					color="neutral"
					content-orientation="vertical"
					orientation="vertical"
					:ui="{
						link: 'md:text-lg text-black data-[state=open]:text-black/50 hover:text-black/50',
						linkLeadingIcon: 'text-black group-data-[state=open]:text-black/50 group-hover:text-black/50',
						list: 'gap-2',
						childItem: 'not-last:border-b not-last:border-b-white',
						separator: 'bg-white',
					}"
				/>
			</div>
		</Transition>

		<div>
			<slot />
		</div>
	</div>
</template>

<style scoped>
/* Mobile Navigation Animation */
.mobile-nav-wrapper {
	overflow: hidden;
}

.mobile-enter-active,
.mobile-leave-active {
	transition: all 0.3s ease-in-out;
}

.mobile-enter-from {
	max-height: 0;
	opacity: 0;
	transform: translateY(-10px);
}

.mobile-enter-to {
	max-height: 500px;
	opacity: 1;
	transform: translateY(0);
}

.mobile-leave-from {
	max-height: 500px;
	opacity: 1;
	transform: translateY(0);
}

.mobile-leave-to {
	max-height: 0;
	opacity: 0;
	transform: translateY(-10px);
}
</style>
