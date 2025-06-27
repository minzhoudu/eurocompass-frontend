import type { NavigationMenuItem } from "@nuxt/ui";
import { useUserStore } from "@/stores/auth";

export const useNavItems = () => {
	const userStore = useUserStore();

	const isAdmin = computed(() => userStore.user?.role === "ADMIN");

	const isLoggedIn = computed(() => !!userStore.user);

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

		const userMenu: NavigationMenuItem[] = [];

		if (isLoggedIn.value) {
			userMenu.push({
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
			});
		}

		if (!isLoggedIn.value) {
			userMenu.push({
				label: "Prijava",
				icon: "i-lucide-log-in",
				to: "/login",
			});
		}

		return [mainMenu, ...(userMenu.length ? [userMenu] : [])];
	});
};
