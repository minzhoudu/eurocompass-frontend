<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";
import * as z from "zod";

const props = defineProps<{
	submitDisabled: boolean;
}>();

const schema = z.object({
	name: z.string().min(1, "Name is required"),
	lastName: z.string().min(1, "Last name is required"),
	phone: z.string().min(1, "Phone number is required"),
});

type Schema = z.output<typeof schema>;

const state = ref<Schema>({
	name: "",
	lastName: "",
	phone: "",
});

export type SearchUser = {
	name: string;
	lastName: string;
	phone: string;
	userId: string;
};

const searchQuery = ref({
	name: "",
	lastName: "",
	phone: "",
});

const debouncedUpdateQuery = useDebounceFn(() => {
	searchQuery.value = {
		name: state.value.name.trim(),
		lastName: state.value.lastName.trim(),
		phone: state.value.phone.trim(),
	};
}, 500);

watch(
	() => [state.value.name, state.value.lastName, state.value.phone],
	() => {
		debouncedUpdateQuery();
	},
	{ deep: true },
);

const { data: users, status } = await useLazyFetch<SearchUser[]>("/apis/admin/search", {
	query: searchQuery,
	immediate: false,
	default: () => [],
});

const isPending = computed(() => status.value === "pending");

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
	const user = {
		name: event.data.name,
		lastName: event.data.lastName,
		phone: event.data.phone,
	};

	emit("submit", user);
};

const onSelectUser = (user: SearchUser) => {
	state.value = {
		name: user.name,
		lastName: user.lastName,
		phone: user.phone,
	};
};

const resetForm = () => {
	state.value = {
		name: "",
		lastName: "",
		phone: "",
	};
};

const emit = defineEmits<{
	(e: "submit", body: {
		name: string;
		lastName: string;
		phone: string;
	}): void;
}>();
</script>

<template>
	<UModal
		title="Podaci o korisniku"
		description="Unesite podatke za rezervaciju"
		:ui="{
			content: 'max-w-max',
		}"
	>
		<UButton
			label="Rezerviši"
			class="cursor-pointer"
			:disabled="props.submitDisabled"
		/>

		<template #body>
			<div class="flex w-[800px] justify-evenly">
				<UForm
					:schema="schema"
					:state="state"
					class="space-y-4 flex flex-col items-center"
					@submit="onSubmit"
				>
					<UFormField
						label="Ime"
						name="name"
					>
						<UInput
							v-model="state.name"
							class="w-60"
						/>
					</UFormField>

					<UFormField
						label="Prezime"
						name="lastName"
					>
						<UInput
							v-model="state.lastName"
							class="w-60"
						/>
					</UFormField>

					<UFormField
						label="Broj telefona"
						name="phone"
					>
						<UInput
							v-model="state.phone"
							class="w-60"
						/>
					</UFormField>

					<div class="flex gap-4 w-full">
						<UButton
							class="flex justify-center font-bold cursor-pointer flex-1"
							color="error"
							variant="outline"
							@click="resetForm"
						>
							Resetuj
						</UButton>
						<UButton
							type="submit"
							class="flex justify-center font-bold cursor-pointer flex-1"
							:disabled="!schema.safeParse(state).success"
						>
							Rezerviši
						</UButton>
					</div>
				</UForm>

				<AdminReservationsTableUserList
					:users="users"
					:pending="isPending"
					@select="onSelectUser"
				/>
			</div>
		</template>
	</UModal>
</template>
