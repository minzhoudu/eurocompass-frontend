<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";
import { z } from "zod";

import type { ExtendedBusInfo } from "~/components/buses/types";

const route = useRoute();

const { data: bus, pending } = await useLazyFetch<ExtendedBusInfo>(`/apis/buses/${route.params.busId}`);

const schema = z.object({
	name: z.string().min(1),
	registration: z.string().min(1),
});
type Schema = z.output<typeof schema>;

const state = reactive({
	name: "",
	registration: "",
});

effect(() => {
	state.name = bus.value?.name ?? "";
	state.registration = bus.value?.registration ?? "";
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
	console.log(toRaw(event.data));
}
</script>

<template>
	<div class="container mt-10">
		<template v-if="bus && !pending">
			<UForm
				:schema="schema"
				:state="state"
				class="space-y-4"
				@submit="onSubmit"
			>
				<UFormField
					label="Ime"
					name="name"
				>
					<UInput v-model="state.name" />
				</UFormField>

				<UFormField
					label="Registracija"
					name="registration"
				>
					<UInput v-model="state.registration" />
				</UFormField>

				<UButton type="submit">
					Submit
				</UButton>
			</UForm>
		</template>

		<template v-else>
			<USkeleton class="h-10 w-1/2 mx-auto" />
		</template>
	</div>
</template>
