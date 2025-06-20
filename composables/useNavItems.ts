import type { NavigationMenuItem } from "@nuxt/ui";

export const useNavItems = () => {
	return ref<NavigationMenuItem[][]>([[

		{
			label: "Home",
			icon: "i-lucide-home",
			to: "/",
		},
		{
			label: "Informacije",
			icon: "i-lucide-info",
		},
	],
	[
		{
			label: "Pavle",
			icon: "i-lucide-user",
			avatar: {
				src: "https://github.com/minzhoudu.png",
				size: "sm",
			},
			children: [
				{
					label: "Profil",
					icon: "i-lucide-user",
				},
				{
					label: "Settings",
					icon: "i-lucide-settings",
				},
				{
					label: "Odjava",
					icon: "i-lucide-log-out",
				},
			],
		},
	],
	]);
};
