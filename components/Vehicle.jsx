import { useRapier, RigidBody } from "@react-three/rapier";
import { Sphere, Box, Cylinder } from "@react-three/drei";
import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useMovementControls } from "@/hooks/useMovementControls";
import { Vector3 } from "three";

export function Vehicle({ setGameOver }) {
  const vehicleRef = useRef(null); // Ref to access vehicle's RigidBody
  const { forward, backward } = useMovementControls();

  // Apply movement forces to the vehicle based on user input (W or S)
  useFrame(() => {
    if (vehicleRef.current) {
      const force = forward
        ? new Vector3(0, 0, -5)
        : backward
        ? new Vector3(0, 0, 5)
        : new Vector3(0, 0, 0);
      vehicleRef.current.applyForce(force);
    }
  });

  // Detect collisions using useRapier and trigger game over when the vehicle collides
  const { contacts } = useRapier();

  useEffect(() => {
    contacts.forEach((contact) => {
      if (
        contact.colliderA.current === vehicleRef.current ||
        contact.colliderB.current === vehicleRef.current
      ) {
        setGameOver(true); // Trigger game over
      }
    });
  }, [contacts, setGameOver]);

  return (
    <group ref={vehicleRef}>
      {/* Front Sphere Wheel */}
      <RigidBody colliders="ball">
        <Sphere args={[0.5]} position={[0, 0.5, 2]} />
      </RigidBody>

      {/* Back Left Cylinder Wheel */}
      <RigidBody colliders="hull">
        <Cylinder
          args={[0.5, 0.5, 1.5]}
          position={[-1, 0.5, -2]}
          rotation={[Math.PI / 2, 0, 0]}
        />
      </RigidBody>

      {/* Back Right Cylinder Wheel */}
      <RigidBody colliders="hull">
        <Cylinder
          args={[0.5, 0.5, 1.5]}
          position={[1, 0.5, -2]}
          rotation={[Math.PI / 2, 0, 0]}
        />
      </RigidBody>

      {/* Vehicle Body */}
      <RigidBody colliders="cuboid">
        <Box args={[2, 1, 3]} position={[0, 1, 0]} />
      </RigidBody>
    </group>
  );
}
