export const handleFileUpload = async (
	event: React.ChangeEvent<HTMLInputElement>,
	setBackground: React.Dispatch<React.SetStateAction<string | null>>
) => {
	const file = event.target.files?.[0];

	if (file) {
		const isValidType = [
			"image/jpeg",
			"image/png",
			"image/gif",
			"video/mp4",
			"video/webm",
		].includes(file.type);
		if (!isValidType) {
			alert(
				"Unsupported file type. Please upload a jpg, png, gif, mp4, or webm file."
			);
			return;
		}

		// Check file size
		const isImage = file.type.startsWith("image");
		const maxSize = 5000000; // 5MB for media
		console.log("File size:", file.size, "Max size:", maxSize);
		if (file.size > maxSize) {
			alert(`File size exceeds the limit of 5MB.`);
			return;
		}

		// Check video resolution
		if (!isImage) {
			const video = document.createElement("video");
			video.src = URL.createObjectURL(file);
			await new Promise((resolve) => {
				video.onloadedmetadata = () => {
					if (video.videoHeight > 1080) {
						alert("Video resolution exceeds 1080.");
						return;
					}
					resolve(null);
				};
			});
		}

		const reader = new FileReader();
		reader.onload = () => {
			const result = reader.result as string;
			setBackground(result);
			console.log("Result after storing in localStorage:", result);
			localStorage.setItem("background", result); // Save to local storage
		};
		reader.readAsDataURL(file);
	}
};
