import React from "react";
import { PortfolioTopBar } from "./PortfolioTopBar";

interface PortfolioShellProps {
  children: React.ReactNode;
  contentClassName?: string;
}

export const PortfolioShell: React.FC<PortfolioShellProps> = ({
  children,
  contentClassName,
}) => {
  return (
    <div className="portfolio-shell min-h-screen text-[#141516]">
      <PortfolioTopBar />
      <main
        className={`mx-auto w-full max-w-[1160px] px-4 py-8 sm:px-6 sm:py-10 lg:px-8 ${
          contentClassName || ""
        }`}
      >
        {children}
      </main>
    </div>
  );
};
