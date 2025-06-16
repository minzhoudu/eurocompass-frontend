<script setup lang="ts">
const items = useNavItems();
</script>

<template>
	<div>
		<UNavigationMenu
			:items="items"
			class="justify-evenly w-full "
			color="neutral"
			content-orientation="vertical"
		>
			<template #colormode>
				<AppColorMode />
			</template>
		</UNavigationMenu>

		<div>
			<slot />
		</div>
	</div>
</template>
