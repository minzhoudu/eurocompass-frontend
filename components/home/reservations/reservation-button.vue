<script setup lang="ts">
import { mockSeats } from "@/mock/seats";

defineProps<{
	label: string;
	reservationId: number;
}>();
</script>

<template>
	<UModal
		title="Rezervacija"
		description="Izaberite svoje sedište"
	>
		<UButton
			:label="label"
			variant="solid"
			color="neutral"
			size="sm"
			class="py-2 cursor-pointer"
			icon="lucide:ticket"
		/>

		<template #body>
			<div>
				<AppBusSeatLayout
					:seats="mockSeats"
				/>
			</div>
		</template>

		<template
			#footer
		>
			<div class="flex gap-2 w-full justify-end">
				<UButton
					label="Odustani"
					variant="outline"
					color="error"
				/>
				<UButton
					label="Rezerviši"
				/>
			</div>
		</template>
	</UModal>
</template>
