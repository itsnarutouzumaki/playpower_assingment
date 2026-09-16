import mockListing from "../data/mockListing";
import Icon from "./Icon";

/**
 * PhotoGrid
 *
 * Renders the five-image hero grid at the top of the listing page (one large
 * hero photo plus four secondary photos) and the "Show all photos" trigger
 * that opens the full Photo Tour view.
 *
 * Data flow:
 * Images come from `mockListing.heroImages`; the first entry is destructured
 * out as `hero` and the remaining four are mapped over as `secondary`, so
 * reordering or resizing the hero set only requires editing the data file,
 * not this component.
 *
 * Interaction contract:
 * This component does not manage any modal/view-switch state itself — it
 * receives `onShowPhotos` (called when the trigger button is clicked) and
 * `showPhotosRef` (a ref forwarded from `App` and attached to this button)
 * as props from its parent, `App`. Keeping the "is Photo Tour open" state in
 * `App` means PhotoGrid stays a simple, presentational component; `App`
 * currently holds `showPhotosRef` alongside that state without calling
 * `.focus()` on it, so it is available as a hook point for focus restoration
 * but does not perform that restoration today.
 *
 * @author @itsnarutouzumaki
 */
const PHOTO_ALTS = [
  "Living area",
  "Bedroom",
  "Private jacuzzi",
  "Apartment detail",
];

export default function PhotoGrid({ onShowPhotos, showPhotosRef }) {
  const [hero, ...secondary] = mockListing.heroImages;

  return (
    <section
      className="page-width pt-1 photo-grid "
      id="photos"
      aria-label={`Photos of ${mockListing.title}`}
    >
      <img
        className="photo-main hover:cursor-pointer !w-[850px]"
        src={hero}
        alt={`${mockListing.title} main view`}
      />
      {secondary.map((src, index) => (
        <img
          key={src}
          className={
            index === 1
              ? "top-right hover:cursor-pointer"
              : index === 3
                ? "bottom-right hover:cursor-pointer"
                : undefined
          }
          src={src}
          alt={PHOTO_ALTS[index]}
        />
      ))}
      <button
        ref={showPhotosRef}
        className="show-photos hover:cursor-pointer"
        type="button"
        aria-label="Show all photos"
        onClick={onShowPhotos}
      >
        <Icon size={16}>
          <rect height="13" rx="1" width="15" x="4.5" y="5.5" />
          <circle cx="9" cy="10" r="1.2" />
          <path d="m6.5 16 3.5-3 2.2 1.8 2.8-3.1 3.5 4.3" />
        </Icon>
        Show all photos
      </button>
    </section>
  );
}
