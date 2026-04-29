import { defineConfig } from "vitepress";
import { groupIconMdPlugin, groupIconVitePlugin } from "vitepress-plugin-group-icons";
// Importamos el JSON de package.json
import pkg from '../../package.json' with { type: 'json' };
export default defineConfig({
  base: process.env.NODE_ENV === "production" ? "/data-faker-mini/" : "/",
  title: `Faker-Mini v${pkg.version}`,

  description: "Librería ultra liviana para generar datos falsos.",
  lang: "es-AR", // Para que el buscador y la página entiendan que es en español

  themeConfig: {
    // Menú de navegación superior
    nav: [
      { text: "Inicio", link: "/" },
      { text: "Documentación", link: "/guide/introduction" },
    ],
    // Search
    search: {
      provider: "local",
    },
    // Footer
    footer: {
      message:
        'Hecho con ❤️ por <a href="https://github.com/DanielRiverol">Daniel Riverol</a>',
      copyright: `Copyright © ${new Date().getFullYear()}`,
    },
    // Barra lateral de navegación
    sidebar: [
      {
        text: "📖 Guía Principal",
        items: [
          { text: "Introducción", link: "/guide/introduction" },
          { text: "Generador de Datasets", link: "/guide/datasets" },
          { text: "Uso en Terminal (CLI)", link: "/guide/cli" },
        ],
      },
      {
        text: "🧩 Referencia de API (Módulos)",
        items: [
          { text: "Person", link: "/api/person" },
          { text: "Internet", link: "/api/internet" },
          { text: "Date", link: "/api/date" },
          { text: "Location", link: "/api/location" },
          { text: "Phone", link: "/api/phone" },
          { text: "IDs", link: "/api/ids" },
        ],
      },
    ],

    // Enlaces a redes/repositorios
    socialLinks: [
      {
        icon: "npm",
        link: "https://www.npmjs.com/package/faker-mini",
      },
    ],

    // Textos de la interfaz traducidos
    sidebarMenuLabel: "Menú",
    returnToTopLabel: "Volver arriba",
    darkModeSwitchLabel: "Apariencia",
    docFooter: {
      prev: "Página anterior",
      next: "Página siguiente",
    },
  },
  markdown: {
    config(md) {
      md.use(groupIconMdPlugin);
    },
  },
  vite: {
    plugins: [groupIconVitePlugin()],
  },
});
