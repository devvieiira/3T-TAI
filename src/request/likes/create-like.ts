import { api } from "../api";


export async function createLike(id: string) {
  await api.post(`/post/like/${id}`);
}
