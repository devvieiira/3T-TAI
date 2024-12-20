import axios from "axios";

export const axiosConfig = {
	headers: {
		"Content-Type": "multipart/form-data",
	},
};

export const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_URL,
	// timeout: 1000,
	// withCredentials: true,
});
