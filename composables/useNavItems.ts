import type { NavigationMenuItem } from "@nuxt/ui";

export const useNavItems = () => {
	return ref<NavigationMenuItem[][]>([[

		{
			label: "Home",
			icon: "i-lucide-home",
			to: "/",
		},
		{
			label: "Rezervacije",
			icon: "i-lucide-calendar",
			to: "/rezervacije",
			children: [
				{
					label: "Sve rezervacije",
					icon: "i-lucide-calendar",
					to: "/rezervacije",
				},
			],
		},
	],
	[
		{
			label: "EUROCOMPASS",
			icon: "i-lucide-compass",
			class: "logo",
		},
	],
	[
		{
			label: "Settings",
			icon: "i-lucide-settings",
			to: "/settings",
		},
		{
			slot: "custom",
		},
	],
	]);
};
