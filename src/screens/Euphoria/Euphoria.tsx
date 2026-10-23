import { FC, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Dashboard } from "./Dashboard";
import { Landing } from "./Landing";
import { MenuScreen } from "./MenuScreen";
import { Review } from "./Review";
import { ScreenIndex } from "./ScreenIndex";
import { BusinessLunch, Brunch } from "./SetMenus";
import { Staff } from "./Staff";
import { EuphoriaStyles } from "./ui";

/**
 * Euphoria digital menu (client work for Sujimoto Group).
 * Guests land on /euphoria from the QR code on their table; staff use
 * /euphoria/dashboard and /euphoria/staff. /euphoria/screens walks every flow.
 * Mounted outside the portfolio's preloader and page transitions.
 */
export const Euphoria: FC = () => {
  useEffect(() => {
    const prev = document.title;
    document.title = "Euphoria | Pool, Restaurant, Lounge";
    return () => {
      document.title = prev;
    };
  }, []);

  return (
    <div className="eu">
      <EuphoriaStyles />
      <Routes>
        <Route index element={<Landing />} />
        <Route path="food" element={<MenuScreen kind="food" />} />
        <Route path="drinks" element={<MenuScreen kind="drinks" />} />
        <Route path="business-lunch" element={<BusinessLunch />} />
        <Route path="brunch" element={<Brunch />} />
        <Route path="review" element={<Review />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="staff" element={<Staff />} />
        <Route path="screens" element={<ScreenIndex />} />
        <Route path="*" element={<Navigate to="/euphoria" replace />} />
      </Routes>
    </div>
  );
};
