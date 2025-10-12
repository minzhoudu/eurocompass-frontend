<script setup lang="ts">
import SettingsActions from "./settings-actions.vue";
import PlatformRow from "./platform-row.vue";

const settingsStore = useSettingsStore();
</script>

<template>
	<div class="flex flex-col items-center justify-center">
		<UCard class="w-full max-w-2xl mb-3">
			<template #header>
				<div class="text-2xl font-bold text-center">
					Peroni
				</div>
			</template>

			<div class="flex flex-col gap-2">
				<PlatformRow
					v-for="platform in settingsStore.defaultPlatforms"
					:key="platform.id"
					:platform="platform"
				/>
			</div>
		</UCard>

		<UCard class="w-full max-w-2xl">
			<template #header>
				<div class="text-2xl font-bold text-center">
					Podešavanja
				</div>
			</template>

			<SettingsFields />
		</UCard>
	</div>
</template>
