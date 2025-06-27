import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: ["@nuxt/eslint", "@nuxt/ui", "@nuxt/image", "@pinia/nuxt"],
	plugins: ["~/plugins/init-auth.ts"],
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
});
