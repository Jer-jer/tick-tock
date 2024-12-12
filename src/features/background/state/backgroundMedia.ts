import { createContext, Dispatch, SetStateAction } from "react";

import { IPexelsResponse } from "@/features/background/interfaces";

interface BackgroundMediaContextProps {
	images: IPexelsResponse[];
	backgroundQuery: string;
	setBackgroundMedia: Dispatch<SetStateAction<string>>;
	setImages: Dispatch<SetStateAction<IPexelsResponse[]>>;
	setBackgroundQuery: Dispatch<SetStateAction<string>>;
	setCountdownFontColor: Dispatch<SetStateAction<string>>;
	LoadingIcon: React.FC;
}

export const BackgroundMediaContext = createContext<
	BackgroundMediaContextProps | undefined
>(undefined);
