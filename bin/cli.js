#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import pc from "picocolors";
import * as p from "@clack/prompts";
import { createMock } from "../src/index.js";

// --- LEER VERSIÓN DINÁMICAMENTE DESDE PACKAGE.JSON ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pkgPath = path.resolve(__dirname, "../package.json");
const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
const VERSION = pkg.version;

const args = process.argv.slice(2);

// Capturamos el flag de versión de inmediato
if (args.includes("--version") || args.includes("-v")) {
  console.log(`v${VERSION}`);
  process.exit(0);
}

// --- FUNCIÓN PARA MOSTRAR AYUDA ---
const showHelp = () => {
  console.log("");
  console.log(pc.bgCyan(pc.black(pc.bold(` Faker-Mini CLI v${VERSION} `))));
  console.log("");

  console.log(pc.cyan(pc.bold("Modo Interactivo (Recomendado):")));
  console.log(
    `  Ejecuta simplemente ${pc.green("npx faker-mini")} o ${pc.green("faker-mini")} para abrir el asistente paso a paso.\n`,
  );

  console.log(pc.cyan(pc.bold("Modo Scripting (Rápido):")));
  console.log(
    `  ${pc.dim("Uso:")} faker-mini ${pc.green("<modulo>")} ${pc.green("<metodo>")} ${pc.dim("[opciones]")}`,
  );
  console.log(
    `  ${pc.dim("Ej:")}  faker-mini person fullName --locale es_MX\n`,
  );

  console.log(pc.cyan(pc.bold("Generación de Datasets (JSON):")));
  console.log(`  ${pc.dim("Uso:")} faker-mini dataset ${pc.dim("[opciones]")}`);
  console.log(
    `  ${pc.dim("Ej:")}  faker-mini dataset --count 5 --out usuarios.json`,
  );
  console.log(
    `  ${pc.dim("Ej:")}  faker-mini dataset --schema id:id.short,nombre:person.fullName\n`,
  );

  console.log(pc.cyan(pc.bold("Opciones Globales:")));
  console.log(
    `  ${pc.green("--locale <idioma>")}   Cambia el idioma (ej: en_US, es_AR, pt_BR).`,
  );
  console.log(
    `  ${pc.green("--count <numero>")}    Cantidad de registros para el dataset (defecto: 10).`,
  );
  console.log(
    `  ${pc.green("--out <archivo>")}     Ruta del archivo para guardar el JSON resultante.`,
  );
  console.log(
    `  ${pc.green("--schema <formato>")}  Formato personalizado (clave:modulo.metodo,...).`,
  );
  console.log(
    `  ${pc.green("--version, -v")}       Muestra la versión actual de la CLI.`,
  );
  console.log(
    `  ${pc.green("--help, -h")}          Muestra este menú de ayuda.\n`,
  );

  process.exit(0);
};

// Capturamos el help
if (args.includes("--help") || args.includes("-h")) {
  showHelp();
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

  const [moduleName, methodName, ...methodArgs] = args;
  const mock = createMock({ locale });

  try {
    if (moduleName === "dataset") {
      let schemaFactory;
      if (customSchema) {
        const fields = customSchema.split(",");
        schemaFactory = () => {
          const item = {};
          fields.forEach((field) => {
            const [key, pathStr] = field.split(":");
            if (!pathStr) {
              item[key] = "Error de formato";
              return;
            }
            const [mod, met] = pathStr.split(".");
            item[key] =
              mock[mod] && typeof mock[mod][met] === "function"
                ? mock[mod][met]()
                : `Error: ${mod}.${met} no existe`;
          });
          return item;
        };
      } else {
        schemaFactory = () => ({
          id: mock.id.mongodb(),
          name: mock.person.fullName(),
          email: mock.internet.email(),
          city: mock.location.city(),
        });
      }

      const data = mock.dataset.generate(count, schemaFactory);
      const jsonString = JSON.stringify(data, null, 2);

      if (outFile) {
        fs.writeFileSync(
          path.resolve(process.cwd(), outFile),
          jsonString,
          "utf-8",
        );
      } else {
        console.log(jsonString);
      }
      process.exit(0);
    }

    if (
      mock[moduleName] &&
      typeof mock[moduleName][methodName] === "function"
    ) {
      console.log(mock[moduleName][methodName](...methodArgs));
    } else {
      console.error(
        pc.red(`Error: El método '${moduleName}.${methodName}' no existe.`),
      );
      process.exit(1);
    }
  } catch (error) {
    console.error(pc.red(`Error inesperado: ${error.message}`));
    process.exit(1);
  }
}

