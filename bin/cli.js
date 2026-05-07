#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import pc from "picocolors";
import * as p from "@clack/prompts";
import { createMock } from "../src/index.js";

// --- LEER VERSIÓN DINÁMICAMENTE ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pkgPath = path.resolve(__dirname, "../package.json");
const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
const VERSION = pkg.version;

const args = process.argv.slice(2);

// --- HELPERS DE FACTORIES (Para reutilizar en ambos modos) ---
const getPresets = (mock) => ({
  users: () => ({
    id: mock.id.mongodb(),
    nombre: mock.person.fullName(),
    email: mock.internet.email(),
    ciudad: mock.location.city(),
  }),
  products: () => ({
    sku: mock.commerce.sku(),
    nombre: mock.commerce.productName(),
    categoria: mock.commerce.department(),
    precio: mock.commerce.price(),
    imagen: mock.image.photo({ width: 640, height: 480 }),
  }),
});

// --- FUNCIÓN DE AYUDA ---
const showHelp = () => {
  console.log("");
  console.log(pc.bgCyan(pc.black(pc.bold(` Faker-Mini CLI v${VERSION} `))));
  console.log("");
  console.log(pc.cyan(pc.bold("Uso de Presets:")));
  console.log(
    `  faker-mini dataset --preset users      ${pc.dim("(Default)")}`,
  );
  console.log(
    `  faker-mini dataset --preset products   ${pc.yellow("(¡Nuevo! Commerce + Image)")}`,
  );
  console.log("");
  console.log(pc.cyan(pc.bold("Ejemplo Scripting:")));
  console.log(
    `  faker-mini dataset --count 20 --preset products --out catalogo.json`,
  );
  console.log("");
  process.exit(0);
};

if (args.includes("--help") || args.includes("-h")) showHelp();
if (args.includes("--version") || args.includes("-v")) {
  console.log(`v${VERSION}`);
  process.exit(0);
}

// --- 1. MODO AUTOMÁTICO (SCRIPTING) ---
if (args.length > 0) {
  const extractArg = (flag, defaultValue) => {
    const index = args.indexOf(flag);
    if (index !== -1 && args[index + 1] && !args[index + 1].startsWith("--")) {
      const value = args[index + 1];
      args.splice(index, 2);
      return value;
    }
    return defaultValue;
  };

  const locale = extractArg("--locale", "en_US");
  const count = parseInt(extractArg("--count", "10"), 10);
  const outFile = extractArg("--out", null);
  const customSchema = extractArg("--schema", null);
  const presetType = extractArg("--preset", "users"); // users o products

  const [moduleName, methodName, ...methodArgs] = args;
  const mock = createMock({ locale });
  const presets = getPresets(mock);

  try {
    if (moduleName === "dataset") {
      let schemaFactory;

      if (customSchema) {
        const fields = customSchema.split(",");
        schemaFactory = () => {
          const item = {};
          fields.forEach((f) => {
            const [key, pathStr] = f.split(":");
            const [mod, met] = pathStr.split(".");
            item[key] = mock[mod]?.[met]
              ? mock[mod][met]()
              : `Error: ${mod}.${met}`;
          });
          return item;
        };
      } else {
        // Usamos el preset dinámico (usuarios o productos)
        schemaFactory = presets[presetType] || presets.users;
      }

      const data = mock.dataset.generate(count, schemaFactory);
      const jsonString = JSON.stringify(data, null, 2);

      if (outFile) {
        fs.writeFileSync(
          path.resolve(process.cwd(), outFile),
          jsonString,
          "utf-8",
        );
        console.error(
          pc.green(`✔ Dataset (${presetType}) guardado en ${outFile}`),
        );
      } else {
        console.log(jsonString);
      }
      process.exit(0);
    }
    // ... resto de la lógica de métodos simples ...
  } catch (e) {
    console.error(pc.red(e.message));
    process.exit(1);
  }
}

// --- 2. MODO INTERACTIVO (CLACK) ---
async function runInteractive() {
  console.clear();
  p.intro(pc.bgCyan(pc.black(pc.bold(` Faker-Mini CLI v${VERSION} `))));

  const action = await p.select({
    message: "¿Qué deseas hacer?",
    options: [
      { value: "dataset", label: "Dataset completo (JSON)" },
      { value: "single", label: "Dato único" },
      { value: "exit", label: "Salir" },
    ],
  });

  if (action === "exit" || p.isCancel(action)) process.exit(0);

  const locale = await p.select({
    message: "Idioma:",
    options: [
      { value: "es_AR", label: "Español" },
      { value: "en_US", label: "Inglés" },
    ],
  });

  const mock = createMock({ locale });
  const presets = getPresets(mock);

  if (action === "dataset") {
    const count = parseInt(
      await p.text({ message: "¿Cuántos registros?", defaultValue: "10" }),
      10,
    );

    const schemaType = await p.select({
      message: "¿Qué preset deseas usar?",
      options: [
        { value: "users", label: "Usuarios (Perfil social)" },
        { value: "products", label: "Productos (E-commerce + Fotos)" },
        { value: "custom", label: "Esquema personalizado" },
      ],
    });

    let factory = presets[schemaType];

    if (schemaType === "custom") {
      const schemaStr = await p.text({
        message: "Clave:modulo.metodo (ej: id:id.short,img:image.photo)",
      });
      const fields = schemaStr.split(",");
      factory = () => {
        const item = {};
        fields.forEach((f) => {
          const [k, pStr] = f.split(":");
          const [mo, me] = pStr.split(".");
          item[k] = mock[mo][me]();
        });
        return item;
      };
    }

    const s = p.spinner();
    s.start("Generando...");
    const data = mock.dataset.generate(count, factory);
    s.stop("¡Listo!");

    console.log(JSON.stringify(data.slice(0, 2), null, 2));
    console.log(pc.dim(`... y ${count - 2} registros más.`));

    p.outro("¡Proceso finalizado!");
  }
}

runInteractive();
