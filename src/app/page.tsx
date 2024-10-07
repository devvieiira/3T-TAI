import { Input } from "@/components/ui/input";
import { Menu, Search } from "lucide-react";
import Link from "next/link";

export default function Home() {
	return (
		<main className="min-h-screen bg-figma-background">
			{/* BARRA DE PESQUISA E MENU */}
			<header className="my-2 bg-white">
				<div className="flex items-center justify-between space-x-2 px-4  py-6">
					<div className="w-5/6 flex items-center relative">
						<Input
							className="bg-figma-gray rounded-xl px-8"
							placeholder="Search"
						/>
						<Search className="absolute left-2 text-primary" size={18} />
					</div>
					<Link href="#">
						<Menu />
					</Link>
				</div>
				<nav className="flex justify-center space-x-3 py-4">
					<Link
						href="#"
						className="w-24 text-figma-primary bg-figma-violet flex items-center justify-center py-1 rounded-lg"
					>
						Home
					</Link>
					<Link
						href="#"
						className="w-24 text-figma-primary flex items-center justify-center py-1 rounded-lg"
					>
						Popular
					</Link>
				</nav>
			</header>
		</main>
	);
}
