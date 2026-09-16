import { useEffect, useRef } from "react";

/**
 * useFocusTrap
 *
 * Keeps keyboard focus confined to a modal-like container (Lightbox, dialogs)
 * while it is open, and restores focus to whatever element opened it once it
 * closes.
 *
 * Why this abstraction exists:
 * Focus containment is required for any overlay that hides the rest of the
 * page from assistive technology (WCAG 2.2 AA "No Keyboard Trap" /
 * "Focus Order"). Extracting it into a hook keeps that logic in one place so
 * every modal-style component (currently Lightbox) gets identical, tested
 * behavior instead of re-implementing Tab-cycling by hand.
 *
 * Lifecycle:
 * 1. On activation, the currently focused element is remembered so it can be
 *    restored later, and focus moves to the first focusable element inside
 *    the container (or the container itself if nothing is focusable).
 * 2. While active, Tab/Shift+Tab presses that would move focus past the last
 *    or before the first focusable element are intercepted and wrapped back
 *    around, so focus never escapes the container.
 * 3. On deactivation/unmount, the listener is removed and focus is returned
 *    to the element that had it before the trap activated (unless the caller
 *    opts out via `restoreFocusOnDeactivate`).
 *
 * @author @itsnarutouzumaki
 *
 * @param {import('react').RefObject<HTMLElement>} containerRef - Ref to the
 *   element that should contain focus while `isActive` is true.
 * @param {boolean} isActive - Whether the trap is currently engaged.
 * @param {{ restoreFocusOnDeactivate?: boolean }} [options] - Set
 *   `restoreFocusOnDeactivate: false` to skip returning focus on close.
 */
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
