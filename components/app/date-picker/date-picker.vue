<script setup lang="ts">
import { DateFormatter, getLocalTimeZone, type DateValue } from "@internationalized/date";

type DatePickerProps = {
	modelValue?: DateValue;
	isDateUnavailable?: (date: DateValue) => boolean;
	placeholder?: string;
};

const props = withDefaults(defineProps<DatePickerProps>(), {
	placeholder: "Izaberite datum",
});

const emit = defineEmits<{
	(e: "update:modelValue", value: DateValue | undefined): void;
}>();

const df = new DateFormatter("sr-RS", {
	dateStyle: "full",
});

const dateValue = computed({
	get: () => props.modelValue,
	set: value => emit("update:modelValue", value),
});
</script>

<template>
	<UPopover>
		<UButton
			color="neutral"
			class="bg-white font-bold cursor-pointer md:py-2 md:px-4 min-w-48 justify-center"
			variant="subtle"
			icon="i-lucide-calendar"
		>
			{{ dateValue ? df.format(dateValue.toDate(getLocalTimeZone())) : placeholder }}
		</UButton>

		<template #content>
			<UCalendar
				v-model="dateValue"
				initial-focus
				color="warning"
				:ui="{
					headCell: 'text-warning-300',
					cellTrigger: 'data-today:not-data-[selected]:text-warning-300 data-[selected]:bg-warning-300',
				}"
				:is-date-unavailable="isDateUnavailable"
			/>
		</template>
	</UPopover>
</template>
