import { useEffect } from "react";

export default function useKeyboardNav({ onPrev, onNext, onEscape, enabled }) {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event) => {
      switch (event.key) {
        case "ArrowLeft":
          event.preventDefault();
          onPrev?.();
          break;
        case "ArrowRight":
          event.preventDefault();
          onNext?.();
          break;
        case "Escape":
          event.preventDefault();
          onEscape?.();
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [enabled, onPrev, onNext, onEscape]);
}
