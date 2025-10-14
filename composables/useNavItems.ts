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
						src: authStore.user?.picture,
						size: "sm",
						icon: "i-lucide-user",
					},
					children: [
						...(isAdmin.value
							? [
									{
										label: "Admin Panel",
										icon: "i-lucide-shield",
										to: "/admin",
										active: route.path.startsWith("/admin") && !route.path.startsWith("/admin/settings"),
									},
									{
										label: "Podešavanja",
										icon: "i-lucide-settings",
										to: "/admin/settings",
									},
									{
										label: "Karte",
										icon: "i-lucide-ticket",
										to: "/admin/tickets",
									},
								]
							: []),
						{
							label: "Profil",
							icon: "i-lucide-user",
							to: "/user/profile",
						},
						{
							label: "Odjava",
							icon: "i-lucide-log-out",
							onSelect: authStore.logOut,
							class: "cursor-pointer",
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
