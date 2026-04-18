import { cn } from "@/lib/utils";

type PageShellProps = {
  children: React.ReactNode;
  /** Max width: `content` = forms/onboarding; `wide` = dashboard grids */
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "content" | "wide";
  className?: string;
};

const maxWidthClass: Record<NonNullable<PageShellProps["maxWidth"]>, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "3xl": "max-w-3xl",
  content: "max-w-3xl",
  wide: "max-w-[1400px]",
};

/**
 * Standard responsive page padding + width. Use inside authenticated routes.
 */
export function PageShell({ children, maxWidth = "content", className }: PageShellProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full min-w-0 px-4 py-6 sm:px-5 sm:py-8 lg:px-8 lg:py-10",
        maxWidthClass[maxWidth],
        className,
      )}
    >
      {children}
    </div>
  );
}

type PageHeaderProps = {
  badge?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
};

/**
 * Responsive header: stacks on small screens; actions wrap below title on mobile.
 */
export function PageHeader({ badge, title, description, actions, className }: PageHeaderProps) {
  return (
    <header
      className={cn(
        "animate-fade-in flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6",
        className,
      )}
    >
      <div className="min-w-0">
        {badge ? (
          <span className="inline-flex max-w-full items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            {badge}
          </span>
        ) : null}
        <h1 className="font-display mt-3 text-3xl leading-tight sm:mt-4 sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {description ? (
          <div className="mt-1.5 text-sm text-muted-foreground sm:mt-2">{description}</div>
        ) : null}
      </div>
      {actions ? (
        <div className="flex w-full shrink-0 flex-col gap-2 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-end">
          {actions}
        </div>
      ) : null}
    </header>
  );
}
