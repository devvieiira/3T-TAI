"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Menu, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
	const example = [
		{
			value: "1",
		},
		{
			value: "2",
		},
		{
			value: "3",
		},
		{
			value: "4",
		},
		{
			value: "5",
		},
		{
			value: "6",
		},
	];

	const router = useRouter();
	return (
		<main className="min-h-screen bg-figma-background pb-10">
			{/* BARRA DE PESQUISA E MENU */}
			<header className="bg-white">
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
			</header>
			{/* BODY */}
			<div className="flex flex-col items-center py-6 space-y-4">
				{example.map((item) => (
					<Card className="w-[380px] px-3 py-4" key={item.value}>
						{/* corpo da postagen */}
						<div>
							<span className="text-sm">
								Aqui demonstra um exemplo de postagem,... bla bla bla...
							</span>
							<div className="w-full h-[200px] bg-gray-400 rounded-sm" />
						</div>
						{/* EM BREVE: LIKES E COMENTÁRIOS */}
					</Card>
				))}
			</div>
			<div className="fixed bottom-20 right-5">
				<Button
					className="w-[50px] h-[50px] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded-full"
					onClick={() => router.push("/post")}
				>
					<span className="text-xl text-center">+</span>
				</Button>
			</div>
		</main>
	);
}
