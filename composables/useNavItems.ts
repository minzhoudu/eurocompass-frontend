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
			to: "/informacije",
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
					to: "/profil",
				},
				{
					label: "Settings",
					icon: "i-lucide-settings",
					to: "/settings",
				},
				{
					label: "Odjava",
					icon: "i-lucide-log-out",
					to: "/odjava",
				},
			],
		},
	],
	]);
};
