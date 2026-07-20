import { useEffect, useState } from "react";

export interface Availability {
  available: number;
  total: number;
  isFull: boolean;
  label: string;          // e.g. "2 spots left"
  status: "open" | "limited" | "full" | "loading";
}

const CONVEX_SITE_URL = import.meta.env.VITE_CONVEX_SITE_URL as string;

export function useAvailability(): Availability {
  const [data, setData] = useState<{ available: number; total: number } | null>(null);

  useEffect(() => {
    fetch(`${CONVEX_SITE_URL}/slots`)
      .then((r) => r.json())
      .then((json) => setData(json))
      .catch(() => {
        // Fallback: show as open if fetch fails
        setData({ available: 3, total: 3 });
      });
  }, []);

  if (!data) {
    return { available: 0, total: 3, isFull: false, label: "Loading…", status: "loading" };
  }

  const { available, total } = data;
  const isFull = available <= 0;

  let label: string;
  let status: Availability["status"];

  if (isFull) {
    label = "Fully booked";
    status = "full";
  } else if (available === 1) {
    label = "1 spot left";
    status = "limited";
  } else if (available < total) {
    label = `${available} spots left`;
    status = "limited";
  } else {
    label = `Taking ${total} projects`;
    status = "open";
  }

  return { available, total, isFull, label, status };
}
