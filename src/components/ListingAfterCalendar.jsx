import { useState } from "react";
import mockListing from "../data/mockListing";
import Icon from "./Icon";

/**
 * ListingAfterCalendar
 *
 * Renders the sections that follow the booking calendar in scroll order:
 * the ratings/reviews section (`id="reviews"`, giant rating header, review
 * tag chips, individual review cards) and the location section
 * (`id="location"`), both anchor targets for `ListingNav`'s section links.
 *
 * Data:
 * `reviewTags` (the small chip icons/counts like "Comfort", "Cleanliness")
 * is local presentational data rather than part of `mockListing`, since it
 * summarizes review categories rather than describing the listing itself.
 * `summary`, `ratingImage`, `reviews`, and `location` are read from
 * `mockListing`.
 *
 * @author @itsnarutouzumaki
 */
const reviewTags = [
  { img: "/reviewtag/comfort.png", label: "Comfort", count: 6 },
  { img: "/reviewtag/accuracy.png", label: "Accuracy", count: 5 },
  { img: "/reviewtag/hot-tub.png", label: "Hot tub", count: 5 },
  { img: "/reviewtag/condition.png", label: "Condition", count: 4 },
  { img: "/reviewtag/hospitality.png", label: "Hospitality", count: 8 },
  { img: "/reviewtag/cleanliness.png", label: "Cleanliness", count: 4 },
  { img: "/reviewtag/amenities.png", label: "Amenities", count: 2 },
  { img: "/reviewtag/decor.png", label: "Decor", count: 2 },
  { img: "/reviewtag/indoor-space.png", label: "Indoor space", count: 2 },
  { img: "/reviewtag/location.png", label: "Location", count: 2 },
];

