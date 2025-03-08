import { Dialog } from "primereact/dialog";

import "./styles.scss";

type Position =
	| "top"
	| "center"
	| "bottom"
	| "left"
	| "right"
	| "top-left"
	| "top-right"
	| "bottom-left"
	| "bottom-right"
	| undefined;

interface ModalProps {
	className?: string;
	header?: React.ReactNode | string;
	position?: Position;
	draggable?: boolean;
	visible: boolean;
	children: React.ReactNode;

	onHide: () => void;
}

export default function Modal({
	className,
	header,
	position,
	draggable,
	visible,
	children,
	onHide,
}: ModalProps) {
	return (
		<Dialog
			className={`modal ${className}`}
			header={header}
			position={position}
			draggable={draggable}
			visible={visible}
			onHide={onHide}
		>
			{children}
		</Dialog>
	);
}
