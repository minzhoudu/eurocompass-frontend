<script setup lang="ts">
import type { Location } from "./types";

defineProps<{
	item: Location;
}>();
</script>

<template>
	<div class="flex items-center gap-2">
		{{ item.from }}
		<Icon
			name="i-lucide:arrow-right"
			size="14"
		/>
		{{ item.to }}
	</div>
</template>
