import { IPixabayHit } from "@/features/background/interfaces/pixabay/IPixabayHit";

export interface IPixabayResponseData {
	total: number;
	totalHits: number;
	hits: IPixabayHit[];
}
