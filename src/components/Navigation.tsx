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
}

export const Navigation: React.FC<NavigationProps> = ({ items, showBrand = true }) => {
  const location = useLocation();

  return (
    <nav className="w-full">
      <ul className="flex flex-col sm:flex-row w-full gap-0 sm:justify-between">
        {showBrand && (
          <li className="flex-1 transition-all ease-in-out duration-300">
            <Link
              to="/"
              className="[font-family:'Linked',Helvetica] font-black text-black text-sm sm:text-base lg:text-lg tracking-tight leading-relaxed cursor-pointer block w-full py-3 sm:py-2 transition-all ease-in-out duration-300 hover:text-gray-900"
            >
              Olu
            </Link>
          </li>
        )}
        {items.map((item, index) => {
          const isActive = item.isNative !== false && location.pathname === item.href;

          return (
            <li
              key={index}
              className="flex-1 transition-all ease-in-out duration-300"
            >
              <Link
                to={item.href || "#"}
                onClick={item.onClick}
                className={`[font-family:'Sometype_Mono',Helvetica] font-normal text-sm sm:text-base lg:text-lg tracking-tight leading-relaxed cursor-pointer block w-full py-3 sm:py-2 transition-all ease-in-out duration-300 hover:text-gray-900 hover:bg-gray-50 active:text-black active:bg-gray-100 relative group ${
                  isActive ? "text-black font-medium" : "text-gray-500"
                }`}
              >
                {item.text}
                <span className={`absolute bottom-0 left-0 h-0.5 bg-gray-900 transition-all ease-in-out duration-300 ${
                  isActive ? "w-full" : "w-0 group-hover:w-full"
                }`}></span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
