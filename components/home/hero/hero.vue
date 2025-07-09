<template>
	<div class="flex flex-col lg:flex-row items-center md:px-20 justify-center gap-10 md:gap-20 mb-10 lg:mb-0">
		<div class="w-3/4 lg:w-1/2 -order-12 lg:order-1 flex flex-col items-center gap-10">
			<HomeHeroBanner class="lg:hidden" />

			<NuxtImg
				src="/svgs/map.svg"
				loading="eager"
				:preload="{ fetchPriority: 'high' }"
			/>
		</div>

		<div class="flex flex-col gap-5 w-2/3 lg:w-1/3 order-2 lg:order-2">
			<HomeHeroBanner class="hidden lg:flex" />

			<p class="xl:text-lg">
				EUROCOMPASS je kompanija koja se bavi organizacijom putovanja i turističkim uslugama.
				Prilagođavamo putovanja svim potrebama i željama naših klijenata.
			</p>
		</div>

		<div class="absolute w-full bottom-0 hidden lg:block">
			<NuxtImg
				src="/svgs/wave.svg"
			/>
		</div>
	</div>
</template>
