import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

interface PrimaryButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "destructive";
  className?: string;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  href,
  onClick,
  children,
  variant = "primary",
}) => {
  const getVariantClasses = (variant: string) => {
    switch (variant) {
      case "secondary":
        return "bg-gray-200 text-black hover:bg-gray-300";
      case "ghost":
        return "bg-transparent text-black hover:bg-gray-100";
      case "destructive":
        return "bg-red-500 text-white hover:bg-red-600";
      default:
        return "bg-yellow-500 text-black hover:bg-yellow-600";
    }
  };

  const classes = `
    ${getVariantClasses(variant)}
    px-4 py-2 rounded-lg font-semibold
    transition transform duration-150 ease-in-out
    active:scale-95 shadow
  `;

  if (href) {
    return (
      <Button asChild className={classes}>
        <Link href={href}>{children}</Link>
      </Button>
    );
  }

  return (
    <Button onClick={onClick} className={classes}>
      {children}
    </Button>
  );
};
