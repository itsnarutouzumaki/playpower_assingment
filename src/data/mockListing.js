/**
 * Listing content kept separate from presentation components.
 * Source: https://airbnb-clone-umber-two.vercel.app/
 */
import hostMirashyaHomes from "../assets/romantic-jacuzzi/host-mirashya-homes.jpeg";
import apartment01 from "../assets/romantic-jacuzzi/apartment-01.jpeg";
import apartment02 from "../assets/romantic-jacuzzi/apartment-02.jpeg";
import apartment03 from "../assets/romantic-jacuzzi/apartment-03.jpeg";
import apartment04 from "../assets/romantic-jacuzzi/apartment-04.jpeg";
import apartment05 from "../assets/romantic-jacuzzi/apartment-05.jpeg";
// import apartment06 from "../assets/romantic-jacuzzi/apartment-06.jpeg";
import bedroom01 from "../assets/romantic-jacuzzi/bedroom.jpeg";
import livingRoom01 from "../assets/romantic-jacuzzi/living.jpeg";
import leftWing from "../assets/romantic-jacuzzi/laurel-left.png";
import rightWing from "../assets/romantic-jacuzzi/laurel-right.png";
import Discount from "../assets/romantic-jacuzzi/discount.svg";
import house from "../assets/romantic-jacuzzi/searchbar-house.png";

import {
  // Bathroom
  Wind,
  Sparkles,
  Droplet,
  Flame,
  ShowerHead,
  // Bedroom and laundry
  Shirt,
  Disc,
  SunMoon,
  Bed,
  Box,
  Baby,
  // Entertainment & Family
  Tv,
  // Heating & cooling
  AirVent,
  Fan,
  // Safety
  Video,
  ShieldAlert,
  Bell,
  // Internet & office
  Wifi,
  Briefcase,
  // Kitchen & dining
  Utensils,
  Refrigerator,
  Microwave,
  CookingPot,
  Coffee,
  Wine,
  GlassWater,
  // Location & Outdoor
  Key,
  Sun,
  Trees,
  // Parking & facilities
  Car,
  Waves,
  Bath,
  Dumbbell,
  // Services
  Dog,
  Sparkle,
  Calendar,
  KeyRound,
} from "lucide-react";

