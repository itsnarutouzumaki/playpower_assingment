import { useEffect, useRef } from "react";

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export default function useFocusTrap(containerRef, isActive, { restoreFocusOnDeactivate = true } = {}) {
  const previouslyFocusedRef = useRef(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    previouslyFocusedRef.current = document.activeElement;

    const container = containerRef.current;
    const focusable = Array.from(container.querySelectorAll(FOCUSABLE));
    if (focusable.length > 0) {
      focusable[0].focus();
    } else {
      container.setAttribute("tabindex", "-1");
      container.focus();
    }

    const handleKeyDown = (event) => {
      if (event.key !== "Tab") return;

      const elements = Array.from(container.querySelectorAll(FOCUSABLE));
      if (elements.length === 0) return;

      const first = elements[0];
      const last = elements[elements.length - 1];

      if (event.shiftKey) {
        if (document.activeElement === first) {
          event.preventDefault();
          last.focus();
        }
      } else if (document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    container.addEventListener("keydown", handleKeyDown);

    return () => {
      container.removeEventListener("keydown", handleKeyDown);
      if (restoreFocusOnDeactivate) {
        previouslyFocusedRef.current?.focus?.();
      }
    };
  }, [containerRef, isActive, restoreFocusOnDeactivate]);
}
