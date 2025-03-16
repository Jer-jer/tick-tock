import { useContext, useEffect, useState } from "react";

// Components
import Input from "@/common/components/input";
import { MoonLoader } from "react-spinners";
import { Button } from "primereact/button";
import { Galleria, GalleriaResponsiveOptions } from "primereact/galleria";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Tooltip } from "primereact/tooltip";

// Interfaces
import { IPexelsResponseData, IPexelsPhoto } from "../../interfaces";

// State
import { BackgroundMediaContext } from "@/features/background/state/backgroundMedia";

// Services
import { axiosService } from "@/features/background/service/axiosService";

//Utils
import { getTextColor } from "../../utils/getTextColor";

import "primeicons/primeicons.css";
import "./styles.scss";

type ImageCacheBatch = {
	page: number;
	photos: IPexelsPhoto[];
};

export default function ImagesGrid() {
	const [loading, setLoading] = useState(false);
	const [activeIndex, setActiveIndex] = useState(0);
	const [imageCacheBatch, setImageCacheBatch] = useState<ImageCacheBatch[]>(
		[]
	);
	const [images, setImages] = useState<IPexelsPhoto[]>([]);
	const [activePage, setActivePage] = useState(1); // Current page
	const [backgroundQuery, setBackgroundQuery] = useState<string>("");

	const backgroundMediaContext = useContext(BackgroundMediaContext);
	const setBackgroundMedia = backgroundMediaContext!.setBackgroundMedia;
	const setCountdownFontColor =
		backgroundMediaContext!.setCountdownFontColor;

	const responsiveOptions: GalleriaResponsiveOptions[] = [
		{
			breakpoint: "991px",
			numVisible: 4,
		},
		{
			breakpoint: "768px",
			numVisible: 3,
		},
		{
			breakpoint: "640px",
			numVisible: 1,
		},
	];

	// Sets the image as background
	const setBackground = (image: string, avgColor: string) => {
		const adjustedTextColor = getTextColor(avgColor);
		setCountdownFontColor(adjustedTextColor);
		setBackgroundMedia(image);

		localStorage.setItem("countdownColor", adjustedTextColor);
		localStorage.setItem("background", image); // Save to local storage
	};

	useEffect(() => {
		const cached = imageCacheBatch.find(
			(batch) => batch.page === activePage
		);
		if (cached) {
			setImages(cached.photos);
		}
	}, [imageCacheBatch, activePage]);

	const imageTemplate = (image: IPexelsPhoto) => {
		return (
			<>
				<div
					className={`m-0 p-0 ${loading && "pb-[10px]"} image-container`}
				>
					{/* <video
						src="https://cdn.pixabay.com/video/2018/04/30/15922-267503898_medium.mp4"
						autoPlay
						loop
						muted
						style={{
							width: "100%",
							height: "100%",
							objectFit: "cover",
							willChange: "transform",
						}}
					/> */}
					{loading ? (
						<MoonLoader color="#000" size={80} />
					) : (
						<>
							<LazyLoadImage
								className="block w-full cursor-pointer image"
								onClick={() =>
									setBackground(
										image.src.original,
										image.avg_color
									)
								}
								src={image.src.original}
								alt={image.alt}
								placeholderSrc={image.src.tiny}
								loading="lazy"
							/>
							<Tooltip
								target=".image-container"
								content="Set image as background"
								mouseTrack
								mouseTrackTop={20}
								position="bottom"
							/>
						</>
					)}
				</div>
			</>
		);
	};

	const thumbnailTemplate = (item: IPexelsPhoto) => {
		return (
			<LazyLoadImage
				src={item.src.tiny}
				alt={item.alt}
				placeholderSrc={item.src.tiny}
				loading="lazy"
			/>
		);
	};

	// Remove page manipulation from mediaAxiosInstance
	const mediaAxiosInstance = (page: number) => {
		const queryParams = `?query=${backgroundQuery}&orientation=landscape&page=${page}`;
		return axiosService(queryParams, "pexels");
	};

	const fetchMedia = async (isFromSearch: boolean) => {
		setLoading(true);

		// Determine page first
		let pageToFetch = isFromSearch ? 1 : activePage + 1;

		try {
			const axiosInstance = mediaAxiosInstance(pageToFetch);
			const res = await axiosInstance.get<IPexelsResponseData>("");
			const pexelsData = res.data;

			if (!isFromSearch)
				// Update cache first only if not from search
				setImageCacheBatch((prev) => {
					if (
						prev.some(
							(batch) => batch.page === pexelsData.page
						)
					)
						return prev;
					return [
						...prev,
						{
							page: pexelsData.page,
							photos: pexelsData.photos,
						},
					];
				});
			else
				// Replace cache if from search
				setImageCacheBatch(() => {
					return [
						{
							page: pexelsData.page,
							photos: pexelsData.photos,
						},
					];
				});

			// Update page state after cache update
			setActivePage(pexelsData.page);

			if (isFromSearch) setActiveIndex(0);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	const onItemChange = async (index: number) => {
		const isLastImage = activeIndex === images.length - 1;
		const isFirstImage = activeIndex === 0;

		// Next page navigation
		if (index === 0 && isLastImage) {
			await fetchMedia(false);
			setActiveIndex(0); // Reset to first image of new page
		}
		// Previous page navigation
		else if (index === images.length - 1 && isFirstImage) {
			if (activePage > 1) {
				setActivePage((prev) => prev - 1);
				setActiveIndex(14); // Show last image of previous page
			}
		}
		// Normal navigation
		else {
			setActiveIndex(index);
		}
	};

	const handleBackgroundChange = async (
		event: React.FormEvent<HTMLFormElement>
	) => {
		event.preventDefault();
		await fetchMedia(true);
	};

	return (
		<div className="flex flex-col justify-center items-center gap-5 image-grid w-full">
			<form className="w-full" onSubmit={handleBackgroundChange}>
				<div className="flex items-center w-full h-[40px] header">
					<Input
						className="rounded-tr-none rounded-br-none !w-full"
						type="text"
						name="bg-url"
						placeholder="Enter desired image here"
						value={backgroundQuery}
						onChange={(e) =>
							setBackgroundQuery(e.target.value)
						}
					/>
					<Button
						className="bg-violet px-[0.45rem] py-[0.5rem] border-t-r-0 rounded-tl-none rounded-bl-none w-fit h-fit text-white"
						type="submit"
						autoFocus
					>
						{loading ? (
							<MoonLoader
								className="mx-auto my-0"
								color="#fff"
								size={18}
							/>
						) : (
							"Search"
						)}
					</Button>
				</div>
			</form>

			<div className={`place-items-center grid w-full menu`}>
				<Galleria
					className="media-gallery"
					activeIndex={activeIndex}
					onItemChange={(e) => onItemChange(e.index)}
					value={images}
					responsiveOptions={responsiveOptions}
					numVisible={5}
					circular
					style={{ maxWidth: "640px" }}
					showItemNavigators
					item={imageTemplate}
					thumbnail={thumbnailTemplate}
				/>
			</div>
		</div>
	);
}
