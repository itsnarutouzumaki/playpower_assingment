import { useRef, useState } from "react";
import {
  KeyRound,
  ShieldAlert,
  ChevronLeft,
  ChevronRight,
  Star,
  CalendarX,
} from "lucide-react";
import mockListing from "../data/mockListing"; // Assuming mockListing is saved in mockListing.js

// Mock data for "More stays nearby" section
const nearbyStays = [
  {
    id: 1,
    title: "Beautiful Studio with a view to die for",
    price: "₹23,600",
    rating: "4.91",
    image:
      "/nearby/s1.jpeg",
  },
  {
    id: 2,
    title: "NAQAB - 1bhk with private pool",
    price: "₹12,218",
    rating: "4.95",
    image:
      "/nearby/s2.jpeg",
  },
  {
    id: 3,
    title: "Greentique Luxury Flat with plunge pool, Calangute",
    price: "₹44,506",
    rating: "4.94",
    image:
      "/nearby/s3.jpeg",
  },
  {
    id: 4,
    title: "The Tropical Studio | 5 mins to Beach",
    price: "₹22,824",
    rating: "4.96",
    image:
      "/nearby/s4.jpeg",
  },
  {
    id: 5,
    title: "Luxury Casa Bella 1BHK with plunge pool, Calangute",
    price: "₹39,942",
    rating: "4.95",
    image:
      "/nearby/s5.jpeg",
  },
  {
    id: 6,
    title: "Kanso by Earthen Window | Jacuzzi | Terrace | Pool",
    price: "₹45,648",
    rating: "5.0",
    image:
      "/nearby/s6.jpeg",
  },
  {
    id: 7,
    title: "Luxury Apt | Private Pool | 6 Mins from Beach",
    price: "₹48,786",
    rating: "4.93",
    image:
      "/nearby/s2.jpeg",
  },
  {
    id: 7,
    title: "Serendipity Cottage - Calm Stay in Calangute-Baga.",
    price: "22,824",
    rating: "4.92",
    image:
      "/nearby/s4.jpeg",
  },
];



export default function ListingFooterDetails() {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      // Scrolls by the visible width of the container
      const scrollAmount = scrollContainerRef.current.clientWidth;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="max-w-7xl mx-40 px-10 py-8 text-[#222222] font-sans">
      {/* SECTION 1: Things to know */}
      <section className="border-y border-gray-200 py-12 mt-4">
        <h2 className="text-xl text-[22px] font-semibold pb-5">
          Things to know
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-9">
          {/* Column 1: Cancellation policy */}
          <div className="flex flex-col items-start gap-3">
            <CalendarX className="w-6.5 h-6.5 mb-1 stroke-[1.4]" />
            <h3 className="font-semibold text-base mb-2">
              Cancellation policy
            </h3>
            <div className="flex flex-col items-start gap-2">
              <p className="text-sm text-gray-800">
                {mockListing.booking.cancellation}. Cancel before check-in on 18
                October for a partial refund.
              </p>
              <p className="text-sm text-gray-700 mt-2 leading-relaxed">
                Review this host's full policy for details.
              </p>
              <button className="text-sm font-semibold underline block hover:text-black">
                Learn more
              </button>
            </div>
          </div>

          {/* Column 2: House rules */}
          <div className="flex flex-col items-start gap-3">
            <KeyRound className="w-6.5 h-6.5 mb-1 stroke-[1.5]" />
            <h3 className="font-medium text-base mb-2">House rules</h3>
            <div className="text-sm text-gray-700 space-y-1 flex flex-col items-start gap-2">
              {mockListing.houseRules.map((rule, idx) => (
                <p key={idx}>{rule}</p>
              ))}
            </div>
            <button className="text-sm font-semibold underline block hover:text-black">
              Learn more
            </button>
          </div>

          {/* Column 3: Safety & property */}
          <div className="flex flex-col items-start gap-3">
            <ShieldAlert className="w-6.5 h-6.5 mb-1 stroke-[1.5]" />
            <h3 className="font-medium text-base mb-2">Safety & property</h3>
            <div className="text-sm text-gray-700 space-y-1 flex flex-col items-start gap-2">
              {mockListing.safety.map((item, idx) => (
                <p key={idx}>
                  {mockListing.unavailableAmenities?.includes(item)
                    ? `${item} not reported`
                    : item}
                </p>
              ))}
              {mockListing.amenities.includes(
                "Exterior security cameras on property",
              ) && <p>Exterior security cameras on property</p>}
            </div>
            <button className="text-sm font-semibold underline  block hover:text-black">
              Learn more
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 2: More stays nearby */}
      <section className="pt-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">More stays nearby</h2>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => scroll("left")}
            className="p-2 rounded-full border border-gray-300 hover:border-black cursor-pointer transition"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-2 rounded-full border border-gray-300 hover:border-black cursor-pointer transition"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Scrollable Container showing 5 items at a time */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto gap-5 no-scrollbar scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {nearbyStays.map((stay) => (
          <div
            key={stay.id}
            className="group cursor-pointer shrink-0 w-[calc((100%-4*1.25rem)/5)]"
          >
            {/* Image Container */}
            <div className="h-52 overflow-hidden rounded-sm bg-gray-200 mb-3">
              <img
                src={stay.image}
                alt={stay.title}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Text Info */}
            <h4 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug">
              {stay.title}
            </h4>

            <div className="flex items-center text-xs mt-1 gap-2">
              <span className="font-normal text-gray-900">{stay.price}</span>
              <div className="flex items-center">
                <Star className="w-2.5 h-2.5 fill-black text-black inline mr-1" />
                <span className="text-xs text-gray-700">{stay.rating}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
    </div>
  );
}
