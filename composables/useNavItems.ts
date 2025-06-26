import type { NavigationMenuItem } from "@nuxt/ui";

export const useNavItems = () => {
	const isAdmin = true;

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
				alt: "P",
				size: "sm",
			},
			children: [
				...(isAdmin
					? [{
							label: "Admin Panel",
							icon: "i-lucide-shield",
							to: "/admin",
						}]
					: []),
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
