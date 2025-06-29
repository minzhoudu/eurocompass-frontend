<script setup lang="ts">
import * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";

const loginCredentialsSchema = z.object({
	email: z.string().email("Invalid email"),
	password: z.string().min(8, "Must be at least 8 characters"),
});

type LoginCredentialsSchema = z.output<typeof loginCredentialsSchema>;

const state = reactive<Partial<LoginCredentialsSchema>>({
	email: undefined,
	password: undefined,
});

const userStore = useUserStore();

const toast = useToast();
async function onSubmit(_event: FormSubmitEvent<LoginCredentialsSchema>) {
	try {
		await $fetch("/apis/users/test", {
			credentials: "include",
		});

		await userStore.fetchUser();

		if (userStore.user) {
			toast.add({
				title: "Uspešno prijavljivanje",
				description: `Zdravo, ${userStore.user.name || "korisniče"}!`,
				color: "success",
			});
			navigateTo("/");
		}
		else {
			throw new Error("Korisnik nije pronađen.");
		}
	}
	catch (error) {
		console.error(error);
		toast.add({
			title: "Greška",
			description: "Došlo je do greške prilikom prijave. Pokušajte ponovno.",
			color: "error",
		});
	}
}
</script>

<template>
	<div class="flex flex-col items-center mt-20">
		<UForm
			:schema="loginCredentialsSchema"
			:state="state"
			class="space-y-4"
			@submit="onSubmit"
		>
			<UFormField
				label="Email"
				name="email"
			>
				<UInput v-model="state.email" />
			</UFormField>

			<UFormField
				label="Password"
				name="password"
			>
				<UInput
					v-model="state.password"
					type="password"
				/>
			</UFormField>

			<UButton type="submit">
				Submit
			</UButton>
		</UForm>
	</div>
</template>
