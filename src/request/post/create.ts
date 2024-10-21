import { api, axiosConfig } from "../api";

type avaliadorProps = {
	name: string;
	content: string;
};

export async function createAvaliador({ name, content }: avaliadorProps) {
	const formdata = new FormData();
	formdata.append("name", name);
	formdata.append("content", content);

	const response = await api.post("/post", formdata, axiosConfig);
	return { response };
}
