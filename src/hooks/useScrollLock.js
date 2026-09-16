import { useEffect } from "react";

/**
 * useScrollLock
 *
 * Prevents the page behind a modal/overlay from scrolling while `isLocked`
 * is true, and restores the previous scroll behavior on cleanup.
 *
 * Why this abstraction exists:
 * When an overlay (e.g. Lightbox) covers the viewport, background scroll
 * should be disabled so keyboard/scroll input stays inside the overlay. This
 * hook centralizes that behavior so it can be reused by any future overlay
 * without duplicating the scrollbar-width compensation logic.
 *
 * Why the scrollbar-width compensation matters:
 * Setting `overflow: hidden` on `<body>` removes the vertical scrollbar,
 * which shifts the whole page left by the scrollbar's width and causes a
 * visible layout jump. This hook measures that width
 * (`window.innerWidth - document.documentElement.clientWidth`) and adds it
 * back as `padding-right` on `<body>` so fixed/sticky content doesn't jump
 * when the overlay opens or closes.
 *
 * @author @itsnarutouzumaki
 *
 * @param {boolean} isLocked - Whether background scrolling should be
 *   disabled.
 */
export default function useScrollLock(isLocked) {
  useEffect(() => {
    if (!isLocked) return;

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;

    document.body.classList.add("overlay-open");
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.classList.remove("overlay-open");
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
    };
  }, [isLocked]);
}
