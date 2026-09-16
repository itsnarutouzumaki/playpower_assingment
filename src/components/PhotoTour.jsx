// Import Lucide React icons or use standard inline SVGs
import { ChevronLeft, Share, Heart } from "lucide-react";
// Replace this import with your actual mocklisting.js path
import { mockListing } from "../data/mockListing";
import { useEffect } from "react";

export default function PhotoTour({ onClose }) {
  // If mockListing data structure differs, fallback to sample room categories
  const categories = mockListing?.photoCategories || [
    {
      id: "living-room-1",
      title: "Living room 1",
      amenities: ["Sofa", "Air conditioning", "Ceiling fan", "TV"],
      coverImage: "Living1/1.jpeg",
      images: ["Living1/1.jpeg", "Living1/3.jpeg", "Living1/2.jpeg"],
    },
    {
      id: "living-room-2",
      title: "Living room 2",
      amenities: ["Ceiling fan", "Hot tub"],
      coverImage: "Living2/1.jpeg",
      images: [
        "Living2/1.jpeg",
        "Living2/3.jpeg",
        "Living2/2.jpeg",
        "Living2/4.jpeg",
        "Living2/5.jpeg",
        "Living2/6.jpeg",
        "Living2/7.jpeg",
      ],
    },
    {
      id: "full-kitchen",
      title: "Full kitchen",
      amenities: [
        "Freezer",
        "Fridge",
        "Blender",
        "Cooker",
        "Cooking basics",
        "Kettle",
        "Microwave",
        "Toaster",
        "Wine glasses",
        "Coffee",
        "Crockery and cutlery",
      ],
      coverImage: "kitchen/1.jpeg",
      images: ["kitchen/1.jpeg", "kitchen/2.jpeg"],
    },
    {
      id: "bedroom",
      title: "Bedroom",
      amenities: [
        "Double bed",
        "Air conditioning",
        "Bed linen",
        "Ceiling fan",
        "Clothes storage",
        "Cot",
        "Hangers",
        "Iron",
        "Room-darkening blinds",
        "Cleaning available during stay",
        "Cleaning products",
        "Long-term stays allowed",
        "Private entrance",
        "Wifi",
      ],
      coverImage: "bedroom/1.jpeg",
      images: [
        "bedroom/1.jpeg",
        "bedroom/2.jpeg",
        "bedroom/3.jpeg",
        "bedroom/4.jpeg",
        "bedroom/5.jpeg",
        "bedroom/6.jpeg",
      ],
    },
    {
      id: "full-bathroom",
      title: "Full bathroom",
      amenities: ["Hairdryer ", "Hot water", "Shampoo", "Shower gel"],
      coverImage: "/bathroom/1.jpeg",
      images: ["/bathroom/1.jpeg"],
    },
    {
      id: "gym",
      title: "Gym",
      amenities: [
        "Air conditioning",
        "Gym",
        "Exercise equipment",
        "Ceiling fan",
      ],
      coverImage: "gym/1.jpeg",
      images: [
        "gym/1.jpeg",
        "gym/2.jpeg",
        "gym/3.jpeg",
        "gym/4.jpeg",
        "gym/5.jpeg",
      ],
    },
    {
      id: "exterior",
      title: "Exterior",
      coverImage: "exterior/1.jpeg",
      images: [
        "exterior/1.jpeg",
        "exterior/2.jpeg",
        "exterior/3.jpeg",
        "exterior/4.jpeg",
        "exterior/5.jpeg",
        "exterior/6.jpeg",
      ],
    },
    {
      id: "pool",
      title: "Pool",
      amenities: ["pool"],
      coverImage: "pool/1.jpeg",
      images: ["pool/1.jpeg", "pool/2.jpeg", "pool/3.jpeg"],
    },
    {
      id: "additional",
      title: "Additional photos",
      coverImage: "additional/1.jpeg",
      images: [
        "additional/1.jpeg",
        "additional/2.jpeg",
        "additional/3.jpeg",
        "additional/4.jpeg",
        "additional/5.jpeg",
        "additional/6.jpeg",
        "additional/7.jpeg",
        "additional/8.jpeg",
        "additional/9.jpeg",
        "additional/10.jpeg",
      ],
    },
  ];

  const scrollToCategory = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    // Attach the event listener to the window
    window.addEventListener("keydown", handleKeyDown);

    // Clean up the listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* 1. Header Bar */}
      <header className="sticky top-0 z-40 bg-white px-6 pt-6.5 pb-5.5 flex items-center justify-between">
        <button
          onClick={onClose}
          className="p-2 pt-1  hover:bg-gray-100 rounded-full transition"
          aria-label="Back"
        >
          <ChevronLeft className="w-6 h-7 text-black/70 stroke-[1.5]" />
        </button>

        <div className="font-semibold text-[16px] tracking-tight ml-12 mb-1 text-gray-800">
          Photo tour
        </div>

        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-gray-100 rounded-full transition">
            <Share className="w-4 h-4 text-gray-800" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition">
            <Heart className="w-4 h-4 text-gray-800" />
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-22 ">
        {/* 2. Top Category Thumbnails Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2.5 mb-[52px]">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => scrollToCategory(cat.id)}
              className="group text-left "
            >
              <div className="h-[106px] w-full rounded-[10px] overflow-hidden bg-gray-100 mb-2 border border-gray-200 transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-md">
                <img
                  src={cat.coverImage || cat.images[0]}
                  alt={cat.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-[14.3px] font-medium text-gray-500 leading-tight tracking-tight">
                {cat.title}
              </p>
            </button>
          ))}
        </div>

        {/* 3. Main Content Sections */}
        <div className="space-y-5 mb-25">
          {categories.map((cat) => (
            <div
              id={cat.id}
              key={cat.id}
              className="grid grid-cols-1 md:grid-cols-12 items-start "
            >
              {/* Sticky Room Title & Amenities (Left Side) */}
              <div className="md:col-span-6 sticky top-[102px] self-start pr-4">
                <h2 className="text-[30px] font-sans font-semibold text-gray-900 tracking-[0.2px]">
                  {cat.title}
                </h2>
                {cat.amenities && cat.amenities.length > 0 && (
                  <p className="mt-3 text-[16px] text-gray-500 leading-relaxed">
                    {cat.amenities.join(" · ")}
                  </p>
                )}
              </div>

              {/* Photo Grid Container (Right Side) */}
              <div className="md:col-span-6 justify-self-end space-y-3 w-[458px]">
                {(() => {
                  const total = cat.images.length;

                  // Case 1: If total images % 3 === 2 (e.g. 2, 5, 8 images),
                  // render the main groups of 3 first, then put the LAST TWO in a small 2-col grid.
                  if (total % 3 === 2) {
                    const fullGroupsCount = Math.floor(total / 3);
                    const regularImages = cat.images.slice(
                      0,
                      fullGroupsCount * 3,
                    );
                    const lastTwoImages = cat.images.slice(fullGroupsCount * 3);

                    return (
                      <div className="space-y-3">
                        {/* Main groups of 3 (1 Big -> 2 Small) */}
                        {Array.from({ length: fullGroupsCount }).map(
                          (_, groupIdx) => {
                            const mainImage = regularImages[groupIdx * 3];
                            const subImages = regularImages.slice(
                              groupIdx * 3 + 1,
                              groupIdx * 3 + 3,
                            );

                            return (
                              <div key={groupIdx} className="space-y-3">
                                <div className="w-full h-[305px] rounded-lg overflow-hidden bg-gray-100">
                                  <img
                                    src={mainImage}
                                    alt=""
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                  {subImages.map((imgUrl, subIdx) => (
                                    <div
                                      key={subIdx}
                                      className="h-[148px] rounded-lg overflow-hidden bg-gray-100"
                                    >
                                      <img
                                        src={imgUrl}
                                        alt=""
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                  ))}
                                </div>
                              </div>
                            );
                          },
                        )}

                        {/* Last 2 images rendered side-by-side in small boxes */}
                        <div className="grid grid-cols-2 gap-3">
                          {lastTwoImages.map((imgUrl, idx) => (
                            <div
                              key={idx}
                              className="h-[148px] rounded-lg overflow-hidden bg-gray-100"
                            >
                              <img
                                src={imgUrl}
                                alt=""
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  }

                  // Case 2: Standard behavior for 1, 3, 4, 6... images
                  return Array.from({ length: Math.ceil(total / 3) }).map(
                    (_, groupIdx) => {
                      const mainImage = cat.images[groupIdx * 3];
                      const subImages = cat.images.slice(
                        groupIdx * 3 + 1,
                        groupIdx * 3 + 3,
                      );

                      return (
                        <div key={groupIdx} className="space-y-3">
                          {mainImage && (
                            <div className="w-full h-[305px] rounded-lg overflow-hidden bg-gray-100">
                              <img
                                src={mainImage}
                                alt=""
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}

                          {subImages.length > 0 && (
                            <div className="grid grid-cols-2 gap-3">
                              {subImages.map((imgUrl, subIdx) => (
                                <div
                                  key={subIdx}
                                  className="h-[148px] rounded-lg overflow-hidden bg-gray-100"
                                >
                                  <img
                                    src={imgUrl}
                                    alt=""
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    },
                  );
                })()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
