import axios from "axios";

const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY;

type APIResource = "pexels" | "pixabay";

export const axiosService = (req: string, api: APIResource) => {
	return axios.create({
		baseURL: `${
			api === "pexels"
				? "https://api.pexels.com/v1/search"
				: "https://pixabay.com/api/videos/"
		}${req}`,
		headers: {
			"Content-Type": "application/json",
			Authorization: api === "pexels" ? PEXELS_API_KEY : "",
		},
	});
};
