import mockListing from "../data/mockListing";
import Icon from "./Icon";

/**
 * BookingCard
 *
 * Sticky reservation widget shown alongside `ListingDetails` (promo banner,
 * price/date/guest summary, and Reserve action). Positioned with
 * `sticky top-24` so it stays in view while the visitor scrolls through the
 * listing description, matching the reference layout.
 *
 * Data flow:
 * All display values (`booking`, `discount`) are read directly from
 * `mockListing` — there is no local booking state. Check-in/check-out/guest
 * "buttons" and the discount "Claim"/"Terms apply" controls render as real
 * interactive elements (for correct semantics and focus behavior) but do not
 * open pickers or mutate state, since date/guest selection is out of scope
 * for this static listing-page clone.
 *
 * @author @itsnarutouzumaki
 */
export default function BookingCard() {
  const { booking, discount } = mockListing;

  return (
    <aside
      className="sticky top-24 flex h-fit w-[380px] flex-col gap-6 font-sans text-[#222222]"
      aria-label="Booking details"
    >
      {/* 1. Promo Banner Box */}
      <div className="flex items-center justify-between rounded-2xl border border-[#ebebeb] bg-white p-4 shadow-sm">
        <div className="flex items-center gap-4">
          {/* Green Tag Icon */}
          <div className="flex h-8 w-8 items-center justify-center">
            {discount ? (
              <img src={discount} alt="Discount tag" className="h-full w-full object-contain" />
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#3b8754]">
                <path d="M11.25 2.25L2.25 11.25C1.83579 11.6642 1.83579 12.3358 2.25 12.75L11.25 21.75C11.6642 22.1642 12.3358 22.1642 12.75 21.75L21.75 12.75C22.1642 12.3358 22.1642 11.6642 21.75 11.25L12.75 2.25C12.3358 1.83579 11.6642 1.83579 11.25 2.25Z" fill="currentColor" />
                <circle cx="16.5" cy="7.5" r="1.5" fill="white" />
                <path d="M4 14L1 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
          </div>

          <p className="text-[15px] font-normal leading-[1.2] text-[#222222]">
            Get 10% off your next stay.
            <br />
            <button
              type="button"
              className="font-semibold text-[#222222] underline underline-offset-2 hover:text-black"
            >
              Terms apply
            </button>
          </p>
        </div>

        <button
          type="button"
          className="rounded-lg bg-[#f2f2f2] px-4 py-2.5 text-[14px] font-semibold text-[#222222] transition-colors hover:bg-[#e5e5e5]"
        >
          Claim
        </button>
      </div>

      {/* 2. Main Booking Card Box */}
      <div className="flex flex-col gap-4 rounded-2xl border border-[#ebebeb] bg-white p-6 shadow-[0_6px_16px_rgba(0,0,0,0.12)]">
        {/* Price Header */}
        <div className="flex items-baseline gap-1.5 pb-1">
          <strong className="text-[22px] font-semibold text-[#222222] underline decoration-[#222222] decoration-2 underline-offset-4">
            {booking.total}
          </strong>
          <span className="text-[15px] font-normal text-[#222222]">
            for {booking.nights} nights
          </span>
        </div>

        {/* Check-In, Checkout & Guests Input Grid */}
        <div className="grid grid-cols-2 overflow-hidden rounded-xs border border-[#b0b0b0]">
          {/* Check-In */}
          <button
            type="button"
            className="flex flex-col items-start border-b border-r border-[#b0b0b0] bg-white px-3 py-2.5 text-left transition hover:bg-gray-50"
          >
            <small className="text-[10px] font-bold uppercase tracking-wide text-[#222222]">
              Check-In
            </small>
            <span className="mt-0.5 text-[14px] font-normal text-[#222222]">
              {booking.checkIn}
            </span>
          </button>

          {/* Checkout */}
          <button
            type="button"
            className="flex flex-col items-start border-b border-[#b0b0b0] bg-white px-3 py-2.5 text-left transition hover:bg-gray-50"
          >
            <small className="text-[10px] font-bold uppercase tracking-wide text-[#222222]">
              Checkout
            </small>
            <span className="mt-0.5 text-[14px] font-normal text-[#222222]">
              {booking.checkOut}
            </span>
          </button>

          {/* Guests Input */}
          <button
            type="button"
            className="relative col-span-2 flex w-full flex-col items-start bg-white px-3 py-2.5 text-left transition hover:bg-gray-50"
          >
            <small className="text-[10px] font-bold uppercase tracking-wide text-[#222222]">
              Guests
            </small>
            <span className="mt-0.5 text-[14px] font-normal text-[#222222]">
              {booking.guests}
            </span>
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#222222]">
              <Icon size={18} className="stroke-2">
                <path
                  d="m7 10 5 5 5-5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Icon>
            </div>
          </button>
        </div>

        {/* Cancellation Note Banner */}
        <div className="rounded-lg bg-[#f7f7f7] py-3 text-center text-[14px] font-normal text-[#717171]">
          Free cancellation before{" "}
          <strong className="font-semibold text-[#222222]">17 October</strong>
        </div>

        {/* Reserve Button (Rounded Rectangle, not pill) */}
        <button
          type="button"
          className="w-full rounded-xl bg-[#de1262] py-3.5 text-center text-[16px] font-semibold text-white transition-colors hover:bg-[#c00f53] active:scale-[0.98]"
        >
          Reserve
        </button>

        {/* Charge Notice */}
        <p className="text-center text-[14px] font-normal text-[#717171]">
          You won&apos;t be charged yet
        </p>
      </div>

      {/* 3. Report Listing Action */}
      <button
        type="button"
        className="flex items-center justify-center gap-2 text-[14px] font-medium text-[#717171] transition-colors hover:text-[#222222]"
      >
        <svg
          className="h-4 w-4 fill-current text-[#717171]"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6h-5.6z" />
        </svg>
        <span className="underline underline-offset-2">Report this listing</span>
      </button>
    </aside>
  );
}