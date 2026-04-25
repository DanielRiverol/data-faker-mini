// docs/.vitepress/theme/index.ts
import DefaultTheme from "vitepress/theme";
import "virtual:group-icons.css"; // <-- Esto carga los SVG de npm, pnpm, yarn, etc.

export default {
  extends: DefaultTheme,
};
