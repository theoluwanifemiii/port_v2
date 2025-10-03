import React from "react";

interface NavigationItem {
  text: string;
  href?: string;
  onClick?: () => void;
}

interface NavigationProps {
  items: NavigationItem[];
}

export const Navigation: React.FC<NavigationProps> = ({ items }) => {
  return (
    <nav className="w-full">
      <ul className="flex flex-col sm:flex-row w-full gap-0 sm:justify-between">
        {items.map((item, index) => (
          <li
            key={index}
            className="flex-1 transition-all ease-in-out duration-300"
          >
            <a
              href={item.href || "#"}
              onClick={item.onClick}
              className="[font-family:'Sometype_Mono',Helvetica] font-normal text-gray-500 text-sm sm:text-base lg:text-lg tracking-tight leading-relaxed cursor-pointer block w-full py-3 sm:py-2 transition-all ease-in-out duration-300 hover:text-gray-900 hover:bg-gray-50 active:text-black active:bg-gray-100 relative group"
            >
              {item.text}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 transition-all ease-in-out duration-300 group-hover:w-full"></span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
