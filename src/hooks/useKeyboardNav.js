import { useEffect } from "react";

/**
 * useKeyboardNav
 *
 * Wires ArrowLeft / ArrowRight / Escape key presses to caller-supplied
 * callbacks while `enabled` is true.
 *
 * Why this abstraction exists:
 * The Lightbox needs the same three key handlers (previous photo, next
 * photo, close) that a future carousel-style component could also need.
 * Isolating the key-handling in a hook keeps components declarative — they
 * pass in what should happen, not how `keydown` events are subscribed to or
 * cleaned up.
 *
 * Behavior notes:
 * - Listens on `document` rather than a specific element so the shortcuts
 *   work regardless of which element inside the modal currently has focus.
 * - Guards every callback with optional chaining (`onPrev?.()`) so a caller
 *   can omit a handler (e.g. Lightbox passes `undefined` for `onPrev` on the
 *   first photo) to effectively disable that key without extra branching.
 * - The listener is only attached while `enabled` is true and is removed on
 *   cleanup/deps change, preventing background navigation while the
 *   Lightbox is closed.
 *
 * @author @itsnarutouzumaki
 *
 * @param {object} params
 * @param {() => void} [params.onPrev] - Called on ArrowLeft.
 * @param {() => void} [params.onNext] - Called on ArrowRight.
 * @param {() => void} [params.onEscape] - Called on Escape.
 * @param {boolean} params.enabled - Whether the listener should be active.
 */
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
