<script setup lang="ts">
import * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";

const authStore = useAuthStore();

const isMissingInformationAlertOpen = ref(!authStore.user?.phone);

const schema = z.object({
	name: z.string().min(1, "Ime je obavezno"),
	lastName: z.string().min(1, "Prezime je obavezno"),
	phone: z.string().min(8, "Broj telefona je obavezan, mora imati minimum 8 cifara").regex(/^\d+$/, "Dozvoljeni su samo brojevi"),
});

type Schema = z.output<typeof schema>;

const state = reactive<Partial<Schema>>({
	name: authStore.user?.name,
	lastName: authStore.user?.lastName,
	phone: authStore.user?.phone,
});

const isNameValid = computed(() => schema.shape.name.safeParse(state.name).success);
const isLastNameValid = computed(() => schema.shape.lastName.safeParse(state.lastName).success);
const isPhoneValid = computed(() => schema.shape.phone.safeParse(state.phone).success);

async function onSubmit(event: FormSubmitEvent<Schema>) {
	await authStore.updateUser(event.data);
	isMissingInformationAlertOpen.value = false;
}

const handleCancel = () => {
	state.name = authStore.user?.name;
	state.lastName = authStore.user?.lastName;
	state.phone = authStore.user?.phone;
};

const hasChanges = computed(() => {
	return state.name?.trim() !== authStore.user?.name?.trim() || state.lastName?.trim() !== authStore.user?.lastName?.trim() || state.phone?.trim() !== authStore.user?.phone?.trim();
});
</script>

<template>
	<div class="container mt-10">
		<UAlert
			v-if="isMissingInformationAlertOpen"
			v-model:open="isMissingInformationAlertOpen"
			variant="subtle"
			:close="true"
			title="Molimo vas da popunite svoj broj telefona kako biste mogli da rezervišete karte."
			color="error"
			class="mb-10 text-center"
		/>

		<UCard class="md:w-2/3 lg:w-1/2 mx-auto">
			<template #header>
				<div class="flex items-center gap-6">
					<UAvatar
						:src="authStore.user?.picture"
						icon="i-lucide-user"
						size="2xl"
					/>

					<span class="text-2xl font-bold">{{ authStore.user?.name }} {{ authStore.user?.lastName }}</span>
				</div>
			</template>

			<div>
				<UForm
					:schema="schema"
					:state="state"
					class="space-y-4 w-2/3 mx-auto"
					@submit="onSubmit"
				>
					<UFormField
						label="Ime"
						name="name"
					>
						<UInput
							v-model="state.name"
							placeholder="npr. Marko"
						>
							<template #trailing>
								<UIcon
									:name="isNameValid ? 'tabler:check' : 'tabler:x'"
									:class="isNameValid ? 'text-green-500' : 'text-error'"
								/>
							</template>
						</UInput>
					</UFormField>

					<UFormField
						label="Prezime"
						name="lastName"
					>
						<UInput
							v-model="state.lastName"
							placeholder="npr. Marković"
						>
							<template #trailing>
								<UIcon
									:name="isLastNameValid ? 'tabler:check' : 'tabler:x'"
									:class="isLastNameValid ? 'text-green-500' : 'text-error'"
								/>
							</template>
						</UInput>
					</UFormField>

					<UFormField
						label="Broj telefona"
						name="phone"
					>
						<UInput
							v-model="state.phone"
							placeholder="npr. 061123456"
						>
							<template #trailing>
								<UIcon
									:name="isPhoneValid ? 'tabler:check' : 'tabler:x'"
									:class="isPhoneValid ? 'text-green-500' : 'text-error'"
								/>
							</template>
						</UInput>
					</UFormField>

					<div class="flex gap-2">
						<UButton
							type="submit"
							class="cursor-pointer"
							:disabled="!hasChanges"
						>
							Sačuvaj promene
						</UButton>

						<UButton
							v-if="hasChanges"
							color="error"
							variant="outline"
							class="cursor-pointer"
							@click="handleCancel"
						>
							Resetuj promene
						</UButton>
					</div>
				</UForm>
			</div>

			<template #footer>
				<div class="h-8" />
			</template>
		</UCard>
	</div>
</template>
