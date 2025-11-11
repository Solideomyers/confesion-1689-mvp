import "@/styles/globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
	title: "Confesión Bautista de Fe de 1689",
	description: "Lectura moderna y accesible de la Confesión de 1689",
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="es">
			<body>
				<header style={{ padding: "1rem", borderBottom: "1px solid #e5e7eb" }}>
					<nav style={{ display: "flex", gap: "1rem" }}>
						<a href="/">Inicio</a>
						<a href="/chapters">Capítulos</a>
					</nav>
				</header>
				<main style={{ padding: "1rem" }}>{children}</main>
			</body>
		</html>
	);
}
