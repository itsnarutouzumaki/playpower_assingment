import { useEffect, useRef, useState } from "react";
import BookingCard from "./components/BookingCard";
import ListingDetails from "./components/ListingDetails";
import ListingFooter from "./components/ListingFooter";
import ListingHeader from "./components/ListingHeader";
import ListingNav from "./components/ListingNav";
import ListingAfterCalendar from "./components/ListingAfterCalendar";
import PhotoGrid from "./components/PhotoGrid";
import MeetYourHost from "./components/MeetHost";
import PhotoTour from "./components/PhotoTour";

/**
 * App
 *
 * Top-level component that composes the full listing page and owns the two
 * pieces of cross-component state the page needs:
 *
 * 1. `showPhotoTour` — whether the full-screen Photo Tour view should be
 *    shown in place of the listing page. This is driven by a `?photo` query
 *    parameter rather than plain in-memory state, so the Photo Tour view is
 *    directly linkable/shareable and survives back/forward navigation
 *    (handled via the `popstate` listener + `checkPhotoParam`).
 * 2. `isNavSticky` — whether the secondary sticky nav bar (`ListingNav`)
 *    should be visible. An `IntersectionObserver` watches the wrapper div
 *    around `PhotoGrid`; once that wrapper scrolls out of view, the sticky
 *    nav fades/slides in. The observer is torn down and skipped entirely
 *    while Photo Tour is open, since the sticky nav only applies to the
 *    listing page.
 *
 * View flow:
 * When `showPhotoTour` is true, `App` renders only `<PhotoTour />` and
 * returns early — the listing page's header/nav/details/booking tree is not
 * mounted at all while Photo Tour is active. Closing Photo Tour
 * (`handleClosePhotos`) pops the `?photo` param off the URL and flips the
 * flag back, remounting the listing page.
 *
 * @author @itsnarutouzumaki
 */
function App() {
  const showPhotosRef = useRef(null);
  const photoGridWrapperRef = useRef(null);
  const [isNavSticky, setIsNavSticky] = useState(false);
  const [showPhotoTour, setShowPhotoTour] = useState(false);

  useEffect(() => {
    const checkPhotoParam = () => {
      const params = new URLSearchParams(window.location.search);
      setShowPhotoTour(params.has("photo"));
    };

    checkPhotoParam(); // Check when component mounts

    window.addEventListener("popstate", checkPhotoParam);
    return () => window.removeEventListener("popstate", checkPhotoParam);
  }, []);

  const handleShowPhotos = () => {
    const newUrl = `${window.location.pathname}?photo`;
    window.history.pushState({ path: newUrl }, "", newUrl);
    setShowPhotoTour(true); // 4. Switch to PhotoTour view
  };

  const handleClosePhotos = () => {
    window.history.pushState(
      { path: window.location.pathname },
      "",
      window.location.pathname,
    );
    setShowPhotoTour(false); // Switch back to listing view
  };

  useEffect(() => {
    if (showPhotoTour) return; // Skip observer if photo tour is active

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsNavSticky(!entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0,
      },
    );

    if (photoGridWrapperRef.current) {
      observer.observe(photoGridWrapperRef.current);
    }

    return () => observer.disconnect();
  }, [showPhotoTour]);

  // 5. Render PhotoTour if ?photo is in URL, otherwise render main listing
  if (showPhotoTour) {
    return <PhotoTour onClose={handleClosePhotos} />;
  }

  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     ([entry]) => {
  //       // When PhotoGrid goes out of view (isIntersecting === false), show sticky nav
  //       setIsNavSticky(!entry.isIntersecting);
  //     },
  //     {
  //       root: null,
  //       threshold: 0, // Triggers as soon as PhotoGrid completely/partially leaves
  //     },
  //   );

  //   if (photoGridWrapperRef.current) {
  //     observer.observe(photoGridWrapperRef.current);
  //   }

  //   return () => observer.disconnect();
  // }, []);

  return (
    <>
      <ListingHeader />
      <main className="relative">
        {/* Wrapper attached to ref so the observer knows when PhotoGrid is scrolled past */}
        <div ref={photoGridWrapperRef}>
          <PhotoGrid
            onShowPhotos={handleShowPhotos}
            showPhotosRef={showPhotosRef}
          />
        </div>

        {/* Sticky Pop-in Navigation */}
        <div
          className={`sticky top-0 z-50 bg-white transition-all duration-300 ease-in-out ${
            isNavSticky
              ? "translate-y-0 opacity-100 shadow-sm"
              : "pointer-events-none -translate-y-full opacity-0"
          }`}
        >
          <ListingNav />
        </div>

        <div className="page-width listing-content">
          <ListingDetails />
          <BookingCard />
        </div>
        <ListingAfterCalendar />
        <MeetYourHost />
        <ListingFooter />
      </main>
    </>
  );
}

export default App;
