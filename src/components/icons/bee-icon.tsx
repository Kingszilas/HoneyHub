import { cn } from "@/lib/utils"

export function BeeIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-6 w-6", className)}
      {...props}
    >
      <path d="M12 2l-2.5 4.5L12 9l2.5-2.5L12 2z" fill="currentColor" />
      <path d="M12 9c-2.5 0-4.5 2-4.5 4.5S9.5 18 12 18s4.5-2 4.5-4.5S14.5 9 12 9z" />
      <path d="M9 13.5c0-1 .5-2 1.5-2.5" />
      <path d="M15 13.5c0-1-.5-2-1.5-2.5" />
      <path d="M4.5 9.5c-1.5 1.5-1.5 4 0 5.5" />
      <path d="M19.5 9.5c1.5 1.5 1.5 4 0 5.5" />
    </svg>
  );
}
