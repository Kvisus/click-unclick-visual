import React, { useState } from "react";
import "./App.css";

type Point = {
  x: number;
  y: number;
};

const App = () => {
  const [points, setPoints] = useState<Point[]>([]);
  const [poppedPoints, setPoppedPoints] = useState<Point[]>([]);
  const handlePlaceCircle = (e: React.MouseEvent<HTMLDivElement>) => {
    // console.log(e);
    const { clientX, clientY } = e;
    setPoints([
      ...points,
      {
        x: clientX,
        y: clientY,
      },
    ]);
  };

  const handleUndo = () => {
    const newPoints = [...points];
    const popped = newPoints.pop();
    if (!popped) return;
    setPoppedPoints([...poppedPoints, popped]);
    setPoints(newPoints);
  };

  const handleRedo = () => {
    const newPopped = [...poppedPoints];

    const poppedPoint = newPopped.pop();
    if (!poppedPoint) return;
    setPoints([...points, poppedPoint]);
    setPoppedPoints(newPopped);
  };

  return (
    <>
      <button onClick={handleUndo} disabled={points.length === 0}>
        Undo
      </button>
      <button onClick={handleRedo} disabled={poppedPoints.length === 0}>
        Redo
      </button>
      <div className="App" onClick={handlePlaceCircle}>
        {points.map((point, index) => (
          <div
            className="point"
            key={index}
            style={{ left: point.x - 2 + "px", top: point.y - 11 + "px" }}
          ></div>
        ))}
      </div>
    </>
  );
};
export default App;