export const mockListing = {
  id: "romantic-jacuzzi-1bhk-candolim-mirashya-ug10",
  title: "Romantic Jacuzzi 1BHK Candolim | Mirashya UG10",
  location: "Candolim, India",
  propertyType: "Entire serviced apartment",
  description:
    "🌴 Plan Your Relaxing Holiday at Amor De Goa by Mirashya Homes! ✨ Stay in this cozy 1BHK in the heart of Candolim, featuring a private jacuzzi 🛁 for the perfect unwind. Enjoy high-speed WiFi 💻, smart TV 📺, pet-friendly comfort 🐾, and stylish interiors. Just minutes from Candolim Beach 🏖️, popular cafés, restaurants, and nightlife 🍹.",
  highlights: [
    [
      "Outdoor entertainment",
      "The pool and alfresco dining are great for summer trips.",
    ],
    [
      "Designed for staying cool",
      "Beat the heat with the A/C and ceiling fan.",
    ],
    ["Self check-in", "You can check in with the building staff."],
  ],
  discount: Discount,
  locationDescription:
    "Stay close to Candolim’s beaches, cafés, and the best of North Goa.",
  summary: {
    guests: 3,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    rating: 4.95,
    reviewCount: 19,
    badge: "Guest favourite",
  },
  host: {
    name: "Mirashya Homes",
    avatar: hostMirashyaHomes,
    yearsHosting: 2,
    rating: 4.68,
    reviewCount: 1493,
    responseRate: "100%",
    responseTime: "Responds within an hour",
    occupation: "Property Management",
    education: "NICMAR GOA",
  },
  amenities: [
  { name: "Kitchen", icon: Utensils },
  { name: "Wifi", icon: Wifi },
  { name: "Dedicated workspace", icon: Briefcase },
  { name: "Free parking on premises", icon: Car },
  { name: "Pool", icon: Waves },
  { name: "Hot tub", icon: Bath },
  { name: "Pets allowed", icon: Dog },
  { name: "Exterior security cameras on property", icon: Video },
  { name: "Carbon monoxide alarm", icon: ShieldAlert },
  { name: "Smoke alarm", icon: Bell },
  ],
  amenitiesCategories : [
 {
    category: "Bathroom",
    items: [
      { name: "Hairdryer", icon: Wind },
      { name: "Cleaning products", icon: Sparkles },
      { name: "Shampoo", icon: Droplet },
      { name: "Hot water", icon: Flame },
      { name: "Shower gel", icon: ShowerHead },
    ],
  },
  {
    category: "Bedroom and laundry",
    items: [
      { name: "Washing machine", icon: Disc },
      { name: "Hangers", icon: Shirt },
      { name: "Bed linen", icon: Bed },
      { name: "Room-darkening blinds", icon: SunMoon },
      { name: "Iron", icon: Shirt },
      { name: "Clothes storage", icon: Box },
      { name: "Cot", icon: Baby },
    ],
  },
  {
    category: "Entertainment",
    items: [{ name: "TV", icon: Tv }],
  },
  {
    category: "Family",
    items: [{ name: "Cot", icon: Baby }],
  },
  {
    category: "Heating and cooling",
    items: [
      { name: "Air conditioning", icon: AirVent },
      { name: "Ceiling fan", icon: Fan },
    ],
  },
  {
    category: "Home safety",
    items: [
      { name: "Exterior security cameras on property", icon: Video },
      { name: "Carbon monoxide alarm", icon: ShieldAlert },
      { name: "Smoke alarm", icon: Bell },
    ],
  },
  {
    category: "Internet and office",
    items: [
      { name: "Wifi", icon: Wifi },
      { name: "Dedicated workspace", icon: Briefcase },
    ],
  },
  {
    category: "Kitchen and dining",
    items: [
      { name: "Kitchen", icon: Utensils },
      { name: "Fridge", icon: Refrigerator },
      { name: "Freezer", icon: Refrigerator },
      { name: "Microwave", icon: Microwave },
      { name: "Cooking basics", icon: CookingPot },
      { name: "Crockery and cutlery", icon: Utensils },
      { name: "Kettle", icon: Coffee },
      { name: "Coffee", icon: Coffee },
      { name: "Wine glasses", icon: Wine },
      { name: "Toaster", icon: CookingPot },
      { name: "Blender", icon: GlassWater },
      { name: "Cooker", icon: Flame },
    ],
  },
  {
    category: "Location features",
    items: [{ name: "Private entrance", icon: Key }],
  },
  {
    category: "Outdoor",
    items: [
      { name: "Patio or balcony", icon: Sun },
      { name: "Outdoor dining area", icon: Trees },
    ],
  },
  {
    category: "Parking and facilities",
    items: [
      { name: "Free parking on premises", icon: Car },
      { name: "Pool", icon: Waves },
      { name: "Hot tub", icon: Bath },
      { name: "Gym", icon: Dumbbell },
    ],
  },
  {
    category: "Services",
    items: [
      { name: "Pets allowed", icon: Dog },
      { name: "Cleaning available during stay", icon: Sparkle },
      { name: "Long-term stays allowed", icon: Calendar },
      { name: "Self check-in", icon: KeyRound },
    ],
  },
],
  unavailableAmenities: ["Carbon monoxide alarm", "Smoke alarm"],
  booking: {
    total: "₹28,499",
    nights: 5,
    checkIn: "10/18/2026",
    checkOut: "10/23/2026",
    dateRange: "18 Oct 2026 - 23 Oct 2026",
    guests: "2 guests",
    cancellation: "Free cancellation before 17 October",
  },
  sleepingArrangements: [
    { title: "Bedroom", detail: "1 double bed", image: bedroom01 },
    { title: "Living room", detail: "1 sofa", image: livingRoom01 },
  ],
  reviews: [
    {
      id: 1,
      name: "Amit",
      avatar: null, // Initial avatar 'A'
      tenure: "2 months on Airbnb",
      date: "1 week ago",
      rating: 5,
      text: "Very helpful and responsive team. Safe and peaceful stay. loved everything about the property.",
    },
    {
      id: 2,
      name: "Aheesh",
      avatar:
        "/reviewer/rev1.jpeg", 
      tenure: "3 years on Airbnb",
      date: "2 weeks ago",
      rating: 5,
      text: "We had a wonderful stay. The apartment was clean, comfortable, and exactly as shown in the photos. The host was very responsive and helpful throughout our stay. We would definitely recommend this place and would love to stay here again.",
    },
    {
      id: 3,
      name: "Samiksha",
      avatar:
        "/reviewer/rev2.jpeg", 
      tenure: "8 months on Airbnb",
      date: "May 2026",
      rating: 5,
      text: "the host nitish was really great help",
    },
    {
      id: 4,
      name: "Vedant",
      avatar: null,
      tenure: "4 years on Airbnb",
      date: "May 2026",
      rating: 5,
      text: "We had an amazing stay at this property in Goa! The entire home was spotless and exceptionally well-maintained, making us feel comfortable from the moment we arrived. The cleanliness standards were truly impressive, with every corner of the house looking fresh and pristine....",
    },
    {
      id: 5,
      name: "Vaibhav S",
      avatar:
        "/reviewer/rev3.jpeg", 
      tenure: "3 years on Airbnb",
      date: "May 2026",
      rating: 5,
      text: "Great great experience living out there , can't expect more , will always look for it in the future and will recommend my friends too.",
    },
    {
      id: 6,
      name: "Mohd",
      avatar:
        "/reviewer/rev4.jpeg", 
      tenure: "5 years on Airbnb",
      date: "May 2026",
      rating: 5,
      text: "Great place. Exactly as described in the listing.",
    },
  ],
  ratingBreakdown: [
    ["Cleanliness", "4.9"],
    ["Accuracy", "4.9"],
    ["Check-in", "4.8"],
    ["Communication", "4.9"],
    ["Location", "4.8"],
    ["Value", "4.8"],
  ],
  houseRules: [
    "Check-in after 2:00 pm",
    "Checkout before 11:00 am",
    "3 guests maximum",
  ],
  safety: ["Carbon monoxide alarm", "Smoke alarm"],
  ratingImage: [leftWing, rightWing],
  heroImages: [apartment01, apartment02, apartment03, apartment04, apartment05],
  galleryImages: [
    apartment01,
    apartment02,
    apartment03,
    apartment04,
    apartment05,
  ],
  searchHouse: house,
};

export default mockListing;
