<script setup lang="ts">
import type { Location } from "./types";

defineProps<{
	item?: Location;
}>();
</script>

<template>
	<p class="font-bold">
		{{ item?.from }}
	</p>

	<Icon
		name="i-lucide:arrow-right"
		size="14"
		class="font-bold"
	/>

	<p class="font-bold">
		{{ item?.to }}
	</p>
</template>
