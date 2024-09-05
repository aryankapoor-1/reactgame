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

  // Detect collisions using useRapier and trigger game over when the vehicle collides
  const { world } = useRapier();

  useEffect(() => {
    const checkCollisions = () => {
      const bodies = world.contacts; // Get all contacts from the world

      bodies.forEach((contact) => {
        const colliderA = world.getCollider(contact.colliderA);
        const colliderB = world.getCollider(contact.colliderB);

        // Check if either of the colliders belongs to the vehicle
        if (
          colliderA &&
          colliderB &&
          (colliderA === vehicleRef.current || colliderB === vehicleRef.current)
        ) {
          setGameOver(true); // Trigger game over
        }
      });
    };

    world.registerAfterStep(checkCollisions); // Register collision check after each physics step

    return () => {
      world.unregisterAfterStep(checkCollisions); // Cleanup on unmount
    };
  }, [world, setGameOver]);

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
