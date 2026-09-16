import mockListing from "../data/mockListing";

/**
 * ListingNav
 *
 * Secondary, section-jump navigation bar (Photos / Amenities / Reviews /
 * Location) plus a condensed price + Reserve summary. `App.jsx` renders this
 * inside an always-mounted wrapper whose visibility/position is toggled with
 * Tailwind classes (`translate-y`, `opacity`) based on `isNavSticky`, rather
 * than conditionally mounting/unmounting the component — this lets the
 * `transition-all duration-300` classes animate the bar in and out smoothly
 * instead of having it appear abruptly.
 *
 * @author @itsnarutouzumaki
 */
export default function ListingNav() {
  return (
    <nav
      className="w-100vw border-b border-[#ebebeb] bg-white font-sans text-[#222222]"
      aria-label="Listing sections"
    >
      <div className="mx-auto flex h-16  max-w-[1100px] items-center justify-between pb-2 ">
        
        {/* Navigation Links */}
        <div className="flex h-full items-center gap-8 text-sm font-semibold">
          <a
            href="#photos"
            className="flex h-full items-center text-[#222222] transition-colors hover:text-black"
          >
            Photos
          </a>
          
          {/* Active Tab */}
          <a
            href="#amenities"
            className="relative flex h-full items-center text-[#222222] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-[#222222]"
          >
            Amenities
          </a>
          
          <a
            href="#reviews"
            className="flex h-full items-center text-[#222222] transition-colors hover:text-black"
          >
            Reviews
          </a>
          
          <a
            href="#location"
            className="flex h-full items-center text-[#222222] transition-colors hover:text-black"
          >
            Location
          </a>
        </div>

        {/* Right Section: Price Info + Reserve Pill */}
        <div className="flex items-center gap-6">
          <div className="text-right">
            <div className="text-sm text-[#222222]">
              <strong className="text-base font-bold">
                {mockListing.booking.total}
              </strong>{" "}
              for {mockListing.booking.nights} nights
            </div>
            <div className="mt-0.5 text-xs font-semibold text-[#222222]">
              ★ {mockListing.summary.rating} · {mockListing.summary.reviewCount} reviews
            </div>
          </div>

          {/* Reserve Pill Button */}
          <button
            type="button"
            className="rounded-full bg-[#e31c5f] px-5 py-2 text-[15px] font-semibold text-white transition-colors hover:bg-[#d70466] active:scale-[0.98]"
          >
            Reserve
          </button>
        </div>
      </div>
    </nav>
  );
}