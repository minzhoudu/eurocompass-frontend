# Eurocompass

Eurocompass is a modern frontend application built with [NuxtJS](https://nuxt.com/). It provides a fast, modular, and powerful framework for creating Vue.js applications, enabling server-side rendering, static site generation, and more.

## 🚀 Features

- 🌍 Built with [NuxtJS](https://nuxt.com/)
- 📦 Managed with [pnpm](https://pnpm.io/)
- 🧹 Code linting with ESLint
- ⚡ Fast development with hot module replacement

## 📦 Installation

Before getting started, make sure you have [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/) installed.

```bash
npm install -D pnpm
```

## 💻 Scripts
- To start the development server with hot reloading:
```bash
pnpm dev
```
- To check for linting errors
```bash
pnpm lint
```
- To check and auto-fix linting errors
```bash
pnpm lint:fix
```


## 📂 Folder structure
```php
├── assets         # Uncompiled assets like SCSS or images
├── components     # Vue components
├── layouts        # Layout components
├── pages          # Route-based Vue components
├── public         # Static files
├── app.vue        # Main Vue app file
├── nuxt.config.ts # NuxtJS configuration
└── ...
```