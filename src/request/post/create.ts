import { api, axiosConfig } from "../api";

type post = {
	title: string;
	content: string;
	photo?: string;
};

export async function createPost({
	title,
	content,
	photo,
} : post) {
	const formdata = new FormData()

	formdata.append("title", title);
	formdata.append("content", content)
	if(photo) {
		formdata.append("file", photo[0])
	}

	const response = await api.post("/post", formdata, axiosConfig);
	return { response };
}
