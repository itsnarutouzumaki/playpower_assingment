export default function AirbnbMark() {
  return (
    <a 
      href="/" 
      className="flex items-center justify-center gap-1.5 text-[#ff385c] transition-opacity hover:opacity-90" 
      aria-label="Airbnb homepage"
    >
      <svg aria-hidden="true" fill="none" height="34" viewBox="0 0 32 32" width="34">
        <path
          d="M16 4.5c-3.1 0-4.6 3.9-7.7 10.4C5.7 20.2 3.2 25.5 8.1 27.4c3.7 1.4 6.2-2 7.9-5.1 1.7 3.1 4.2 6.5 7.9 5.1 4.9-1.9 2.4-7.2-.2-12.5C20.6 8.4 19.1 4.5 16 4.5Z"
          stroke="currentColor"
          strokeWidth="2.25"
          strokeLinejoin="round"
        />
        <path
          d="M16 11.3c-2.4 0-4.1 2.3-4.1 4.7 0 2.3 1.6 4.1 4.1 4.1s4.1-1.8 4.1-4.1c0-2.4-1.7-4.7-4.1-4.7Z"
          stroke="currentColor"
          strokeWidth="2.25"
        />
      </svg>
      <span className="mt-1 text-[23px] font-bold tracking-[-0.06em]">
        airbnb
      </span>
    </a>
  );
}