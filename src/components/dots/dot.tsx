import "./styles.css";

type pos = {
	x: number;
	y: number;
};

interface styleType {
	color?: string;
	position: pos;
}

const Dot: React.FC<styleType> = ({ color = "black", position }) => {
	const computedStyles: React.CSSProperties = {
		backgroundColor: color,
		top: `${position.y}px`,
		left: `${position.x}px`,
		boxShadow: `0rem 0rem 2px 1px ${color}`,
	};

	return <div className="dot" style={computedStyles}></div>;
};

export default Dot;
