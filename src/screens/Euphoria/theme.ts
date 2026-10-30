// Euphoria digital menu: shared constants and helpers.

export const PATHS = {
  home: "/euphoria",
  food: "/euphoria/food",
  drinks: "/euphoria/drinks",
  lunch: "/euphoria/business-lunch",
  brunch: "/euphoria/brunch",
  review: "/euphoria/review",
  dashboard: "/euphoria/dashboard",
  staff: "/euphoria/staff",
  screens: "/euphoria/screens",
} as const;

const img = (name: string) => `/euphoria/${name}`;

export const IMG = {
  mark: img("mark.png"),
  logo: img("logo.png"),
  signature: img("signature.jpg"),
  cocktail: img("cocktail.jpg"),
  diningRoom: img("dining-room.jpg"),
  pool: img("pool.jpg"),
  breakfast: img("breakfast.jpg"),
  starters: img("starters.jpg"),
  salads: img("salads.jpg"),
  pasta: img("pasta.jpg"),
  burgers: img("burgers.jpg"),
  pizza: img("pizza.jpg"),
  mains: img("mains.jpg"),
  fish: img("fish.jpg"),
  africa: img("africa.jpg"),
  sides: img("sides.jpg"),
  desserts: img("desserts.jpg"),
  mocktail: img("mocktail.jpg"),
  wine: img("wine.jpg"),
  cigar: img("cigar.jpg"),
} as const;

// Hex values for the few places that need them at runtime (dynamic inline styles).
export const C = {
  black: "#0B0B0C",
  green: "#0F3B2E",
  pink: "#EAB1B4",
  ivory: "#FAF8F3",
  claret: "#6B1E2A",
  navy: "#14213D",
} as const;

/** Key the guest's phone and the staff tablet share for the live order. */
export const ORDER_KEY = "euphoria-order-v1";
/** Read from the table's QR code in the live build. */
export const TABLE = "12";
/** Google Maps write-review link; fill in the real place id before launch. */
export const GOOGLE_REVIEW_URL = "https://search.google.com/local/writereview?placeid=[GOOGLE_PLACE_ID]";

export const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV", "XVI"];

export const naira = (n: number) => "₦" + n.toLocaleString("en-US");

export const clockNow = () => {
  const d = new Date();
  const h = d.getHours();
  const m = d.getMinutes();
  return ((h % 12) || 12) + ":" + (m < 10 ? "0" : "") + m + (h < 12 ? " am" : " pm");
};
