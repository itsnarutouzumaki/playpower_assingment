import mockListing from "../data/mockListing";
import AirbnbMark from "./AirbnbMark";
import Icon from "./Icon";

/**
 * ListingHeader
 *
 * Renders the top-of-page global header (logo, search pill, account nav)
 * plus the listing title row (title, Share/Save actions) immediately below
 * it. These two bands are combined in one component because in the
 * reference layout they scroll away together as a single unit before
 * `ListingNav` (the secondary, sticky nav) takes over — see `App.jsx` for
 * how the two are sequenced.
 *
 * @author @itsnarutouzumaki
 */
export default function ListingHeader() {
  
  return (
    <>
      {/* Top Navigation Bar */}
      <header className="flex h-[89px] w-100vw items-center justify-between border-b border-gray-200 bg-white px-18  font-sans">
        
        {/* Left: Logo */}
        <div className="flex  items-center justify-start text-[#ff385c]">
          <AirbnbMark />
        </div>

        {/* Center: Search Pill */}
        <button
          className="hidden md:flex ml-32 h-[48px] pr-2 items-center rounded-full border border-gray-200 bg-white px-4 pr-0 shadow-[0_1px_2px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.01)] transition-shadow hover:shadow-md"
          type="button"
          aria-label="Search stays"
        >
          {/* Custom House Graphic Placeholder */}
          <img src={mockListing.searchHouse} alt="Search house" className="h-12 w-12" />
          
          <span className="px-2 text-sm font-semibold text-gray-900">Anywhere</span>
          <span className="h-6 w-[1px] mx-2 bg-gray-300"></span>
          
          <span className="px-2 text-sm font-semibold text-gray-900">Anytime</span>
          <span className="h-6 w-[1px] mx-2 bg-gray-300"></span>
          
          <span className="px-2 text-sm font-normal text-gray-500">Add guests</span>
          
          {/* Search Icon Button */}
          <span className="flex ml-4 h-8 w-8 items-center justify-center rounded-full bg-[#ff385c] text-white">
            <Icon size={14} className="stroke-[3px]">
              <circle cx="11" cy="11" r="6" />
              <path d="m16 16 4 4" strokeLinecap="round" strokeLinejoin="round" />
            </Icon>
          </span>
        </button>

        {/* Right: Account Navigation */}
        <nav className="flex items-center justify-end gap-2" aria-label="Account navigation">
          <button 
            type="button" 
            className="hidden rounded-full px-4 py-2 text-sm font-semibold text-gray-900 transition hover:bg-gray-100 lg:block"
          >
            Become a host
          </button>
          
          {/* Globe Icon */}
          <button
            className="flex  h-10 w-10 items-center justify-center rounded-full bg-[#f2f2f2] text-gray-900 transition hover:bg-gray-200"
            type="button"
            aria-label="Choose language"
          >
            <Icon size={16} className="stroke-2">
              <circle cx="12" cy="12" r="9" />
              <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
            </Icon>
          </button>
          
          {/* Menu Icon */}
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f2f2f2] text-gray-900 transition hover:bg-gray-200"
            type="button"
            aria-label="Open menu"
          >
            <Icon size={18} className="stroke-[2.5]">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </Icon>
          </button>
        </nav>
      </header>

      {/* Listing Heading (Retained and styled from your original code) */}
      <div className="ml-40 mb-5 flex max-w-[1200px] items-center justify-between pt-6 md:px-10 md:pr-12 font-sans">
        <h1 className="text-[26px] pt-2 font-semibold text-gray-900 tracking-tight">
          {mockListing.title}
        </h1>

        <div className="flex items-center gap-4 text-[14px]  font-semibold text-gray-900">
          <button type="button" className="flex items-center gap-2 rounded-lg pt-3 transition hover:bg-gray-100">
            <Icon size={18} className="stroke-[10px]">
              <path d="M12 16V3m0 0L7 8m5-5 5 5M5 13v7h14v-7" strokeLinecap="round" strokeLinejoin="round" />
            </Icon>
            <span className="underline underline-offset-2">Share</span>
          </button>
          
          <button className="flex items-center gap-2 pt-3 rounded-lg transition hover:bg-gray-100">
            <Icon size={16} className="stroke-2">
              <path d="M20.8 4.7c-2-2-5.2-1.9-7.1.1L12 6.5l-1.7-1.7c-2-2-5.2-2.1-7.1-.1-2.1 2.2-1.9 5.7.2 7.8L12 21l8.6-8.5c2.1-2.1 2.3-5.6.2-7.8Z" strokeLinecap="round" strokeLinejoin="round" />
            </Icon>
            <span className="underline underline-offset-2">Save</span>
          </button>
        </div>
      </div>
    </>
  );
}