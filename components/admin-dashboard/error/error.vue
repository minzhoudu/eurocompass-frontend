<script setup lang="ts">
defineProps<{
	isInfoError: boolean;
}>();
</script>

<template>
	<div class="flex flex-col items-center w-full bg-warning-300 text-error font-semibold py-3">
		<h1 class="text-lg">
			Došlo je do greške pri dobavljanju informacija o {{ isInfoError ? "autobusima"
				: "polascima" }}. Pokušajte ponovo.
		</h1>
		<p class="text-error/90">
			Ako se greška ponovi, molimo prijavite problem.
		</p>

		<UButton
			label="Pokušajte ponovo"
			class="cursor-pointer mt-4"
			@click="() => $router.go(0)"
		/>
	</div>
</template>
