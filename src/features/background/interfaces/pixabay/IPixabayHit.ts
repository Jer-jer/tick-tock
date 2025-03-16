import { IPixabayVideo } from "@/background/interfaces/pixabay/IPixabayVideo";

export interface IPixabayHit {
	id: number;
	pageURL: string;
	type: string;
	tags: string;
	duration: number;
	videos: IPixabayVideo;
	views: number;
	downloads: number;
	likes: number;
	user_id: number;
	user: string;
	userImageURL: string;
}
