import type { NavigationMenuItem } from "@nuxt/ui";

export const useAdminNavItems = () => {
	const adminNavItems = ref<NavigationMenuItem[]>([
		{
			label: "Dashboard",
			icon: "i-lucide-home",
			to: "/admin",
		},
		{
			label: "Rezervacije",
			icon: "i-lucide-calendar-days",
			to: "/admin/reservations",
		},
		{
			label: "Autobusi",
			icon: "i-lucide-bus",
			to: "/admin/buses",
		},
	]);

	return adminNavItems;
};
