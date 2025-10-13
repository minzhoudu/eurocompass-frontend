<template>
	<div
		class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
	>
		<USkeleton
			v-for="i in 4"
			:key="i"
			class="h-48"
		>
			<USkeleton class="h-14 bg-warning-300" />

			<USkeleton class="flex flex-col gap-2 justify-center mt-4 ml-4">
				<USkeleton class="h-6 bg-slate-300 w-1/2" />
				<USkeleton class="h-6 bg-slate-300 w-1/2" />
			</USkeleton>
		</USkeleton>
	</div>
</template>
