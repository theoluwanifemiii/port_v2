import { useState } from "react";
import type { Id } from "../../../convex/_generated/dataModel";
import { api, convex, useLive } from "./backend";

/** Guest reviews, shared by the management dashboard and the staff tablet. */

export type ReviewStatus = "new" | "follow" | "replied";

export interface GuestReview {
  id: string;
  name: string;
  src: "qr" | "google";
  rating: number;
  when: string;
  table: string;
  tags: string[];
  text: string;
  contact: string;
  status: ReviewStatus;
}

export const SAMPLE_REVIEWS: GuestReview[] = [
  { id: "1", name: "Adaeze O.", src: "qr", rating: 5, when: "Sat, 7:42 pm", table: "Table 12", tags: ["Food", "Service"], text: "The lamb shank was outstanding and our server knew the menu by heart. The pool at dusk is something else.", contact: "", status: "new" },
  { id: "2", name: "Tunde B.", src: "google", rating: 5, when: "Sat, 3:10 pm", table: "", tags: ["Ambience", "Drinks"], text: "Best brunch spot in Ikoyi. Cocktails were perfect and the setting is beautiful.", contact: "", status: "new" },
  { id: "3", name: "Guest", src: "qr", rating: 2, when: "Fri, 9:05 pm", table: "Table 4", tags: ["Service"], text: "Food was good but we waited almost forty minutes for mains with no update.", contact: "0802 000 0000", status: "follow" },
  { id: "4", name: "Kemi A.", src: "qr", rating: 4, when: "Fri, 1:20 pm", table: "Table 7", tags: ["Food", "Value"], text: "Business lunch was quick and elegant. Would love one more dessert option.", contact: "", status: "replied" },
  { id: "5", name: "Michael E.", src: "google", rating: 3, when: "Thu, 8:47 pm", table: "", tags: ["Music"], text: "Lovely place, music was a little loud for conversation.", contact: "", status: "new" },
  { id: "6", name: "Zainab M.", src: "qr", rating: 5, when: "Thu, 7:15 pm", table: "Table 2", tags: ["Drinks", "The Pool"], text: "The PMS cocktail is my new favourite. Thank you for a wonderful birthday evening.", contact: "", status: "replied" },
];

export const REVIEW_STATUS: Record<ReviewStatus, { label: string; cls: string }> = {
  new: { label: "New", cls: "text-eu-navy" },
  follow: { label: "Priority: call back requested", cls: "text-eu-claret border-b-2 border-eu-claret" },
  replied: { label: "Replied", cls: "text-eu-green" },
};

export const whenLabel = (t: number) => {
  const d = new Date(t);
  const day = d.toLocaleDateString("en-GB", { weekday: "short" });
  const h = d.getHours();
  const m = d.getMinutes();
  return `${day}, ${(h % 12) || 12}:${m < 10 ? "0" : ""}${m} ${h < 12 ? "am" : "pm"}`;
};

/**
 * Live reviews when signed in to the backend (newest first, updating as
 * guests submit them); otherwise the sample set, with statuses kept locally.
 */
export function useGuestReviews(remote: boolean, key: string) {
  const live = useLive(api.euphoria.listReviews, remote ? { key } : "skip");
  const [override, setOverride] = useState<Record<string, ReviewStatus>>({});

  const reviews: GuestReview[] = remote
    ? (live.data ?? []).map((r) => ({
        id: r._id,
        name: r.name || "Guest",
        src: r.source,
        rating: r.rating,
        when: whenLabel(r._creationTime),
        table: r.table ? "Table " + r.table : "",
        tags: r.aspects,
        text: r.text,
        contact: r.contact,
        status: r.status,
      }))
    : SAMPLE_REVIEWS.map((r) => ({ ...r, status: override[r.id] || r.status }));

  const setStatus = (id: string, status: ReviewStatus) => {
    if (!remote) setOverride({ ...override, [id]: status });
    else if (convex) {
      convex
        .mutation(api.euphoria.setReviewStatus, { key, id: id as Id<"euphoriaReviews">, status })
        .catch((e) => console.error("Euphoria: could not update the review", e));
    }
  };

  return { reviews, loading: remote && live.data === undefined, setStatus };
}
