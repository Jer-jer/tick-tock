import { useContext, useEffect, useState } from "react";

// Components
import Input from "@/common/components/input";
import { MoonLoader } from "react-spinners";
import { Button } from "primereact/button";
import { Galleria, GalleriaResponsiveOptions } from "primereact/galleria";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Tooltip } from "primereact/tooltip";

// Interfaces
import {
	IPixabayResponseData,
	IPixabayVideo,
	IPixabayHit,
	IPexelsResponseData,
	IPexelsPhoto,
} from "../../interfaces";

// State
import { BackgroundMediaContext } from "@/features/background/state/backgroundMedia";

// Services
import { axiosService } from "@/features/background/service/axiosService";

//Utils
import { getTextColor } from "../../utils/getTextColor";

import "primeicons/primeicons.css";
import "./styles.scss";

type VideoCacheBatch = {
	page: number;
	videos: IPixabayVideo[];
};

export default function VideosGrid() {
	const [loading, setLoading] = useState(false);
	const [activeIndex, setActiveIndex] = useState(0);
	const [videoCacheBatch, setVideoCacheBatch] = useState<VideoCacheBatch[]>(
		[]
	);
	const [videos, setVideos] = useState<IPixabayVideo[]>([]);
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
		const cached = videoCacheBatch.find(
			(batch) => batch.page === activePage
		);
		if (cached) {
			setVideos(cached.videos);
		}
	}, [videoCacheBatch, activePage]);

	const thumbnailTemplate = (item: IPixabayVideo) => {
		return (
			<LazyLoadImage
				src={item.small.thumbnail}
				alt="Video Thumbnail"
				placeholderSrc={item.tiny.thumbnail}
				loading="lazy"
			/>
		);
	};

	const videoTemplate = (video: IPixabayVideo) => {
		return (
			<>
				<div
					className={`m-0 p-0 ${loading && "pb-[10px]"} video-container`}
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
							{/* <LazyLoadImage
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
							/> */}
							<video
								src={video.small.url}
								autoPlay
								loop
								muted
								style={{
									width: "100%",
									height: "100%",
									objectFit: "cover",
									willChange: "transform",
								}}
							/>
							<Tooltip
								target=".video-container"
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

	// Remove page manipulation from mediaAxiosInstance
	//TODO Fix CORS (Response body is not available to scripts (Reason: CORS Missing Allow Origin)) Issue
	const mediaAxiosInstance = (page: number) => {
		const PIXABAY_API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;
		const adjustedQuery = backgroundQuery.replace(" ", "+");
		const queryParams = `?key=${PIXABAY_API_KEY}&q=${adjustedQuery}&min_width="1280"&min_height="720"&page=${page}&per_page=5`;

		return axiosService(queryParams, "pixabay");
	};

	const fetchMedia = async (isFromSearch: boolean) => {
		setLoading(true);

		// Determine page first
		let pageToFetch = isFromSearch ? 1 : activePage + 1;

		try {
			const axiosInstance = mediaAxiosInstance(pageToFetch);
			const res = await axiosInstance.get<IPixabayResponseData>("");
			const pixabayData: IPixabayHit[] = res.data.hits;

			let pixabayVideos: IPixabayVideo[] = [];

			pixabayData.map((hit) => {
				pixabayVideos.push(hit.videos);
			});

			if (!isFromSearch)
				// Update cache first only if not from search
				setVideoCacheBatch((prev) => {
					if (prev.some((batch) => batch.page === pageToFetch))
						return prev;
					return [
						...prev,
						{
							page: pageToFetch,
							videos: pixabayVideos,
						},
					];
				});
			else
				// Replace cache if from search
				setVideoCacheBatch(() => {
					return [
						{
							page: pageToFetch,
							videos: pixabayVideos,
						},
					];
				});

			// Update page state after cache update
			setActivePage(pageToFetch);

			if (isFromSearch) setActiveIndex(0);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	const onItemChange = async (index: number) => {
		const isLastImage = activeIndex === videos.length - 1;
		const isFirstImage = activeIndex === 0;

		// Next page navigation
		if (index === 0 && isLastImage) {
			await fetchMedia(false);
			setActiveIndex(0); // Reset to first image of new page
		}
		// Previous page navigation
		else if (index === videos.length - 1 && isFirstImage) {
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
						placeholder="Enter desired video here"
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
					value={videos}
					responsiveOptions={responsiveOptions}
					numVisible={5}
					circular
					style={{ maxWidth: "640px" }}
					showItemNavigators
					item={videoTemplate}
					thumbnail={thumbnailTemplate}
				/>
			</div>
		</div>
	);
}