// --- 2. MODO INTERACTIVO (ESTILO VITE CON CLACK) ---
async function runInteractive() {
  console.clear();

  // Inyectamos la versión en el título del menú
  p.intro(pc.bgCyan(pc.black(pc.bold(` Faker-Mini CLI v${VERSION} `))));

  p.note(
    `Herramienta ultra liviana para generar datos falsos.\n` +
      `Crea desde un simple nombre aleatorio para pruebas rápidas,\n` +
      `hasta miles de registros en un archivo JSON al instante.`,
    pc.yellow("👋 ¡Bienvenido!"),
  );

  const action = await p.select({
    message: "¿Qué deseas hacer?",
    options: [
      {
        value: "dataset",
        label: "Dataset completo (Múltiples registros JSON)",
      },
      { value: "single", label: "Dato único (Ej: Un nombre aleatorio)" },
      { value: "help", label: "Obtener ayuda (Ver manual de la CLI)" },
      { value: "exit", label: "Salir" },
    ],
  });

  if (p.isCancel(action) || action === "exit") {
    p.outro("¡Hasta luego! 👋");
    process.exit(0);
  }

  if (action === "help") {
    showHelp();
    return;
  }

  const locale = await p.select({
    message: "Selecciona el idioma (Locale):",
    options: [
      { value: "es_AR", label: "Español (Argentina)" },
      { value: "es_MX", label: "Español (México)" },
      { value: "es_ES", label: "Español (España)" },
      { value: "en_US", label: "Inglés (USA)" },
      { value: "pt_BR", label: "Portugués (Brasil)" },
      { value: "fr_FR", label: "Francés (Francia)" },
      { value: "de_DE", label: "Alemán (Alemania)" },
    ],
  });

  if (p.isCancel(locale)) {
    p.cancel("Operación cancelada.");
    process.exit(0);
  }

  const mock = createMock({ locale });

  if (action === "dataset") {
    const countStr = await p.text({
      message: "¿Cuántos registros deseas generar?",
      placeholder: "10",
      defaultValue: "10",
    });

    if (p.isCancel(countStr)) return p.cancel("Operación cancelada.");
    const count = parseInt(countStr, 10);

    const schemaType = await p.select({
      message: "¿Qué estructura (Schema) quieres usar?",
      options: [
        { value: "default", label: "Por defecto (id, nombre, email, ciudad)" },
        {
          value: "custom",
          label: "Personalizado (escribir mis propios campos)",
        },
      ],
    });

    if (p.isCancel(schemaType)) return p.cancel("Operación cancelada.");

    let schemaFactory;

    if (schemaType === "custom") {
      const customSchemaStr = await p.text({
        message:
          "Escribe tu schema (formato -> clave:modulo.metodo,clave2...):",
        placeholder:
          "id:id.short,nombre:person.firstName,pass:internet.password",
        validate: (value) => {
          if (!value) return "El schema no puede estar vacío";
          if (!value.includes(":"))
            return "Debe tener al menos una 'clave:método'";
        },
      });

      if (p.isCancel(customSchemaStr)) return p.cancel("Operación cancelada.");

      const fields = customSchemaStr.split(",");
      schemaFactory = () => {
        const item = {};
        fields.forEach((field) => {
          const [key, pathStr] = field.split(":");
          if (!pathStr) {
            item[key] = "Error de formato";
            return;
          }
          const [mod, met] = pathStr.split(".");
          item[key] =
            mock[mod] && typeof mock[mod][met] === "function"
              ? mock[mod][met]()
              : `Error: ${mod}.${met} no existe`;
        });
        return item;
      };
    } else {
      schemaFactory = () => ({
        id: mock.id.mongodb(),
        nombre: mock.person.fullName(),
        email: mock.internet.email(),
        ciudad: mock.location.city(),
      });
    }

    const outType = await p.select({
      message: "¿Dónde quieres ver el resultado?",
      options: [
        { value: "console", label: "Imprimir en consola" },
        { value: "file", label: "Guardar en un archivo .json" },
      ],
    });

    if (p.isCancel(outType)) return p.cancel("Operación cancelada.");

    let fileName = null;
    if (outType === "file") {
      fileName = await p.text({
        message: "Nombre del archivo:",
        placeholder: "usuarios.json",
        defaultValue: "usuarios.json",
      });
      if (p.isCancel(fileName)) return p.cancel("Operación cancelada.");
    }

    const s = p.spinner();
    s.start("Generando datos...");

    const data = mock.dataset.generate(count, schemaFactory);

    s.stop(`¡Generados ${count} registros con éxito!`);

    if (outType === "file") {
      const targetPath = path.resolve(process.cwd(), fileName);
      fs.writeFileSync(targetPath, JSON.stringify(data, null, 2), "utf-8");
      p.outro(`Archivo guardado en: ${pc.underline(pc.green(targetPath))}`);
    } else {
      console.log(JSON.stringify(data, null, 2));
      p.outro("¡Proceso finalizado!");
    }
  } else if (action === "single") {
    const moduleName = await p.select({
      message: "Selecciona el módulo:",
      options: Object.keys(mock)
        .filter((k) => k !== "setSeed" && k !== "dataset" && k !== "helpers")
        .map((mod) => ({ value: mod, label: mod })),
    });

    if (p.isCancel(moduleName)) return p.cancel("Operación cancelada.");

    const methods = Object.keys(mock[moduleName]).filter(
      (k) => typeof mock[moduleName][k] === "function",
    );

    const methodName = await p.select({
      message: "Selecciona el método:",
      options: methods.map((met) => ({ value: met, label: met })),
    });

    if (p.isCancel(methodName)) return p.cancel("Operación cancelada.");

    const result = mock[moduleName][methodName]();

    p.note(pc.green(result), "Resultado:");
    p.outro("¡Completado!");
  }
}

if (args.length === 0) {
  runInteractive();
}
