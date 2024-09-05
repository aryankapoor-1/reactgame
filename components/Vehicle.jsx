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
      const force = new Vector3(0, 0, 0);
      if (forward) {
        force.z = -5;
      } else if (backward) {
        force.z = 5;
      }
      vehicleRef.current.applyImpulse(force);
    }
  });

  // Use useRapier to handle collision events
  useEffect(() => {
    const unsubscribe = vehicleRef.current?.onCollide((event) => {
      setGameOver(true); // Trigger game over on any collision
    });

    // Cleanup subscription
    return () => unsubscribe?.();
  }, [setGameOver]);

  return (
    <group ref={vehicleRef}>
      {/* Front Sphere Wheel */}
      <RigidBody colliders="ball" type="dynamic">
        <Sphere args={[0.5]} position={[0, 0.5, 2]} />
      </RigidBody>

      {/* Back Left Cylinder Wheel */}
      <RigidBody colliders="hull" type="dynamic">
        <Cylinder
          args={[0.5, 0.5, 1.5]}
          position={[-1, 0.5, -2]}
          rotation={[Math.PI / 2, 0, 0]}
        />
      </RigidBody>

      {/* Back Right Cylinder Wheel */}
      <RigidBody colliders="hull" type="dynamic">
        <Cylinder
          args={[0.5, 0.5, 1.5]}
          position={[1, 0.5, -2]}
          rotation={[Math.PI / 2, 0, 0]}
        />
      </RigidBody>

      {/* Vehicle Body */}
      <RigidBody colliders="cuboid" type="dynamic">
        <Box args={[2, 1, 3]} position={[0, 1, 0]} />
      </RigidBody>
    </group>
  );
}
