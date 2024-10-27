import { useEffect, useRef, useState } from "react";
import "./styles.css";
import Dot from "../dots";

type pos = {
	x: number;
	y: number;
};

interface styleType {
	color?: string;
	trailColor?: string;
	position?: pos;
	radius?: number;
}

const defaultPos: pos = {
	x: 10,
	y: 10,
};

const Point: React.FC<styleType> = ({
	color = "black",
	trailColor = "black",
	radius = 10,
	position = defaultPos,
}) => {
	const [isPressed, setPressed] = useState<boolean>(false);
	const [pos, setPos] = useState({ x: 0, y: 0 });
	const [dots, setDots] = useState<JSX.Element[]>([]);
	const ref = useRef<HTMLDivElement>(
		null
	) as React.MutableRefObject<HTMLDivElement>;

	useEffect(() => {
		ref.current.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
		const newDots = [
			...dots,
			<Dot
				color={trailColor}
				position={{
					x: position.x + pos.x - radius,
					y: position.y + pos.y - radius,
				}}
			/>,
		];
		setDots(newDots);
		setTimeout(() => {
			setDots((oldDots) => oldDots.slice(1));
		}, 1500);
	}, [pos]);

	const handleMouseMove = (
		e: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		if (isPressed) {
			const newPos = {
				x: e.movementX + pos.x,
				y: e.movementY + pos.y,
			};
			setPos(newPos);
		}
	};

	const handleMouseDown = () => {
		setPressed(true);
	};
	const handleMouseUp = () => {
		setPressed(false);
	};

	const computedStyles: React.CSSProperties = {
		backgroundColor: color,
		width: `${2 * radius}px`,
		height: `${2 * radius}px`,
		top: `${position.y - radius}px`,
		left: `${position.x - radius}px`,
	};

	return (
		<>
			<div
				ref={ref}
				className="point"
				style={computedStyles}
				onMouseMove={handleMouseMove}
				onMouseDown={handleMouseDown}
				onMouseUp={handleMouseUp}
			></div>
			{dots}
		</>
	);
};

export default Point;
