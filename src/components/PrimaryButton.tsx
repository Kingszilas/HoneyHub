import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

interface PrimaryButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({ href, onClick, children }) => {
  if (href) {
    return (
      <Button
        asChild
        size="lg"
        className="
          relative px-6 py-3 rounded-xl font-semibold text-black
          bg-gradient-to-br from-yellow-500 via-amber-500 to-orange-500
          shadow-[0_10px_20px_rgba(0,0,0,0.3)]
          transform transition-all duration-300 ease-in-out
          hover:-translate-y-1 hover:scale-105 hover:shadow-[0_15px_25px_rgba(0,0,0,0.4)]
          active:translate-y-1 active:scale-95 active:shadow-[0_5px_10px_rgba(0,0,0,0.2)]
          before:absolute before:inset-0 before:rounded-xl before:bg-white/20 before:blur-sm before:opacity-50 before:transition-opacity before:duration-300 hover:before:opacity-70
        "
      >
        <Link href={href}>{children}</Link>
      </Button>
    );
  }

  return (
    <Button
      size="lg"
      onClick={onClick}
      className="
        relative px-6 py-3 rounded-xl font-semibold text-black
        bg-gradient-to-br from-yellow-500 via-amber-500 to-orange-500
        shadow-[0_10px_20px_rgba(0,0,0,0.3)]
        transform transition-all duration-300 ease-in-out
        hover:-translate-y-1 hover:scale-105 hover:shadow-[0_15px_25px_rgba(0,0,0,0.4)]
        active:translate-y-1 active:scale-95 active:shadow-[0_5px_10px_rgba(0,0,0,0.2)]
        before:absolute before:inset-0 before:rounded-xl before:bg-white/20 before:blur-sm before:opacity-50 before:transition-opacity before:duration-300 hover:before:opacity-70
      "
    >
      {children}
    </Button>
  );
};
