import { useRef } from "react";
import mockListing from "../data/mockListing";
import useFocusTrap from "../hooks/useFocusTrap";
import useKeyboardNav from "../hooks/useKeyboardNav";
import Icon from "./Icon";

/**
 * Lightbox
 *
 * Single-photo, full-screen overlay for viewing one image at a time with
 * Previous/Next controls and keyboard navigation.
 *
 * Why Lightbox is a separate component from PhotoTour:
 * PhotoTour renders the *grid* of every room/category photo grouped by
 * category (a browsing view). Lightbox renders exactly one photo at a time
 * as a modal dialog (a focused, distraction-free view). Splitting them keeps
 * each component's responsibility singular — PhotoTour owns layout/grouping,
 * Lightbox owns single-image presentation, focus containment, and
 * prev/next/escape key handling — rather than one component branching
 * between "grid mode" and "single photo mode".
 *
 * Selected-image state:
 * Lightbox itself is stateless with respect to *which* photo is shown — the
 * currently displayed photo is identified purely by the `photoIndex` prop
 * passed in from the parent, and `mockListing.galleryImages[photoIndex]` is
 * used to resolve the actual image URL. This keeps a single source of truth
 * for "which image is active" in the parent rather than duplicating an index
 * in local state that could drift out of sync.
 *
 * Keyboard navigation:
 * `useKeyboardNav` binds ArrowLeft/ArrowRight/Escape while `isOpen` is true.
 * `onPrev`/`onNext` are passed as `undefined` at the first/last photo
 * (`isFirst`/`isLast`) so the hook is a no-op at the boundaries instead of
 * wrapping around or throwing — this mirrors the disabled state of the
 * on-screen Previous/Next buttons.
 *
 * Escape handling:
 * `onEscape` is wired to `handleClose`, which simply calls the `onClose`
 * prop — closing is always delegated to the parent that owns the "is the
 * lightbox open" state, so Lightbox never manages its own visibility beyond
 * the `isOpen` prop it's given.
 *
 * Focus behavior:
 * `useFocusTrap` is attached to the dialog's root `dialogRef` so Tab/Shift+
 * Tab cannot move focus to the page behind the overlay, and focus is
 * restored to the triggering element when the lightbox closes. See
 * `useFocusTrap` for the underlying mechanics.
 *
 * Why the focus-trap/scroll-lock hooks exist:
 * Any full-screen modal needs to (a) keep keyboard focus inside itself and
 * (b) stop the page behind it from scrolling, per WCAG 2.2 AA. Both concerns
 * are extracted into hooks (`useFocusTrap`, `useScrollLock`) so they are
 * reusable by any future overlay rather than being re-implemented per
 * component.
 *
 * Known constraint:
 * In the current build, Lightbox is not mounted from `App.jsx` or
 * `PhotoTour.jsx` — no photo click currently opens it, and `useScrollLock`
 * is not invoked from this component. It is documented here as designed
 * because its props/behavior contract (open state, index, prev/next/close)
 * represent the intended integration point for wiring a photo-click handler
 * in `PhotoGrid`/`PhotoTour` in the future. This is a documentation note,
 * not a change to application behavior.
 *
 * @author @itsnarutouzumaki
 */
const PHOTO_ALTS = [
  "Main view",
  "Living area",
  "Bedroom",
  "Private jacuzzi",
  "Apartment detail",
];

export default function Lightbox({
  isOpen,
  photoIndex,
  onClose,
  onPrev,
  onNext,
}) {
  const dialogRef = useRef(null);
  const liveRef = useRef(null);
  const total = mockListing.galleryImages.length;
  const isFirst = photoIndex === 0;
  const isLast = photoIndex === total - 1;

  useFocusTrap(dialogRef, isOpen);
  const handleClose = () => onClose();

  useKeyboardNav({
    enabled: isOpen,
    onPrev: isFirst ? undefined : onPrev,
    onNext: isLast ? undefined : onNext,
    onEscape: handleClose,
  });

  if (!isOpen) return null;

  return (
    <div
      ref={dialogRef}
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`Photo ${photoIndex + 1} of ${total}`}
    >
      <div className="lightbox__backdrop" aria-hidden="true" />
      <header className="lightbox__header">
        <p className="lightbox__counter" aria-live="polite" ref={liveRef} tabIndex={-1}>
          Photo {photoIndex + 1} of {total}
        </p>
        <button
          className="lightbox__close"
          type="button"
          aria-label="Close lightbox"
          onClick={handleClose}
        >
          <Icon size={16}>
            <path d="M6 6l12 12M18 6 6 18" />
          </Icon>
        </button>
      </header>
      <div className="lightbox__stage">
        <button
          className="lightbox__nav lightbox__nav--prev"
          type="button"
          aria-label="Previous photo"
          disabled={isFirst}
          onClick={onPrev}
        >
          <Icon size={20}>
            <path d="m15 18-6-6 6-6" />
          </Icon>
        </button>
        <img
          className="lightbox__image"
          src={mockListing.galleryImages[photoIndex]}
          alt={PHOTO_ALTS[photoIndex] ?? `Photo ${photoIndex + 1}`}
        />
        <button
          className="lightbox__nav lightbox__nav--next"
          type="button"
          aria-label="Next photo"
          disabled={isLast}
          onClick={onNext}
        >
          <Icon size={20}>
            <path d="m9 18 6-6-6-6" />
          </Icon>
        </button>
      </div>
    </div>
  );
}
