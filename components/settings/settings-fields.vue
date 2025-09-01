<script setup lang="ts">
import type { Settings } from "./settings.types";

const userSeatLimit = defineModel<Settings["userSeatLimit"]>("user-seat-limit");
</script>

<template>
	<div class="flex gap-2 justify-center">
		<div class="flex gap-5 items-center">
			<h2 class="lg:text-lg font-bold">
				Limit sedišta za rezervaciju:
			</h2>

			<UInputNumber
				v-model="userSeatLimit"
				class="max-w-32"
				:min="1"
			/>
		</div>
	</div>
</template>
