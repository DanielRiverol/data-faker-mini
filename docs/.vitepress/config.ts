import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Faker-Mini",
  description: "Librería ultra liviana para generar datos falsos.",
  lang: "es-AR", // Para que el buscador y la página entiendan que es en español

  themeConfig: {
    // Menú de navegación superior
    nav: [
      { text: "Inicio", link: "/" },
      { text: "Documentación", link: "/guide/introduction" },
    ],

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
          { text: "UUID", link: "/api/uuid" },
        ],
      },
    ],

    // Enlaces a redes/repositorios
    socialLinks: [
      { icon: "github", link: "https://github.com/DanielRiverol/faker-mini" },
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
});
