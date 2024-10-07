import { Input } from "@/components/ui/input";
import { Menu, Search } from "lucide-react";
import Link from "next/link";

export default function Home() {
	return (
		<main className="min-h-screen py-6">
			<header className="flex items-center justify-between space-x-2 px-4">
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
			</header>
		</main>
	);
}
