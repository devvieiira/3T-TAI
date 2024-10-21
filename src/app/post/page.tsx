import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function Post() {
	return (
		<main className="min-h-screen bg-figma-background pb-10">
			<header className="bg-white h-[84px]" />
			<form className="py-8 space-y-4">
				<div className="space-y-2 px-4">
					<Label htmlFor="title">Title</Label>
					<Input
						type="text"
						id="title"
						placeholder="Digite o título aqui..."
						className="border-black/30 w-full"
					/>
				</div>
				<div className="space-y-2 px-4">
					<Label htmlFor="title">Description</Label>
					<Textarea
						id="title"
						placeholder="Write something here..."
						className="border-black/30 w-full resize-none h-20"
					/>
				</div>
				<div className="space-y-2 px-4 flex justify-end">
					<Button className="bg-gray-400 text-black">Create post</Button>
				</div>
			</form>
		</main>
	);
}
