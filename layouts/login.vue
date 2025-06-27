<template>
	<div>
		<div
			class="flex flex-col items-center p-3 md:py-4 bg-warning-300 justify-between md:border-b md:border-b-white md:justify-center"
		>
			<div class="flex items-center gap-2 text-xl font-bold tracking-wider pointer-events-none select-none">
				<Icon name="i-lucide-compass" />
				<h1>EUROCOMPASS</h1>
			</div>
		</div>

		<div>
			<slot />
		</div>
	</div>
</template>
