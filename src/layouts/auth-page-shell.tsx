import { cn } from "@/lib/utils";

type AuthPageShellProps = {
  children: React.ReactNode;
  className?: string;
};

/** Centered auth card layout — mobile-first safe padding. */
export function AuthPageShell({ children, className }: AuthPageShellProps) {
  return (
    <div
      className={cn(
        "flex min-h-[100dvh] min-h-screen flex-col items-center justify-center bg-background px-4 py-8 sm:px-6 sm:py-10",
        className,
      )}
    >
      <div className="w-full max-w-md animate-fade-in">{children}</div>
    </div>
  );
}
