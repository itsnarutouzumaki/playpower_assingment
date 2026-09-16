import Icon from "./Icon";
import mockListing from "../data/mockListing";
import { useState } from "react";
// Simulated Co-Host Data matching the image
const coHosts = [
  { name: "Sharath", avatar: "/reviewer/co1.jpg" },
  { name: "Aman Dev Pahwa", avatar: "/reviewer/co2.jpg" },
  { name: "Maria Karen Priyanka", avatar: "/reviewer/co3.jpg" },
  { name: "Simran", avatar: "/reviewer/rev5.jpeg" },
  { name: "Pallavi", avatar: "/reviewer/rev1.jpeg" },
  { name: "Sanyukta", avatar: "/reviewer/rev2.jpeg" },
  { name: "Shruti", initial: "S", bg: "#fce9f0", text: "#d90b63" },
  { name: "Amisha", initial: "A", bg: "#e9efff", text: "#0b5cd9" },
];

export default function MeetYourHost() {
  const { host } = mockListing;
  const [imgErrors, setImgErrors] = useState({});

  const handleImgError = (id) => {
    setImgErrors((prev) => ({ ...prev, [id]: true }));
  };
  return (
    <section className="mx-40 max-w-7xl pt-12 font-sans md:px-10">
      <h2 className="pb-6 text-[22px] font-semibold text-[#222222]">
        Meet your host
      </h2>

      <div className="flex flex-col gap-y-12 gap-x-12 md:flex-row">
        {/* --- LEFT COLUMN: Host Card & Info --- */}
        <div className="flex flex-col ">
          {/* Main Host Card */}
          <div className="flex w-[340px] h-67 pl-12 rounded-[24px] border-2 border-[#f2f2f2] bg-white py-6 shadow-[0_6px_16px_rgba(0,0,0,0.1)]">
            {/* Card Left: Avatar & Name */}
            <div className="flex w-[55%] flex-col items-center justify-center pr-4 text-center">
              <div className="relative mb-3 flex items-center justify-center rounded-full">
                <img
                  src={host.avatar}
                  alt={host.name}
                  className="h-22 w-22 rounded-full object-cover"
                />

                {/* Pink Checkmark Badge */}
                <div className="absolute bottom-1 right-0 flex h-7 w-7 items-center justify-center rounded-full border-[3px] border-white bg-[#E31C5F] text-white">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              </div>

              <h3 className="text-[26px] font-semibold leading-[1.5] tracking-tight text-[#222222]">
                {host.name}
              </h3>
              <p className="mt-1 text-[14px] font-normal text-[#222222]">
                {host.title || "Host"}
              </p>
            </div>

            {/* Vertical Divider */}
            <div className="my-4 w-[1px] bg-[#ebebeb]"></div>

            {/* Card Right: Stats */}
            <div className="flex w-[45%] flex-col justify-center pl-6">
              <div className="border-b border-[#ebebeb] pb-3">
                <div className="text-[20px] font-semibold  tracking-tight text-[#222222]">
                  1,463
                </div>
                <div className="text-[12px] font-medium text-[#222222]">
                  Reviews
                </div>
              </div>

              <div className="border-b border-[#ebebeb] py-3">
                <div className="flex items-center text-[20px] font-semibold tracking-tight text-[#222222]">
                  4.68
                  <span className="ml-1 text-[16px]">★</span>
                </div>
                <div className="text-[12px] font-medium text-[#222222]">
                  Rating
                </div>
              </div>

              <div className="pt-3">
                <div className="text-[20px] font-semibold tracking-tight text-[#222222]">
                  2
                </div>
                <div className="text-[12px] font-medium text-[#222222]">
                  Years hosting
                </div>
              </div>
            </div>
          </div>

          {/* Under-card Details */}
          <div className="mt-4 flex flex-col gap-4">
            <div className="flex items-center gap-4 text-[15px] text-[#222222]">
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
                <path d="M12 2a5 5 0 0 0-5 5c0 4 3 7 5 9 2-2 5-5 5-9a5 5 0 0 0-5-5z" />
                <path d="M12 16v6" />
                <path d="M10 22h4" />
              </svg>
              <span>Born in the 80s</span>
            </div>

            <div className="flex items-center gap-4 text-[15px] text-[#222222]">
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
                <path d="M22 10 12 5 2 10l10 5 10-5z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
              </svg>
              <span>Where I went to school: NICMAR GOA</span>
            </div>
          </div>
        </div>

        {/* --- RIGHT COLUMN: Co-hosts & Details --- */}
        <div className="flex flex-1 flex-col pt-0.5">
          <h3 className="pb-4 text-[18px] font-semibold text-[#222222]">
            Co-Hosts
          </h3>

          {/* Co-Hosts Grid */}
          <div className="grid grid-cols-1 gap-y-4 gap-x-6 sm:grid-cols-2 md:grid-cols-3">
            {coHosts.map((cohost, index) => (
              <div className="flex items-center gap-3" key={index}>
                {cohost.initial ? (
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[14px] font-semibold"
                    style={{ backgroundColor: cohost.bg, color: cohost.text }}
                  >
                    {cohost.initial}
                  </div>
                ) : !imgErrors[index] ? (
                  <img
                    src={cohost.avatar}
                    alt={cohost.name}
                    onError={() => handleImgError(index)}
                    className="h-9 w-9 shrink-0 rounded-full bg-gray-100 object-cover"
                  />
                ) : (
                  /* Fallback Avatar Circle for broken local image paths */
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-200 text-[13px] font-semibold text-gray-600">
                    {cohost.name.charAt(0)}
                  </div>
                )}
                <span className="text-[14px] font-normal leading-tight text-[#222222]">
                  {cohost.name}
                </span>
              </div>
            ))}
          </div>

          {/* Host Details Section */}
          <h3 className="pb-3 pt-5 text-[18px] font-semibold text-[#222222]">
            Host details
          </h3>
          <p className="text-[14px] text-[#222222]">Response rate: 100%</p>
          <p className="mt-0.5 text-[14px] text-[#222222]">
            Responds within an hour
          </p>

          <button
            type="button"
            className="mt-6 self-start rounded-lg bg-[#f2f2f2] px-[22px] py-[12px] text-[15px] font-semibold text-[#222222]  transition hover:bg-[#f1f1f1] active:scale-[0.98]"
          >
            Message host
          </button>

          {/* Bottom Security Info Notice */}
          <div className="mt-3 flex items-center gap-3  pt-6 text-[#717171]">
            <svg
              className="shrink-0 text-[#222222]"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span className="text-[12px] leading-[18px]">
              To help protect your payment, always use Airbnb to send money and
              communicate with hosts.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
