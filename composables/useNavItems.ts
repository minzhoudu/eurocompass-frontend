import type { NavigationMenuItem } from "@nuxt/ui";
import { useUserStore } from "@/stores/auth";

export const useNavItems = () => {
	const route = useRoute();

	const userStore = useUserStore();
	const isAdmin = computed(() => userStore.user?.role === "ADMIN");

	return computed<NavigationMenuItem[][]>(() => {
		const mainMenu: NavigationMenuItem[] = [
			{
				label: "Home",
				icon: "i-lucide-home",
				to: "/",
			},
			{
				label: "Informacije",
				icon: "i-lucide-info",
			},
		];

		const userMenu: NavigationMenuItem[] = [{
			label: userStore.user?.name || "Profil",
			icon: "i-lucide-user",
			avatar: {
				src: userStore.user?.avatar,
				alt: userStore.user?.name?.[0] || "U",
				size: "sm",
			},
			children: [
				...(isAdmin.value
					? [
							{
								label: "Admin Panel",
								icon: "i-lucide-shield",
								to: "/admin",
								active: route.path.startsWith("/admin"),
							},
						]
					: []),
				{
					label: "Profil",
					icon: "i-lucide-user",
					// to: "/profile",
				},
				{
					label: "Settings",
					icon: "i-lucide-settings",
					// to: "/settings",
				},
				{
					label: "Odjava",
					icon: "i-lucide-log-out",
					// to: "/logout",
				},
			],
		}];

		return [mainMenu, userMenu];
	});
};
