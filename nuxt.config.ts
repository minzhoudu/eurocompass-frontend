import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: [
		"@nuxt/eslint",
		"@nuxt/ui",
		"@nuxt/image",
		"nuxt-posthog",
	],
	devtools: { enabled: true },

	app: {
		head: {
			title: "Eurocompass",
		},
	},

	css: ["~/assets/css/main.css"],

	colorMode: {
		preference: "light",
	},

	routeRules: {
		"/apis/**": {
			proxy: "http://172.104.249.149:5533/**",
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

	posthog: {
		publicKey: process.env.PUBLIC_POSTHOG_API_KEY,
		host: process.env.PUBLIC_POSTHOG_API_HOST,
		capturePageViews: false,
		capturePageLeaves: false,
	},
});
