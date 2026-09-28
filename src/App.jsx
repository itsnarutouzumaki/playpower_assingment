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
import { photoTourPhotos } from "./data/mockListing";

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
  const [modalState, setModalState] = useState({
    isTourOpen: false,
    photoIndex: null,
    targetCategory: null,
  });
  const [saveState, setSaveState] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const toastTimeoutRef = useRef(null);

  useEffect(() => {
    const readModalState = () => {
      const params = new URLSearchParams(window.location.search);
      const modal = params.get("modal");
      const modalItem = Number(params.get("modalItem"));
      const photoIndex =
        modalItem >= 1000 && modalItem < 1000 + photoTourPhotos.length
          ? modalItem - 1000
          : null;

      setModalState({
        isTourOpen: modal === "PHOTO_TOUR_SCROLLABLE",
        photoIndex,
        targetCategory: null,
      });
    };

    readModalState();

    window.addEventListener("popstate", readModalState);
    return () => window.removeEventListener("popstate", readModalState);
  }, []);

  const showToast = (message) => {
    setToastMessage(message);
    window.clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = window.setTimeout(
      () => setToastMessage(""),
      2500,
    );
  };

  useEffect(() => () => window.clearTimeout(toastTimeoutRef.current), []);

  const handleShowPhotos = (targetCategory = null) => {
    const params = new URLSearchParams(window.location.search);
    params.set("modal", "PHOTO_TOUR_SCROLLABLE");
    params.delete("modalItem");
    params.delete("category");
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState({ path: newUrl }, "", newUrl);
    setModalState({ isTourOpen: true, photoIndex: null, targetCategory });
  };

  const handleClosePhotos = () => {
    const params = new URLSearchParams(window.location.search);
    params.delete("modal");
    params.delete("modalItem");
    const newUrl = `${window.location.pathname}${params.toString() ? `?${params}` : ""}`;
    window.history.pushState({ path: newUrl }, "", newUrl);
    setModalState({
      isTourOpen: false,
      photoIndex: null,
      targetCategory: null,
    });
    window.requestAnimationFrame(() => showPhotosRef.current?.focus());
  };

  const handleOpenLightbox = (photoIndex) => {
    const params = new URLSearchParams(window.location.search);
    params.set("modal", "PHOTO_TOUR_SCROLLABLE");
    params.set("modalItem", String(1000 + photoIndex));
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState({ path: newUrl }, "", newUrl);
    setModalState((current) => ({ ...current, photoIndex }));
  };

  const handleNavigateLightbox = (photoIndex) => {
    const params = new URLSearchParams(window.location.search);
    params.set("modalItem", String(1000 + photoIndex));
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({ path: newUrl }, "", newUrl);
    setModalState((current) => ({ ...current, photoIndex }));
  };

  const handleCloseLightbox = () => {
    const params = new URLSearchParams(window.location.search);
    params.delete("modalItem");
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({ path: newUrl }, "", newUrl);
    setModalState((current) => ({ ...current, photoIndex: null }));
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard?.writeText(window.location.href);
      showToast("Link copied");
    } catch {
      showToast("Link ready to share");
    }
  };

  const handleSave = () => {
    const nextSaveState = !saveState;
    setSaveState(nextSaveState);
    showToast(nextSaveState ? "Saved" : "Removed from saved places");
  };

  useEffect(() => {
    if (modalState.isTourOpen) return;

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
  }, [modalState.isTourOpen]);

  if (modalState.isTourOpen) {
    return (
      <>
        <PhotoTour
          onClose={handleClosePhotos}
          onOpenLightbox={handleOpenLightbox}
          onNavigateLightbox={handleNavigateLightbox}
          onCloseLightbox={handleCloseLightbox}
          lightboxIndex={modalState.photoIndex}
          targetCategory={modalState.targetCategory}
          isSaved={saveState}
          onSave={handleSave}
          onShare={handleShare}
        />
        {toastMessage && <Toast message={toastMessage} />}
      </>
    );
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
      <ListingHeader
        saveState={saveState}
        onSave={handleSave}
        onShare={handleShare}
      />
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
      {toastMessage && <Toast message={toastMessage} />}
    </>
  );
}

function Toast({ message }) {
  return (
    <div
      className="fixed bottom-6 left-1/2 z-[100] -translate-x-1/2 rounded-lg bg-[#222222] px-4 py-3 text-sm font-semibold text-white shadow-lg"
      role="status"
      aria-live="polite"
    >
      {message}
    </div>
  );
}

export default App;
