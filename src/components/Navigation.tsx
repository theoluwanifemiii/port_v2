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

export const Navigation: React.FC<NavigationProps> = ({ items, showBrand = true, className }) => {
  const location = useLocation();

  return (
    <nav className={className ? className : "w-full"}>
      <ul className="flex flex-col sm:flex-row w-full gap-0 sm:justify-between sm:space-x-8 lg:space-x-12 items-start sm:items-center">
        {showBrand && (
          <li className="transition-all ease-in-out duration-300 flex items-center gap-4">
            <Link
              to="/"
              className="[font-family:'Neue_Montreal',Helvetica] font-bold text-black text-sm sm:text-base lg:text-lg tracking-tight leading-relaxed cursor-pointer block py-3 sm:py-2 transition-all ease-in-out duration-300 hover:text-gray-900"
            >
              Olu
            </Link>
            <a
              href="https://drive.google.com/file/d/1ECIrky5LKSqD7UoULMbYi7zt35m3VXe9/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="[font-family:'Sometype_Mono',Helvetica] text-xs sm:text-sm px-3 py-1.5 bg-black text-white rounded hover:bg-gray-800 transition-colors"
            >
              Resume
            </a>
          </li>
        )}
        {items.map((item, index) => {
          const isActive = item.isNative !== false && location.pathname === item.href;

          return (
            <li
              key={index}
              className="transition-all ease-in-out duration-300"
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
