// hooks/useMovementControls.js
import { useEffect, useState } from "react";

export function useMovementControls() {
  const [movement, setMovement] = useState({ forward: false, backward: false });

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "w") setMovement((m) => ({ ...m, forward: true }));
      if (event.key === "s") setMovement((m) => ({ ...m, backward: true }));
    };

    const handleKeyUp = (event) => {
      if (event.key === "w") setMovement((m) => ({ ...m, forward: false }));
      if (event.key === "s") setMovement((m) => ({ ...m, backward: false }));
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return movement;
}
