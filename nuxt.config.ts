import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: ["@nuxt/eslint", "@nuxt/ui", "@nuxt/image", "@pinia/nuxt", "@vueuse/nuxt"],
	plugins: ["~/plugins/init-auth.ts"],
	devtools: { enabled: true },

	app: {
		head: {
			title: "Eurocompass",
			link: [
				{
					rel: "apple-touch-icon",
					sizes: "180x180",
					href: "/apple-touch-icon.png",
				},
				{
					rel: "icon",
					sizes: "32x32",
					type: "image/png",
					href: "/favicon-32x32.png",
				},
				{
					rel: "icon",
					sizes: "16x16",
					type: "image/png",
					href: "/favicon-16x16.png",
				},
				{
					rel: "manifest",
					href: "/site.webmanifest",
				},
			],
		},
	},

	css: ["~/assets/css/main.css"],

	colorMode: {
		preference: "light",
	},

	runtimeConfig: {
		public: {
			GOOGLE_LOGIN_URL: process.env.PUBLIC_GOOGLE_LOGIN_URL,
			apiHost: process.env.PUBLIC_API_HOST as string,
		},
	},

	compatibilityDate: "2025-05-15",

	vite: {
		plugins: [
			tailwindcss(),
		],
	},

	eslint: {
		config: {
			stylistic: {
				semi: true,
				quotes: "double",
				commaDangle: "always-multiline",
				indent: "tab",
			},
		},
	},
});
