import mockListing from "../data/mockListing";
import Icon from "./Icon";

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
