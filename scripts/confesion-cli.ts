#!/usr/bin/env tsx
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

async function validateContent() {
	const root = path.resolve(process.cwd(), "content", "confession", "es");
	const entries = await readdir(root, { withFileTypes: true }).catch(() => []);
	const mdFiles = entries.filter((e) => e.isFile() && e.name.endsWith(".md"));
	if (mdFiles.length === 0) {
		console.log("No se encontraron archivos Markdown en", root);
		return 1;
	}
	let ok = true;
	for (const f of mdFiles) {
		const p = path.join(root, f.name);
		const txt = await readFile(p, "utf8");
		if (txt.trim().length === 0) {
			console.error(`Archivo vacío: ${p}`);
			ok = false;
		}
	}
	console.log(ok ? "Contenido válido." : "Contenido con errores.");
	return ok ? 0 : 2;
}

async function main() {
	const cmd = process.argv[2] ?? "help";
	switch (cmd) {
		case "validate-content": {
			const code = await validateContent();
			process.exit(code);
			break;
		}
		default: {
			console.log(
				"Uso: npm run cli -- <comando>\n\nComandos disponibles:\n  validate-content  Valida archivos Markdown de la Confesión (es).",
			);
		}
	}
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
