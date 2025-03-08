import { createContext, Dispatch, SetStateAction } from "react";

import { IPexelsPhoto, IPixabayVideo } from "@/features/background/interfaces";

interface BackgroundMediaContextProps {
	images: IPexelsPhoto[];
	videos: IPixabayVideo[];
	backgroundQuery: string;
	setBackgroundMedia: Dispatch<SetStateAction<string>>;
	setImages: Dispatch<SetStateAction<IPexelsPhoto[]>>;
	setVideos: Dispatch<SetStateAction<IPixabayVideo[]>>;
	setBackgroundQuery: Dispatch<SetStateAction<string>>;
	setCountdownFontColor: Dispatch<SetStateAction<string>>;
}

export const BackgroundMediaContext = createContext<
	BackgroundMediaContextProps | undefined
>(undefined);
