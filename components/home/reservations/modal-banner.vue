<script setup lang="ts">
defineProps<{
	user: User | null;
}>();
</script>

<template>
	<AppBanner
		v-if="!user"
		title="Prijavi se"
		description="Da biste rezervisali sedište, morate biti prijavljeni na svoj nalog."
		navigate-to="/login"
		button-label="Prijavi se"
		button-icon="lucide:log-in"
	/>

	<AppBanner
		v-else-if="user && !user.phone"
		title="Popuni broj telefona"
		description="Da biste rezervisali sedište, morate popuniti svoj broj telefona."
		navigate-to="/user/profile"
		button-label="Profil"
		button-icon="lucide:user"
	/>
</template>
