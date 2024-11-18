"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

// import { createPost } from "@/request/post/create";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { getUser } from "@/request/user/login";
import { useState } from "react";

const schema = z.object({
	username: z.string().min(3, "Username must be at least 3 characters long"),
	password: z.string().min(3, "Content must be at least 3 characters long"),
});

type formProps = z.infer<typeof schema>;

export default function Post() {
	const router = useRouter()
	const [username, setUsername] = useState("")
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<formProps>({
		mode: "onSubmit",
		reValidateMode: "onChange",
		resolver: zodResolver(schema),
	});

	const { data: user, refetch } = useQuery({
		queryKey: ["user"],
		queryFn: () => getUser(username),
		enabled: !!username,
	});



	const handleForm = async () => {
		refetch()

		console.log(user)
		
	};
	return (
		<main className="min-h-screen bg-figma-background pb-10 flex justify-center items-center">
			<form className="py-8 space-y-4 bg-white w-[400px] rounded-md shadow-md" onSubmit={handleSubmit(handleForm)}>
				<div className="flex items-center justify-center">
					<h1 className="text-xl font-semibold">Login</h1>
				</div>
				{/* INPUTS */}
				<div className="px-4">
					<Label htmlFor="email">Username:</Label>
					<Input placeholder="Username..." id="email" type="text"
					{...register("username")}/>
					{errors.username && <p>{errors.username.message}</p>}
				</div>
				<div className="px-4">
					<Label htmlFor="password">Password:</Label>
					<Input placeholder="Password..." type="password" id="password"
					{...register("password")}/>
					{errors.password && <p>{errors.password.message}</p>}
				</div>
				{/* BUTTON */}
				<div className="py-3 flex justify-center">
					<Button className="w-[100px] bg-gradient-to-r from-[#5418F2] via-[#9C40FD] to-[#C854FD] font-semibold rounded-lg">Login</Button>
				</div>
			</form>
		</main>
	);
}
