<script setup lang="ts">
const authStore = useAuthStore();

const loginProviders = [
	{
		label: "Google",
		icon: "flat-color-icons:google",
		click: authStore.googleLogin,
	},
];

const isSingleProvider = computed(() => loginProviders.length === 1);
</script>

<template>
	<div class="container h-[calc(100vh-10rem)] flex items-center justify-center">
		<UCard class="bg-warning-300 divide-white w-full max-w-[700px]">
			<template #header>
				<div class="flex flex-col items-center">
					<h2 class="text-xl md:text-2xl font-bold">
						Login
					</h2>
				</div>
			</template>

			<div
				class="grid gap-4 place-items-center"
				:class="{ 'grid-cols-2': !isSingleProvider }"
			>
				<UButton
					v-for="provider in loginProviders"
					:key="provider.label"
					class="cursor-pointer px-5 py-2"
					:icon="provider.icon"
					@click="provider.click"
				>
					Google Login
				</UButton>
			</div>

			<template #footer>
				<p class="text-center text-sm text-gray-500">
					Trenutno je dostupan samo Google login.
				</p>
			</template>
		</UCard>
	</div>
</template>