export default function ListingAfterCalendar() {
  const { summary, ratingImage, reviews, location } = mockListing;
  const [expandedReviews, setExpandedReviews] = useState({});
  const [neighbourhoodOpen, setNeighbourhoodOpen] = useState(false);
  const [mapZoom, setMapZoom] = useState(0);

  return (
    <div className="w-full font-sans text-[#222222]">
      {/* --- Reviews Section --- */}
      <section className="py-12" id="reviews">
        {/* 1. Giant Rating Header */}
        <div className="flex flex-col items-center justify-center text-center">
          <div className="flex items-center justify-center gap-1">
            <img
              src={ratingImage[0]}
              alt="Left Wreath"
              className="h-[105px] w-auto object-contain object-right"
            />
            <span className="text-[96px] font-semibold tracking-[-0.04em] text-[#222222] leading-none mb-2">
              {summary.rating}
            </span>
            <img
              src={ratingImage[1]}
              alt="Right Wreath"
              className="h-[105px] w-auto object-contain object-left"
            />
          </div>

          <h2 className="mt-2 text-[22px] font-semibold text-[#222222]">
            Guest favourite
          </h2>
          <p className="mt-2 text-[16px] text-[#717171] w-[350px] leading-snug">
            This home is a guest favourite based on ratings, reviews and
            reliability
          </p>
          <button
            className="mt-3 text-[14px] font-semibold text-[#222222] underline underline-offset-2 transition hover:text-black"
            type="button"
          >
            How reviews work
          </button>
        </div>

        {/* 2. Rating Breakdown Columns */}
        <div className="mt-14 flex w-full items-stretch pb-10">
          {/* Overall Rating (Progress Bars) */}
          <div className="flex w-[18%] min-w-[150px] flex-col pr-6 border-r border-[#ebebeb]">
            <h3 className="mb-4 text-[14px] font-semibold text-[#222222]">
              Overall rating
            </h3>
            <div className="flex w-full flex-col gap-[9px] mt-4 ">
              {[5, 4, 3, 2, 1].map((num) => (
                <div key={num} className="flex items-center gap-3">
                  <span className="w-2 text-[12px] font-normal text-[#222222] leading-none">
                    {num}
                  </span>
                  <div className="relative h-[4px] w-full rounded-full bg-[#ebebeb]">
                    <div
                      className="absolute left-0 top-0 h-full rounded-full bg-[#222222]"
                      style={{
                        width: num === 5 ? "95%" : num === 4 ? "5%" : "0%",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Categories Grid */}
          <div className="flex flex-1 items-stretch">
            {/* Cleanliness */}
            <div className="flex flex-1 flex-col pl-6 pr-2 border-r border-[#ebebeb]">
              <h3 className="text-[14px] font-medium text-[#222222]">
                Cleanliness
              </h3>
              <b className="mt-2 text-[18px] font-semibold text-[#222222]">
                5.0
              </b>
              <Icon size={32} className="mt-4 stroke-[1.5] text-[#222222]">
                <path
                  d="M12.5 15v5M12.5 11v1M7.5 15h10M9 8V5c0-1.1.9-2 2-2h3M7 21h11a2 2 0 002-2v-4l-3-6H8l-3 6v4a2 2 0 002 2z"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="5" cy="5" r="1" fill="currentColor" stroke="none" />
                <circle
                  cx="17"
                  cy="8"
                  r="1"
                  fill="currentColor"
                  stroke="none"
                />
              </Icon>
            </div>

            {/* Accuracy */}
            <div className="flex flex-1 flex-col pl-6 pr-2 border-r border-[#ebebeb]">
              <h3 className="text-[14px] font-medium text-[#222222]">
                Accuracy
              </h3>
              <b className="mt-2 text-[18px] font-semibold text-[#222222]">
                5.0
              </b>
              <Icon size={32} className="mt-4 stroke-[1.5] text-[#222222]">
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  fill="none"
                  stroke="currentColor"
                />
                <path
                  d="M8 12l3 3 5-6"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Icon>
            </div>

            {/* Check-in */}
            <div className="flex flex-1 flex-col pl-6 pr-2 border-r border-[#ebebeb]">
              <h3 className="text-[14px] font-medium text-[#222222]">
                Check-in
              </h3>
              <b className="mt-2 text-[18px] font-semibold text-[#222222]">
                5.0
              </b>
              <Icon size={32} className="mt-4 stroke-[1.5] text-[#222222]">
                <circle cx="9" cy="9" r="4" fill="none" stroke="currentColor" />
                <path
                  d="M12 12l6 6M16 12l2 2"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Icon>
            </div>

            {/* Communication */}
            <div className="flex flex-1 flex-col pl-6 pr-2 border-r border-[#ebebeb]">
              <h3 className="text-[14px] font-medium text-[#222222]">
                Communication
              </h3>
              <b className="mt-2 text-[18px] font-semibold text-[#222222]">
                5.0
              </b>
              <Icon size={32} className="mt-4 stroke-[1.5] text-[#222222]">
                <path
                  d="M20 4H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Icon>
            </div>

            {/* Location */}
            <div className="flex flex-1 flex-col pl-6 pr-2 border-r border-[#ebebeb]">
              <h3 className="text-[14px] font-medium text-[#222222]">
                Location
              </h3>
              <b className="mt-2 text-[18px] font-semibold text-[#222222]">
                4.8
              </b>
              <Icon size={32} className="mt-4 stroke-[1.5] text-[#222222]">
                <path
                  d="M9 4L3 7v13l6-3M9 4l6 3m-6-3v13m6-10l6-3v13l-6 3m0-13v13"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Icon>
            </div>

            {/* Value */}
            <div className="flex flex-1 flex-col pl-6 pr-2">
              <h3 className="text-[14px] font-medium text-[#222222]">Value</h3>
              <b className="mt-2 text-[18px] font-semibold text-[#222222]">
                4.8
              </b>
              <Icon size={32} className="mt-4 stroke-[1.5] text-[#222222]">
                <path
                  d="M20 12V4h-8L3 13l9 9 8-10z"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx="16"
                  cy="8"
                  r="1.5"
                  fill="none"
                  stroke="currentColor"
                />
              </Icon>
            </div>
          </div>
        </div>

        {/* 3. Review Tags */}
        <div className="mt-2 flex w-full overflow-x-auto gap-3 pb-2 scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none]">
          {reviewTags.map((tag) => (
            <button
              key={tag.label}
              type="button"
              className="flex shrink-0 items-center gap-2.5 rounded-[15px] border border-gray-300 bg-white px-3 py-[12px] text-[14px] font-medium text-[#222222] shadow-xs transition-colors hover:cursor-pointer"
            >
              {/* Icon Container */}
              <span className="flex h-5 w-5 shrink-0 items-center justify-center">
                <img
                  src={tag.img}
                  alt={tag.label}
                  className="h-full w-full object-contain"
                />
              </span>

              {/* Label */}
              <div className="font-semibold">{tag.label}</div>

              {/* Count */}
              <span className="text-[#717171]">{tag.count}</span>
            </button>
          ))}
        </div>

        {/* 4. Review Grid */}
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-x-[80px] gap-y-[44px]">
          {reviews.map((review, i) => (
            <article className="flex flex-col" key={review.name}>
              {/* Author Header */}
              <div className="flex items-center gap-3 mb-1">
                {/* Avatar */}
                <div
                  className="flex h-[43px] w-[43px] shrink-0 items-center justify-center rounded-full text-[16px] font-semibold overflow-hidden"
                  style={{
                    backgroundColor: i % 2 === 0 ? "#F7EDE2" : "#EFEAF7",
                    color: i % 2 === 0 ? "#CE9947" : "#5d3587",
                  }}
                >
                  {review.avatar ? (
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span>
                      {review.name ? review.name.charAt(0).toUpperCase() : ""}
                    </span>
                  )}
                </div>
                <div>
                  <h3
                    className="text-[15px] font-semibold
                   text-[#222222] leading-tight"
                  >
                    {review.name}
                  </h3>
                  <p className="text-[13px] text-[#717171]">{review.tenure}</p>
                </div>
              </div>

              {/* Rating & Date */}
              <div className="flex items-center gap-1.5 text-[13px] text-[#222222] mb-1">
                <div className="flex gap-[1px] text-[10px]">
                  {"★★★★★".split("").map((star, idx) => (
                    <div key={idx} className="text-[12px]">
                      {star}
                    </div>
                  ))}
                </div>
                <span className="text-[18px] leading-none mb-1">·</span>
                <span>{review.date}</span>
              </div>

              {/* Review Text */}
              <p className="pr-4 text-[14px] text-[#222222]">
                {expandedReviews[review.id]
                  ? review.text
                  : `${review.text.slice(0, 160)}${review.text.length > 160 ? "..." : ""}`}
              </p>

              {/* Show more button */}
              {(i === 1 || i === 3) && (
                <button
                  type="button"
                  className="mt-2 self-start text-[16px] font-semibold text-[#222222] underline underline-offset-2 transition hover:text-black"
                  onClick={() =>
                    setExpandedReviews((current) => ({
                      ...current,
                      [review.id]: !current[review.id],
                    }))
                  }
                >
                  {expandedReviews[review.id] ? "Show less" : "Show more"}
                </button>
              )}
            </article>
          ))}
        </div>

        {/* View All Button */}
        <button
          className="mt-14 mx-8 rounded-[12px] border border-black bg-white px-[20px] py-[12px] text-[16px] font-semibold text-[#222222] transition-colors hover:bg-gray-100"
          type="button"
        >
          Show all 19 reviews
        </button>
      </section>

      {/* --- Location Section --- */}
      <section className="pt-12 border-t border-[#ebebeb]" id="location">
        <h2 className="text-[22px] font-semibold text-[#222222]">
          Where you’ll be
        </h2>

        <p className="pt-4 text-base font-normal text-gray-800 sm:text-lg">
          Candolim, Goa, India
        </p>

        {/* CSS-only map scene keeps the location visual usable without a remote map tile. */}
        <div
          className="map-scene mt-4 mb-4 h-[480px] w-full rounded-2xl"
          aria-label={`Map showing ${location}`}
          style={{ "--map-scale": [1, 1.18, 1.4][mapZoom] }}
        >
          <div className="map-scene__surface" aria-hidden="true">
            <div className="map-scene__water" />
            <div className="map-scene__shore" />
            <div className="map-scene__grid" />
            <div className="map-scene__halos" />
          </div>
          <button
            type="button"
            className="map-scene__search"
            aria-label="Search this area"
          >
            <Icon size={16}>
              <circle cx="11" cy="11" r="6" />
              <path d="m16 16 4 4" strokeLinecap="round" />
            </Icon>
          </button>
          <div className="map-scene__marker" aria-hidden="true">
            <Icon size={24} className="fill-current stroke-none">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" />
            </Icon>
          </div>
          <span className="map-scene__label">Candolim</span>
          <div className="map-scene__zoom" aria-label="Map zoom controls">
            <button
              type="button"
              aria-label="Zoom in"
              onClick={() => setMapZoom((zoom) => Math.min(2, zoom + 1))}
              disabled={mapZoom === 2}
            >
              +
            </button>
            <button
              type="button"
              aria-label="Zoom out"
              onClick={() => setMapZoom((zoom) => Math.max(0, zoom - 1))}
              disabled={mapZoom === 0}
            >
              −
            </button>
          </div>
        </div>

        <p className="text-[16px] font-normal leading-relaxed text-[#222222]">
          Exact location will be provided after booking.
        </p>

        <div className="mt-8">
          <h3 className="pb-2 font-semibold sm:text-lg">
            Neighbourhood highlights
          </h3>

          {/* Description */}
          <p className="pb-2 text-sm font-normal leading-relaxed text-[#222222] sm:text-base">
            Located in the heart of Candolim, Amor de Goa offers a peaceful stay
            with easy access to beaches, cafés, and popular attractions.
            {neighbourhoodOpen &&
              " Spend the day at Candolim Beach, browse local markets, or enjoy the restaurants and nightlife along the coast before returning to a quieter residential setting."}
          </p>

          {/* Show More Link with Chevron */}
          <button
            type="button"
            className="flex w-fit cursor-pointer items-center gap-1 pt-1 text-lg font-semibold hover:opacity-80 sm:text-base"
            onClick={() => setNeighbourhoodOpen((open) => !open)}
          >
            <span className="underline underline-offset-4 decoration-1">
              {neighbourhoodOpen ? "Show less" : "Show more"}
            </span>
            <svg
              className="w-4 h-4 translate-y-[0.5px]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      </section>
    </div>
  );
}
