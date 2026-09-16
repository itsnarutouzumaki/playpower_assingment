import { X } from "lucide-react";
import mockListing from "../data/mockListing";
import Icon from "./Icon";
import { useEffect, useState } from "react";

/**
 * ListingDetails
 *
 * Renders the main body of the listing page below the hero grid: host
 * summary, highlights, description, amenities, the availability calendar,
 * and the "show all amenities" modal — everything to the left of the sticky
 * `BookingCard`. This is the largest component in the app because it groups
 * several visually related sections that all read from the same
 * `mockListing` object and appear in a single scrolling column in the
 * reference layout; splitting it further would mean threading the same data
 * and section-anchors through additional prop boundaries for little benefit.
 *
 * Local helpers defined in this file:
 * - `AmenityIcon` — picks one of a small set of hand-drawn line icons for
 *   the "highlights" row by index, since these highlights use bespoke
 *   icon art rather than a Lucide icon per highlight.
 * - `CalendarMonth` — renders one month grid for the availability calendar,
 *   including the demo-only hardcoded selected/unavailable date logic (see
 *   inline comments in that function) used to visually match the reference
 *   screenshot's selected date range.
 *
 * State:
 * Local `useState`/`useEffect` usage in this file backs UI-only concerns
 * (e.g. toggling the "show all amenities" overlay), not booking data —
 * booking data itself lives in `mockListing` and is read, not written, here.
 *
 * @author @itsnarutouzumaki
 */
function AmenityIcon({ index }) {
  const icons = [
    // 1. Outdoor entertainment (Firepit)
    <g key="0">
      <path d="M5 13h14l-2 4H7Z" />
      <path d="M8 17v4M16 17v4M4 21h16" />
      <path d="M12 13c0-3.5-3-4-3-6 2 1.5 3 4 3 4s1-2.5 3-4c0 2-3 2.5-3 6" />
    </g>,

    // 2. Designed for staying cool (Fan)
    <g key="1">
      <circle cx="12" cy="12" r="2" />
      <path d="M12 10c-1.5 0-3-3-3-5a3 3 0 0 1 6 0c0 2-1.5 5-3 5Z" />
      <path d="M12 14c1.5 0 3 3 3 5a3 3 0 0 1-6 0c0-2 1.5-5 3-5Z" />
      <path d="M14 12c0 1.5 3 3 5 3a3 3 0 0 0 0-6c-2 0-5 1.5-5 3Z" />
      <path d="M10 12c0-1.5-3-3-5-3a3 3 0 0 0 0 6c2 0 5-1.5 5-3Z" />
    </g>,

    // 3. Self check-in (Ajar Door)
    <g key="2">
      <path d="M6 22V4h12v18" />
      <path d="M6 4l7 2.5v11.5l-7 2.5" />
      <path d="M11 13v-2" />
    </g>,

    // // 8. (Original Icon 8)
    <g key="4">
      <rect height="10" rx="1" width="13" x="4" y="7" />
      <path d="m17 10 3-2v8l-3-2M8 11h3M8 14h2" />
    </g>,
  ];

  return <Icon>{icons[index % icons.length]}</Icon>;
}

