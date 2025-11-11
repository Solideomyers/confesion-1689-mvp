import { readdir } from "node:fs/promises";
import path from "node:path";

export const dynamic = "force-static";

export default async function ChaptersPage() {
	const root = path.resolve(process.cwd(), "content", "confession", "es");
	const entries = await readdir(root, { withFileTypes: true }).catch(() => []);
	const files = entries.filter((e) => e.isFile() && e.name.endsWith(".md"));
	return (
		<section>
			<h1>Capítulos</h1>
			<ul>
				{files.map((f) => (
					<li key={f.name}>{f.name.replace(/\.md$/, "")}</li>
				))}
			</ul>
		</section>
	);
}
