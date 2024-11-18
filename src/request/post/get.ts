import { api } from "../api";

type post = {
	id: string;
	title: string;
	likes: number;
	content: string;
	imageUrl?: string;
};

export async function getPost(): Promise<post[]> {
	const data = (await api.get("/post")).data;
	return data;
}
