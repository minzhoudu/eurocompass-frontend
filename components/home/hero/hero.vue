<script setup lang="ts">
const { locales, setLocale } = useI18n();
</script>

<template>
	<div class="flex flex-col lg:flex-row items-center md:px-20 justify-center gap-10 md:gap-20">
		<div class="w-3/4 lg:w-1/2 -order-12 lg:order-1 flex flex-col items-center gap-10">
			<HomeHeroBanner class="lg:hidden" />

			<NuxtImg
				src="/svgs/map.svg"
				loading="eager"
			/>
		</div>

		<div class="flex flex-col gap-5 w-2/3 lg:w-1/3 order-2 lg:order-2">
			<HomeHeroBanner class="hidden lg:flex" />

			<p class="xl:text-lg">
				{{ $t("home.hero.description") }}
			</p>

			<div class="flex gap-2">
				<button
					v-for="locale in locales"
					:key="locale.code"
					class="cursor-pointer border border-gray-300 rounded-md px-2 py-1 hover:bg-gray-100 transition-colors duration-300"
					@click="setLocale(locale.code)"
				>
					{{ locale.name }}
				</button>
			</div>
		</div>
	</div>
</template>
