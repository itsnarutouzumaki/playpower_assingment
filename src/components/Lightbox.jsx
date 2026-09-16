import { useRef } from "react";
import mockListing from "../data/mockListing";
import useFocusTrap from "../hooks/useFocusTrap";
import useKeyboardNav from "../hooks/useKeyboardNav";
import Icon from "./Icon";

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
