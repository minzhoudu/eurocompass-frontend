<script setup lang="ts">
import { DateFormatter, getLocalTimeZone, type DateValue } from "@internationalized/date";

type DatePickerProps = {
	enableAllDates?: boolean;
	modelValue?: DateValue;
	placeholder?: string;
};

const { currentDate } = useCurrentDate();

const isDateUnavailable = (date: DateValue) => {
	return date.toDate(getLocalTimeZone()) < currentDate.value.toDate(getLocalTimeZone()) || date.toDate(getLocalTimeZone()) > currentDate.value.add({ days: 30 }).toDate(getLocalTimeZone()); ;
};

const props = withDefaults(defineProps<DatePickerProps>(), {
	placeholder: "Izaberite datum",
	enableAllDates: false,
});

const emit = defineEmits<{
	(e: "update:modelValue", value: DateValue | undefined): void;
}>();

const df = new DateFormatter("sr-RS", {
	dateStyle: "full",
});

const isPopoverOpen = ref(false);

const dateValue = computed({
	get: () => props.modelValue,
	set: (value) => {
		emit("update:modelValue", value);
		isPopoverOpen.value = false;
	},
});
</script>

<template>
	<UPopover
		v-model:open="isPopoverOpen"
	>
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
				:is-date-unavailable="enableAllDates ? () => false : isDateUnavailable"
			/>
		</template>
	</UPopover>
</template>
