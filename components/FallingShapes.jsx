import { useRapier, RigidBody } from "@react-three/rapier";
import { Box, Sphere } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useState, useEffect , useRef } from "react";
import { v4 as uuidv4 } from "uuid";

export function FallingShapes() {
  const [shapes, setShapes] = useState([]);
  const shapesRef = useRef(shapes); // Reference to current shapes for state updates

  // Update shapes ref when state changes
  useEffect(() => {
    shapesRef.current = shapes;
  }, [shapes]);

  useFrame(() => {
    // Generate new shapes at random intervals
    if (Math.random() < 0.01) {
      const shapeType = Math.random() > 0.5 ? "box" : "sphere";
      const newShape = {
        id: uuidv4(),
        type: shapeType,
        position: [Math.random() * 10 - 5, 10, Math.random() * 10 - 5],
      };
      setShapes((prev) => [...prev, newShape]);
    }

    // Remove shapes that fall below a certain y position (for cleanup)
    setShapes((prev) => prev.filter((shape) => shape.position[1] > -10));
  });

  return (
    <group>
      {shapes.map((shape) => (
        <RigidBody
          key={shape.id}
          colliders={shape.type === "box" ? "cuboid" : "ball"}
          position={shape.position}
        >
          {shape.type === "box" ? (
            <Box args={[1, 1, 1]} />
          ) : (
            <Sphere args={[0.5]} />
          )}
        </RigidBody>
      ))}
    </group>
  );
}
