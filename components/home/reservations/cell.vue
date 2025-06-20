<script setup lang="ts">
const props = defineProps<{
	label: string;
	type: "start" | "end" | "time";
}>();

const icon = computed(() => {
	switch (props.type) {
		case "start":
		default:
			return "lucide:home";
		case "end":
			return "lucide:bus";
		case "time":
			return "lucide:clock";
	}
});
</script>

<template>
	<div class="flex items-center justify-center sm:justify-start gap-2">
		<Icon
			:name="icon"
			size="24"
		/>
		<h3 class="md:text-xl font-semibold">
			{{ label }}
		</h3>
	</div>
</template>
<!-- lucide:clock -->
