import { api } from "../api";



export async function getUser(username: string) {
	const path = `/user/${username}`;
	console.log(path)
	const response = await api.get(path);
	return { response };
}
