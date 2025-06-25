<template>
	<div class="flex flex-col lg:flex-row items-center md:px-20 justify-center gap-10 md:gap-20">
		<div class="w-3/4 lg:w-2/3 -order-12 lg:order-1 flex flex-col items-center gap-10">
			<HomeHeroBanner class="lg:hidden" />

			<NuxtImg
				src="/svgs/map.svg"
				loading="eager"
				class="max-h-[70vh]"
			/>
		</div>

		<div class="flex flex-col gap-5 w-2/3 lg:w-1/3 order-2 lg:order-2">
			<HomeHeroBanner class="hidden lg:flex" />

			<p class="xl:text-lg lg:w-4/5">
				EUROCOMPASS je kompanija koja se bavi organizacijom putovanja i turističkim uslugama.
				Prilagođavamo putovanja svim potrebama i željama naših klijenata.
			</p>
		</div>
	</div>
</template>
