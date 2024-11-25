"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { createPost } from "@/request/post/create";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import Image from "next/image";
import { FileInput } from "lucide-react";
import { toast } from "sonner";
import logo from "@/img/logo.svg"
import Link from "next/link";

const schema = z.object({
	name: z.string().min(3, "Title must be at least 3 characters long"),
	content: z.string().min(3, "Description must be at least 3 characters long"),
	photo: z.any().optional(),
});

type formProps = z.infer<typeof schema>;

export default function Post() {
	const [isImage, setIsImage] = useState("")
	const router = useRouter()
	const {
		handleSubmit,
		register,
		watch,
		formState: { errors },
	} = useForm<formProps>({
		mode: "onSubmit",
		reValidateMode: "onChange",
		resolver: zodResolver(schema),
		defaultValues: {
			photo: [],
		}
	});

	const { mutateAsync } = useMutation({
		mutationKey: ["createPost"],
		mutationFn: createPost,
	});

	const hasNewImage = watch("photo").length > 0;

	const image = watch("photo")[0];

	const post = async (data: formProps) => {
		console.log(data)
		if(hasNewImage) {
			const inviteForm = async () => {
				const {response} = await mutateAsync({
					title: data.name,
					content: data.content,
					photo: data.photo,
				})
				if(response) {
					return true
				}
			}
			toast.promise(inviteForm, {
				loading: "Uploading...",
				success: () => {
					router.back()
					return "Uploaded!"
				},
				error: "Failed to upload",
			})
		} else {
			const invite = async () => {
				const {response} = await mutateAsync({
					title: data.name,
					content: data.content
				})
				
				if(response) {
					return true
				}
			}
			toast.promise(invite, {
				loading: "Uploading...",
				success: () => {
					router.back()
					return "Uploaded!"
				},
				error: "Failed to upload",
			})
		}

		
	};
	return (
		<main className="min-h-screen bg-figma-background pb-10 ">
			<header className="bg-white h-[84px] flex justify-center items-center" >
			<Link href="/">
			<Image className="w-16 h-16" src={logo} alt="logo" />
			</Link>
			</header>
			<div className="flex justify-center">
			<form className="py-8 space-y-4 w-full md:w-4/5 lg:w-4/6 xl:w-1/2" onSubmit={handleSubmit(post)}>
				<div className="space-y-2 px-4">
					<Label htmlFor="contain">Contains image:</Label>
				<Select
				defaultValue="no"
								onValueChange={(value) => {
									setIsImage(value);
								}}
							>
								<SelectTrigger className="" id="contain">
									<SelectValue placeholder="Contains	" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectLabel>Contains</SelectLabel>
										<SelectItem value="yes">Yes</SelectItem>
										<SelectItem value="no">No</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
				</div>
				{isImage === "yes" && (
					<div className="space-y-2 px-4">
						<Label>
						{hasNewImage ? (
										<>
											<Input
												id=""
												className="hidden"
												type="file"
												accept="image/*"
												{...register("photo")}
											/>
											<div className="w-full h-[180px] xl:h-[260px] flex justify-center items-center relative rounded-lg bg-red-500">
												<Image
													className="object-cover rounded-lg"
													src={URL.createObjectURL(image)}
													alt="Imagem carregada"
													fill
												/>
											</div>
										</>
									) : (
										<>
											<Input
												className="hidden object-cover"
												type="file"
												accept="image/*"
												{...register("photo")}
											/>
											<div className="w-full h-[180px] xl:h-[260px] flex justify-center items-center bg-gray-300 rounded-md">
												<FileInput />
											</div>
										</>
									)}
						</Label>
				</div>
				)}
				<div className="space-y-2 px-4">
					<Label htmlFor="title">Title</Label>
					<Input
						type="text"
						id="title"
						maxLength={50}
						placeholder="Type the title here..."
						className="border-black/30 w-full"
						{...register("name")}
					/>
					{errors.name && <p className="text-red-500">{errors.name.message}</p>}
				</div>
				<div className="space-y-2 px-4">
					<Label htmlFor="title">Description</Label>
					<Textarea
						id="title"
						placeholder="Write something here..."
						maxLength={200}
						className="border-black/30 w-full resize-none h-20"
						{...register("content")}
					/>
					{errors.content && (
						<p className="text-red-500">{errors.content.message}</p>
					)}
				</div>
				<div className="space-y-2 px-4 flex justify-end">
					<Button className="bg-gray-400 hover:bg-gray-200 text-black">Create post</Button>
				</div>
			</form>
			</div>
		</main>
	);
}
