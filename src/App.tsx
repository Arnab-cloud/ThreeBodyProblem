import { useEffect, useState } from "react";
import "./App.css";
import Point from "./components/point";
import { time } from "console";

const defPos = {
	x: 100,
	y: 300,
};

const delay = 200;
const radius = 20;

function App() {
	const [onOff, setOnOff] = useState<boolean>(false);
	const [dis, setDis] = useState({ x: 0, y: 0 });
	const [vel, setVel] = useState({ x: 0, y: 0 });
	const [counter, setCounter] = useState<number>(0);

	setTimeout(() => {
		if (onOff) {
			setCounter((count) => count + delay);
			const newVel = {
				x: Math.ceil(Math.cos(counter) * delay),
				y: Math.ceil(Math.sin(counter) * delay),
			};
			const newDis = {
				x: dis.x + vel.x,
				y: dis.y + vel.y,
			};
			setDis(newDis);
			setVel(newVel);
		}
	}, delay);

	return (
		<div className="container">
			<div className="App">
				<Point
					color="red"
					radius={5}
					position={{ x: defPos.x + dis.x, y: defPos.y + dis.y }}
					trailColor="red"
				/>
			</div>
			<div className="controls">
				<button
					onClick={(e) => {
						setOnOff(!onOff);
					}}
				>
					{onOff ? "Stop" : "Start"}
				</button>
				<button
					onClick={() => {
						setOnOff(false);
						setDis({ x: 0, y: 0 });
					}}
				>
					Restart
				</button>
			</div>
		</div>
	);
}

export default App;
