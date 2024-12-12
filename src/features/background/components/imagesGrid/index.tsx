import { useContext, useState } from "react";

// Components
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Galleria, GalleriaResponsiveOptions } from "primereact/galleria";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Tooltip } from "primereact/tooltip";

// Interfaces
import { IPexelsResponse } from "../../interfaces";

// State
import { BackgroundMediaContext } from "@/features/background/state/backgroundMedia";

// Services
import { axiosService } from "@/features/background/service/axiosService";

//Utils
import { getTextColor } from "../../utils/getTextColor";

import "primeicons/primeicons.css";
import "./styles.scss";

export default function ImagesGrid() {
	const [loading, setLoading] = useState(false);

	const backgroundMediaContext = useContext(BackgroundMediaContext);

	const images = backgroundMediaContext!.images;
	const backgroundQuery = backgroundMediaContext!.backgroundQuery;
	const setBackgroundMedia = backgroundMediaContext!.setBackgroundMedia;
	const setBackgroundQuery = backgroundMediaContext!.setBackgroundQuery;
	const setImages = backgroundMediaContext!.setImages;
	const setCountdownFontColor =
		backgroundMediaContext!.setCountdownFontColor;
	const LoadingIcon = backgroundMediaContext!.LoadingIcon;

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

	const imageTemplate = (image: IPexelsResponse) => {
		return (
			<>
				<div className="m-0 p-0 image-container">
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
				</div>

				<Tooltip
					target=".image-container"
					content="Set image as background"
					mouseTrack
					mouseTrackTop={20}
					position="bottom"
				/>
			</>
		);
	};

	const thumbnailTemplate = (item: IPexelsResponse) => {
		return (
			<LazyLoadImage
				src={item.src.small}
				alt={item.alt}
				placeholderSrc={item.src.tiny}
				loading="lazy"
			/>
		);
	};

	const handleBackgroundChange = async (
		event: React.FormEvent<HTMLFormElement>
	) => {
		event.preventDefault();
		setLoading(true);
		const image = backgroundQuery;
		const axiosInstance = axiosService(
			`?query=${image}&orientation=landscape`,
			"pexels"
		);
		await axiosInstance
			.get("")
			.then((res) => {
				setImages(res.data.photos);
			})
			.catch((error) => {
				console.error(error);
			});
		setLoading(false);
	};

	return (
		<div className="flex flex-col justify-center items-center gap-5 image-grid w-full">
			<form className="w-full" onSubmit={handleBackgroundChange}>
				<div className="flex items-center w-full h-[40px] header">
					<InputText
						className="rounded-tr-none rounded-br-none !w-full"
						type="text"
						name="bg-url"
						placeholder="Enter desired image here"
						value={backgroundQuery}
						onChange={(e) =>
							setBackgroundQuery(e.target.value)
						}
						required
					/>
					<Button
						className="bg-violet px-[0.45rem] py-[0.5rem] border-t-r-0 rounded-tl-none rounded-bl-none w-fit h-fit text-white"
						type="submit"
						autoFocus
					>
						{loading ? <LoadingIcon /> : "Search"}
					</Button>
				</div>
			</form>

			<div className={`place-items-center grid w-full menu`}>
				<Galleria
					className="media-gallery"
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
