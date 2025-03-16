import { createContext, Dispatch, SetStateAction } from "react";

import { IPixabayVideo } from "@/features/background/interfaces";

interface BackgroundMediaContextProps {
	videos: IPixabayVideo[];
	setBackgroundMedia: Dispatch<SetStateAction<string>>;
	setVideos: Dispatch<SetStateAction<IPixabayVideo[]>>;
	setCountdownFontColor: Dispatch<SetStateAction<string>>;
}

export const BackgroundMediaContext = createContext<
	BackgroundMediaContextProps | undefined
>(undefined);
