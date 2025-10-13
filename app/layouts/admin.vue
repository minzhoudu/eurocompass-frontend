<script setup lang="ts">
const route = useRoute();

const adminNavItems = useAdminNavItems();

const isNavOpen = ref(false);

watch(route, () => {
	isNavOpen.value = false;
});

defineShortcuts({
	meta_k: () => {
		isNavOpen.value = !isNavOpen.value;
	},
});
</script>

<template>
	<NuxtLayout name="default">
		<USlideover
			v-model:open="isNavOpen"
			title="Admin Panel"
			description="Upravljački centar"
			side="left"
			close-icon="tabler:arrow-autofit-left-filled"
			:ui="{
				content: 'w-80',
				body: 'sm:p-2',
				title: 'text-2xl font-bold',
			}"
		>
			<template #body>
				<UNavigationMenu
					orientation="vertical"
					:items="adminNavItems"
					:ui="{
						link: 'py-3',
					}"
				/>
			</template>

			<UTooltip
				text="Otvori navigaciju"
				:kbds="['meta', 'K']"
				:delay-duration="0"
			>
				<UButton
					icon="tabler:arrow-autofit-right-filled"
					color="neutral"
					variant="subtle"
					class="absolute top-4 left-4"
				/>
			</UTooltip>
		</USlideover>

		<div>
			<slot />
		</div>
	</NuxtLayout>
</template>
