import React from "react";
import { Link, useLocation } from "react-router-dom";

interface NavigationItem {
  text: string;
  href?: string;
  onClick?: () => void;
  isNative?: boolean;
}

interface NavigationProps {
  items: NavigationItem[];
  showBrand?: boolean;
  className?: string;
}

export const Navigation: React.FC<NavigationProps> = ({
  items,
  showBrand = true,
  className,
}) => {
  const location = useLocation();

  return (
    <nav className={className ? className : "w-full"}>
      <ul className="flex flex-col items-start w-full gap-2 sm:flex-row sm:justify-between sm:space-x-4 lg:space-x-6 sm:items-center">
        {showBrand && (
          <li className="flex items-center gap-4">
            <Link
              to="/"
              className="font-bold text-[#003da8] text-sm sm:text-base tracking-tight cursor-pointer block py-2 hover:text-[#0054e3]"
              style={{ fontFamily: 'Tahoma, Arial, sans-serif' }}
            >
              Olu
            </Link>
          </li>
        )}
        {items.map((item, index) => {
          const isActive =
            item.isNative !== false && location.pathname === item.href;

          return (
            <li key={index}>
              <Link
                to={item.href || "#"}
                onClick={item.onClick}
                className={`xp-button text-xs sm:text-sm no-underline inline-block ${
                  isActive ? "bg-[#d4d0c8]" : ""
                }`}
              >
                {item.text}
              </Link>
            </li>
          );
        })}

        <a
          href="https://drive.google.com/file/d/1ECIrky5LKSqD7UoULMbYi7zt35m3VXe9/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="xp-button-green text-xs sm:text-sm no-underline inline-block"
        >
          Resume
        </a>
      </ul>
    </nav>
  );
};
