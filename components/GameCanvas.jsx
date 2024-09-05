import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Physics } from "@react-three/rapier"; // Import Physics wrapper
import { Vehicle } from "@/components/Vehicle";
import { FallingShapes } from "@/components/FallingShapes";

const GameCanvas = () => {
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  // Increment score every second when the game is not over
  useEffect(() => {
    const interval = setInterval(() => {
      if (!gameOver) {
        setScore((prevScore) => prevScore + 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [gameOver]);

  // Submit the score when the game is over
  useEffect(() => {
    if (gameOver) {
      fetch("/api/submitScore", {
        method: "POST",
        body: JSON.stringify({ score }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            console.log("Score submitted successfully!");
          } else {
            console.error("Error submitting score:", data.error);
          }
        })
        .catch((error) => console.error("Error:", error));
    }
  }, [gameOver, score]);

  return (
    <div className="w-full h-screen relative">
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[0, 5, 5]} />
        <OrbitControls />

        {/* Physics wrapper */}
        <Physics>
          <Vehicle setGameOver={setGameOver} />
          <FallingShapes />
        </Physics>
      </Canvas>

      {/* Game UI */}
      <div className="absolute top-0 left-0 p-4 text-white">
        <h1>Score: {score}</h1>
        {gameOver && <h2>Game Over</h2>}
      </div>
    </div>
  );
};

export default GameCanvas;
