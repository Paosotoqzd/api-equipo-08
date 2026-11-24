// Uso:  node configurar.mjs <numero-de-equipo> <subdominio-workers-dev>
// Ejemplo: node configurar.mjs 05 samuel-hernandez
// Cambia "api-equipo-01" y "SUBDOMINIO" en todos los archivos del proyecto.
import { readFileSync, writeFileSync } from "node:fs";

const [, , numero, subdominio] = process.argv;
if (!numero) {
  console.error("Uso: node configurar.mjs <numero-de-equipo> [subdominio]");
  process.exit(1);
}
const equipo = `api-equipo-${numero.padStart(2, "0")}`;
const archivos = ["package.json", "wrangler.jsonc", ".github/workflows/cd.yml"];

for (const archivo of archivos) {
  let texto = readFileSync(archivo, "utf8").replaceAll("api-equipo-01", equipo);
  if (subdominio) texto = texto.replaceAll("SUBDOMINIO", subdominio);
  writeFileSync(archivo, texto);
  console.log(`Actualizado: ${archivo}`);
}
console.log(`\nNombre del Worker: ${equipo}`);
if (!subdominio) console.log("Falta el subdominio: vuelvan a ejecutar con él después del Paso 4.");
