<script setup lang="ts">
import type { TabsItem } from "@nuxt/ui";

const items = ref<TabsItem[]>([
	{
		label: "Informacije",
		icon: "i-lucide-user",
		content: "Informacije o korisniku",
		slot: "profile",
		value: "informations",
	},
	{
		label: "Rezervacije",
		icon: "i-lucide-calendar",
		content: "Rezervacije korisnika",
		slot: "reservations",
		value: "reservations",
	},
]);

const activeTab = ref();

const route = useRoute();
onMounted(() => {
	activeTab.value = route.query.tab as string || "informations";
});

const router = useRouter();
const handleTabChange = (value: string | number) => {
	router.push({ query: { tab: value } });
};
</script>

<template>
	<div
		class="container mt-10"
	>
		<UTabs
			v-model="activeTab"
			:items="items"
			:ui="{
				list: 'lg:w-1/2 mx-auto',
			}"
			@update:model-value="handleTabChange"
		>
			<template #profile>
				<UserProfile />
			</template>

			<template #reservations>
				<UserReservationList />
			</template>
		</UTabs>
	</div>
</template>
