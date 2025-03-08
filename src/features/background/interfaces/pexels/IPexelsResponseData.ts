import { IPexelsPhoto } from "@/features/background/interfaces/pexels/IPexelsPhoto";

export interface IPexelsResponseData {
	page: number;
	per_page: number;
	photos: IPexelsPhoto[];
	total_results: number;
	next_page?: string;
	prev_page?: string;
}
