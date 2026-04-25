#!/usr/bin/env node

import fs from "fs";
import path from "path";
import pc from "picocolors";
import figures from "figures";
import { createFaker } from "../src/index.js";

const args = process.argv.slice(2);

// --- ARTE ASCII PARA EL MENÚ ---
const asciiArt = `
  _____     _                 __  __ _       _ 
 |  ___|_ _| | _____ _ __    |  \\/  (_)_ __ (_)
 | |_ / _\` | |/ / _ \\ '__|   | |\\/| | | '_ \\| |
 |  _| (_| |   <  __/ |      | |  | | | | | | |
 |_|  \\__,_|_|\\_\\___|_|      |_|  |_|_|_| |_|_|
`;

// --- FUNCIÓN PARA MOSTRAR AYUDA ---
const showHelp = () => {
  console.log(pc.cyan(pc.bold(asciiArt)));
  console.log(`
${pc.cyan(pc.bold("Uso Simple:"))}
  ${pc.gray(figures.pointer)} npx faker-mini ${pc.green("<modulo>")} ${pc.green("<metodo>")} ${pc.dim("[--locale <idioma>]")}
  ${pc.dim("Ej:")} npx faker-mini person fullName --locale es_MX

${pc.cyan(pc.bold("Uso Avanzado (Dataset JSON):"))}
  ${pc.gray(figures.pointer)} npx faker-mini dataset ${pc.dim("[--count <num>] [--out <archivo.json>] [--locale <idioma>] [--schema <...>]")}
  
  ${pc.yellow("Ejemplo (Usuario por defecto):")}
  npx faker-mini dataset --count 5 --out usuarios.json --locale es_AR
  
  ${pc.yellow("Ejemplo (Schema personalizado):")}
  npx faker-mini dataset --count 3 --schema nombre:person.fullName,ciudad:location.city --out data.json

${pc.cyan(pc.bold("Opciones:"))}
  ${pc.green("--help, -h")}    Muestra este menú de ayuda.
  `);
  process.exit(0);
};

if (args.length === 0 || args.includes("--help") || args.includes("-h")) {
  showHelp();
}

// --- FUNCIÓN AUXILIAR PARA EXTRAER FLAGS ---
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

// --- CABECERA ESTÁNDAR DE EJECUCIÓN ---
console.error(
  pc.cyan(`\n${figures.play} Faker-mini.... Generando datos....\n`),
);

const faker = createFaker({ locale });

try {
  if (moduleName === "dataset") {
    let schemaFactory;

    if (customSchema) {
      const fields = customSchema.split(",");
      schemaFactory = () => {
        const item = {};
        fields.forEach((field) => {
          const [key, pathStr] = field.split(":");
          const [mod, met] = pathStr.split(".");

          if (faker[mod] && typeof faker[mod][met] === "function") {
            item[key] = faker[mod][met]();
          } else {
            item[key] = `Error: Método ${mod}.${met} no encontrado`;
          }
        });
        return item;
      };
    } else {
      // --- TRADUCCIÓN DINÁMICA DE CLAVES ---
      const translations = {
        en: {
          id: "id",
          name: "name",
          email: "email",
          phone: "phone",
          city: "city",
          registeredAt: "registeredAt",
        },
        es: {
          id: "id",
          name: "nombre",
          email: "email",
          phone: "telefono",
          city: "ciudad",
          registeredAt: "registrado",
        },
        fr: {
          id: "id",
          name: "nom",
          email: "email",
          phone: "telephone",
          city: "ville",
          registeredAt: "inscritLe",
        },
        de: {
          id: "id",
          name: "name",
          email: "email",
          phone: "telefon",
          city: "stadt",
          registeredAt: "registriertAm",
        },
        pt: {
          id: "id",
          name: "nome",
          email: "email",
          phone: "telefone",
          city: "cidade",
          registeredAt: "registradoEm",
        },
      };

      // Extraemos las primeras dos letras (ej: "fr" de "fr_FR")
      const langPrefix = locale.split("_")[0];

      // Si el idioma no existe en nuestro diccionario, usamos inglés por defecto
      const t = translations[langPrefix] || translations["en"];

      schemaFactory = () => {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();

        // Usamos [t.clave] para asignar el nombre de la propiedad dinámicamente
        return {
          [t.id]: faker.uuid.v4(),
          [t.name]: `${firstName} ${lastName}`,
          [t.email]: faker.internet.email({ firstName, lastName }),
          [t.phone]: faker.phone.number(),
          [t.city]: faker.location.city(),
          [t.registeredAt]: faker.date.format(faker.date.past(2), "YYYY-MM-DD"),
        };
      };
    }

    console.error(
      pc.yellow(`${figures.info} Procesando ${pc.bold(count)} registros...`),
    );

    const data = faker.dataset.generate(count, schemaFactory);
    const jsonString = JSON.stringify(data, null, 2);

    if (outFile) {
      const targetPath = path.resolve(process.cwd(), outFile);
      fs.writeFileSync(targetPath, jsonString, "utf-8");
      console.error(
        pc.green(`\n${figures.tick} Archivo guardado con éxito en: `) +
          pc.underline(targetPath),
      );
    } else {
      console.log(jsonString);
    }
    process.exit(0);
  }

  // --- MODO SIMPLE ---
  if (
    faker[moduleName] &&
    typeof faker[moduleName][methodName] === "function"
  ) {
    const result = faker[moduleName][methodName](...methodArgs);
    console.log(result);
  } else {
    console.error(
      pc.red(
        `${figures.cross} Error: El método '${pc.bold(`${moduleName}.${methodName}`)}' no existe.`,
      ),
    );
    console.error(
      pc.yellow(
        `${figures.info} Sugerencia: Usa '${pc.bold("npx faker-mini --help")}' para ver las opciones disponibles.`,
      ),
    );
    process.exit(1);
  }
} catch (error) {
  console.error(
    pc.bgRed(
      pc.white(pc.bold(` ${figures.warning} Ocurrió un error inesperado: `)),
    ),
    pc.red(error.message),
  );
  process.exit(1);
}