export function CalendarMonth({ title, startDay, days }) {
  return (
    <div className="flex w-full flex-col font-sans">
      {/* Month Title */}
      <h3 className="mb-4 text-center text-[15px] font-semibold text-[#222222]">
        {title}
      </h3>

      {/* Weekdays Header */}
      <div className="mb-1 grid grid-cols-7">
        {"SMTWTFS".split("").map((day, index) => (
          <span
            key={`${day}-${index}`}
            className="flex h-8 w-11 items-center justify-center text-[12px] font-semibold text-[#717171]"
          >
            {day}
          </span>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-y-0.5">
        {/* Blank days for month offset */}
        {Array.from({ length: startDay }, (_, i) => (
          <div key={`blank-${i}`} className="h-11 w-11" />
        ))}

        {/* Actual days */}
        {Array.from({ length: days }, (_, i) => {
          const day = i + 1;

          // Enhanced logic to detect start vs end dates for the background pill effect
          const isStart = title === "October 2026" && day === 18;
          const isEnd = title === "October 2026" && day === 23;
          const selected = isStart || isEnd;
          const inRange = title === "October 2026" && day > 18 && day < 23;
          const unavailable = title === "November 2026" && day < 25;

          // Outer container manages the continuous gray background bar
          let containerClass =
            "relative flex h-11 w-11 items-center justify-center";
          if (inRange) {
            containerClass += " bg-[#f2f2f2]";
          } else if (isStart) {
            containerClass += " rounded-l-full bg-[#f2f2f2]";
          } else if (isEnd) {
            containerClass += " rounded-r-full bg-[#f2f2f2]";
          }

          // Inner span manages the text, black circles, and strike-throughs
          let numberClass =
            "flex h-11 w-11 items-center justify-center rounded-full text-[14px] transition-colors";
          if (selected) {
            numberClass += " bg-[#222222] font-semibold text-white";
          } else if (unavailable) {
            numberClass +=
              " font-normal text-[#d3d3d3] line-through decoration-[#d3d3d3]";
          } else {
            numberClass +=
              " font-medium text-[#222222] hover:border hover:border-black";
          }

          return (
            <div key={day} className={containerClass}>
              <span className={numberClass}>{day}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function ListingDetails() {
  const { summary, host, booking, ratingImage, amenitiesCategories } =
    mockListing;

  const [isOpen, setIsOpen] = useState(false);

  // Close modal when pressing ESC key & prevent background scrolling
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);
  return (
    <article className="listing-details">
      <section className="host-summary title-summary">
        <div>
          <h2>
            {mockListing.propertyType} in {mockListing.location}
          </h2>
          <p>
            {summary.guests} guests · {summary.bedrooms} bedroom ·{" "}
            {summary.beds} bed · {summary.bathrooms} bathroom
          </p>
        </div>
      </section>
      <section className="flex max-w-[680px] items-center justify-between rounded-2xl border border-[#dddddd] bg-white px-8 py-5">
        {/* Left Brand Title */}
        <div className="flex items-center gap-2">
          {/* <span className="text-xl">🌿</span> */}
          <img src={ratingImage[0]} alt="left wing" className="h-6 " />
          <strong className="text-center text-base font-semibold leading-tight text-[#222222]">
            Guest
            <br />
            favourite
          </strong>
          {/* <span className="scale-x-[-1] text-xl">🌿</span> */}
          <img src={ratingImage[1]} alt="right wing" className="h-6" />
        </div>

        {/* Description */}
        <p className="mx-6 flex-1 text-sm font-normal leading-tight text-[#222222]">
          One of the most loved homes on Airbnb,
          <br />
          according to guests
        </p>

        {/* Stats */}
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-center">
            <b className="text-xl font-bold text-[#222222]">{summary.rating}</b>
            <span className=" text-[#222222] ">★★★★★</span>
          </div>

          {/* Vertical Line */}
          <div className="h-10 w-[1px] bg-[#dddddd]" />

          <div className="flex flex-col items-center">
            <b className="text-xl font-bold text-[#222222]">
              {summary.reviewCount}
            </b>
            <span className="text-xs font-medium text-[#222222] underline">
              Reviews
            </span>
          </div>
        </div>
      </section>
      <>
        {/* Host Summary Section */}
        <section className="flex items-center gap-4 mt-5 pb-6 border-b border-[#ebebeb] font-sans">
          <img
            src={host.avatar}
            alt={`${host.name} host profile`}
            className="h-[40px] w-[40px] rounded-full object-cover"
          />
          <div className="flex flex-col">
            <h2 className="text-[16px] font-semibold text-[#222222]">
              Hosted by {host.name}
            </h2>
            <p className="text-[14px] font-normal text-[#717171]">
              {host.yearsHosting} years hosting
            </p>
          </div>
        </section>

        {/* Highlights Section */}
        <section className="flex flex-col gap-6 py-8 border-b border-[#ebebeb] font-sans">
          {mockListing.highlights.map(([title, body], index) => (
            <div className="flex gap-4" key={title}>
              <span className="flex-shrink-0 text-[#222222]">
                {/* Constraining the icon wrapper to ensure perfect alignment with the 16px text */}
                <div className="flex h-6 w-6 items-center justify-center">
                  <AmenityIcon index={index + 4} />
                </div>
              </span>
              <div className="flex flex-col">
                <h3 className="text-[16px] font-semibold text-[#222222]">
                  {title}
                </h3>
                <p className="text-[14px] font-normal text-[#717171]">{body}</p>
              </div>
            </div>
          ))}
        </section>
      </>
      <section className="flex flex-col items-start gap-4 border-b border-[#ebedef] py-8">
        {/* Banner */}
        <div className="inline-flex items-center gap-1 rounded-xl bg-[#f7f7f7] px-4 py-3 text-sm font-normal text-[#222222]">
          Some info has been automatically translated.
          <button className="font-semibold underline hover:text-black">
            Show original
          </button>
        </div>

        {/* Description with 3-line clamp and fade out mask */}
        <p className="line-clamp-3 text-base leading-6 text-[#222222] [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)]">
          {mockListing.description}
        </p>

        {/* Show More Button */}
        <button
          type="button"
          className="inline-flex items-center gap-1.5 font-semibold text-[17px] text-[#222222] underline underline-offset-4 hover:text-black"
        >
          Show more{" "}
          <Icon size={17} className="stroke-[2.5]">
            <path d="m9 18 6-6-6-6" />
          </Icon>
        </button>
      </section>
      <section className="py-5 border-b border-[#ebebeb] font-sans">
        <h2 className=" text-[22px] font-semibold text-[#222222]">
          Where you&apos;ll sleep
        </h2>

        <div className="grid grid-cols-2 gap-4">
          {mockListing.sleepingArrangements.map((room) => (
            <article key={room.title} className="flex flex-col mt-6">
              <img
                src={room.image}
                alt={room.title}
                className="mb-4 h-50 w-full rounded-xs object-cover"
              />
              <h3 className="text-base font-semibold text-[#222222]">
                {room.title}
              </h3>
              <p className="mt-0.5 text-sm font-normal text-[#717171]">
                {room.detail}
              </p>
            </article>
          ))}
        </div>
      </section>
      <section
        className="py-10 border-b border-[#ebebeb] font-sans"
        id="amenities"
      >
        <h2 className="pb-6 text-[22px] font-semibold text-[#222222]">
          What this place offers
        </h2>

        <div className="grid grid-cols-2 gap-x-4 gap-y-6">
          {mockListing.amenities.map((amenity) => {
            const isUnavailable =
              mockListing.unavailableAmenities?.includes(amenity.name);

            const IconComponent = amenity.icon;

            return (
              <div
                key={amenity.name}
                className={`flex items-center gap-4 ${
                  isUnavailable ? "text-[#717171]" : "text-[#222222]"
                }`}
              >
                <span className="flex items-center justify-center w-6 h-6 shrink-0">
                  <IconComponent className="w-6 h-6 stroke-[1.5]" />
                </span>
                <span
                  className={`text-[15px] font-normal ${
                    isUnavailable ? "line-through decoration-[#717171]" : ""
                  }`}
                >
                  {amenity.name}
                </span>
              </div>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="mt-8 rounded-lg border border-black bg-white px-6 py-3 text-base font-semibold text-[#222222] transition-colors hover:bg-gray-100 cursor-pointer"
        >
          Show all 50 amenities
        </button>
      </section>

      <section className="py-6 border-b border-[#ebebeb] font-sans">
        {/* Header Section */}
        <h2 className="text-[22px] font-semibold text-[#222222]">
          {booking.nights} nights in Candolim
        </h2>
        <p className="mt-1 text-[14px] font-normal text-[#717171]">
          {booking.dateRange}
        </p>

        {/* Calendar Controls & Grid Container */}
        {/* Added text-sm here so the internal CalendarMonth components scale down properly */}
        <div className="relative mt-6 grid grid-cols-2 gap-x-8 text-sm">
          {/* Absolute Left Arrow */}
          <button
            type="button"
            aria-label="Previous month"
            className="absolute -left-3 -top-1 z-10 flex h-8 w-8 items-center justify-center rounded-full text-[#222222] transition-colors hover:bg-gray-100"
          >
            <svg
              viewBox="0 0 32 32"
              width="12"
              height="12"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 28L8.7 16.7c-.4-.4-.4-1 0-1.4L20 4" />
            </svg>
          </button>

          {/* The internal Calendar components */}
          <CalendarMonth title="October 2026" startDay={4} days={31} />
          <CalendarMonth title="November 2026" startDay={0} days={30} />

          {/* Absolute Right Arrow */}
          <button
            type="button"
            aria-label="Next month"
            className="absolute -right-3 -top-1 z-10 flex h-8 w-8 items-center justify-center rounded-full text-[#222222] transition-colors hover:bg-gray-100"
          >
            <svg
              viewBox="0 0 32 32"
              width="12"
              height="12"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 4l11.3 11.3c.4.4.4 1 0 1.4L12 28" />
            </svg>
          </button>
        </div>

        {/* Bottom Action Section */}
        <div className="mt-3 flex items-center justify-between">
          {/* Keyboard Icon */}
          <button
            type="button"
            aria-label="Keyboard shortcuts"
            className="-ml-2 flex items-center justify-center rounded-md p-2 text-[#222222] transition-colors hover:bg-gray-100"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="4" y="6" width="16" height="12" rx="2" />
              <line x1="10" y1="14" x2="14" y2="14" />
            </svg>
          </button>

          {/* Clear Dates Button */}
          <button
            className="rounded-md px-2 py-1.5 text-[14px] font-semibold text-[#222222] underline underline-offset-2 transition-colors hover:bg-gray-100"
            type="button"
          >
            Clear dates
          </button>
        </div>
      </section>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 sm:p-6 animate-in fade-in duration-200">
          {/* Backdrop Click to Close */}
          <div className="absolute inset-0" onClick={() => setIsOpen(false)} />

          {/* Modal Container */}
          <div className="relative z-10 flex flex-col w-full max-w-[780px] max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden font-sans">
            {/* Header (Sticky Close Button) */}
            <div className="sticky top-0 z-10 flex items-center bg-white px-6 pt-6 pb-4">
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 text-black" />
              </button>
            </div>

            {/* Modal Body (Scrollable) */}
            <div className="flex-1 overflow-y-auto px-14 pb-10 custom-scrollbar">
              <h2 className="text-[22px] font-semibold text-[#222222] pb-8">
                What this place offers
              </h2>

              <div className="space-y-10">
                {amenitiesCategories.map((group) => (
                  <div key={group.category}>
                    <h3 className="text-[18px] font-semibold text-[#222222] mb-4">
                      {group.category}
                    </h3>

                    <div className="divide-y divide-gray-200 max-w-170">
                      {group.items.map((item, idx) => {
                        const IconComponent = item.icon;
                        return (
                          <div
                            key={idx}
                            className="flex items-center gap-4 py-4 text-[#222222]"
                          >
                            <span className="flex items-center justify-center w-6 h-6 shrink-0">
                              <IconComponent className="w-6 h-6 stroke-[1.5] text-gray-800" />
                            </span>
                            <span className="text-[16px] font-normal">
                              {item.name}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
