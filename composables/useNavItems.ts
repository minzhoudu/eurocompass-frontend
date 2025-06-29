import type { NavigationMenuItem } from "@nuxt/ui";
import { useAuthStore } from "@/stores/auth";

export const useNavItems = () => {
	const route = useRoute();

	const authStore = useAuthStore();
	const isLoggedIn = computed(() => !!authStore.user);
	const isAdmin = computed(() => authStore.user?.role === "ADMIN");

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

		const userMenu: NavigationMenuItem[] = isLoggedIn.value
			? [{
					label: authStore.user?.name || "Profil",
					icon: "i-lucide-user",
					avatar: {
						src: authStore.user?.avatar,
						alt: authStore.user?.name?.[0] || "U",
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
				}]
			: [{
					label: "Prijavi se",
					icon: "i-lucide-log-in",
					to: "/login",
				}];

		return [mainMenu, userMenu];
	});
};
