<script setup lang="ts">
const calendarValue = ref();
</script>

<template>
	<div class="container flex flex-col justify-center gap-10">
		<div class="w-fit mx-auto my-4 py-3 px-4 rounded-xl bg-warning-300">
			Home page
		</div>

		<div class="w-60 mx-auto">
			<UCalendar
				v-model="calendarValue"
				initial-focus
				color="warning"
				range
				:ui="{
					headCell: 'text-warning-300',
					cellTrigger: 'data-today:not-data-[selected]:text-warning-300 data-[selected]:bg-warning-300',
				}"
			/>

			<h1 v-if="calendarValue">
				Choosen date
			</h1>

			<div v-if="calendarValue">
				Start: {{ calendarValue['start'] }}
				<br>
				End: {{ calendarValue['end'] }}
			</div>
		</div>
	</div>
</template>
