type PixabayVideoSize = {
	url: string;
	width: number;
	height: number;
	size: number;
	thumbnail: string;
};

export interface IPixabayVideo {
	// large: PixabayVideoSize;
	medium: PixabayVideoSize;
	small: PixabayVideoSize;
	tiny: PixabayVideoSize;
}
