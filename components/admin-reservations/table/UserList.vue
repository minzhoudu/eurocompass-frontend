<script setup lang="ts">
import type { SearchUser } from "./UserDataForm.vue";

defineProps<{
	users: SearchUser[] | null;
	pending: boolean;
}>();

const emit = defineEmits<{
	(e: "select", user: SearchUser): void;
}>();
</script>

<template>
	<div
		class="flex flex-col gap-5 max-h-[260px] min-w-[250px] overflow-auto"
	>
		<div
			v-if="pending"
			class="flex justify-center items-center h-full"
		>
			<Icon
				size="40"
				name="mdi:loading"
				class="animate-spin"
			/>
		</div>

		<div v-if="!pending && (users === null || users.length === 0)">
			<p class="text-center text-gray-500">
				Nema rezultata
			</p>
		</div>

		<div
			v-else
			class="flex flex-col gap-3"
		>
			<div
				v-for="user in users"
				:key="user.userId"
				class="flex gap-3 bg-gray-500 px-4 py-2 rounded-sm text-white cursor-pointer hover:bg-gray-600 transition-all duration-300"
				@click="emit('select', user)"
			>
				<span>{{ user.name }}</span>
				<span>{{ user.lastName }}</span>
				<span>{{ user.phone }}</span>
			</div>
		</div>
	</div>
</template>
