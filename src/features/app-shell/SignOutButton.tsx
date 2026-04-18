import { LogOut } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { signOut } from "@/lib/auth";
import { cn } from "@/lib/utils";

type SignOutButtonProps = {
  className?: string;
  iconOnly?: boolean;
};

export function SignOutButton({ className, iconOnly = false }: SignOutButtonProps) {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      title="Sign out"
      aria-label="Sign out"
      onClick={() => {
        signOut();
        navigate({ to: "/sign-in" });
      }}
      className={cn(
        "flex min-h-11 min-w-11 items-center justify-center gap-2 text-sm text-muted-foreground transition-all hover:bg-muted/60 hover:text-foreground",
        iconOnly ? "rounded-full p-2" : "mt-2 w-full rounded-xl px-3 py-2.5",
        className,
      )}
    >
      <LogOut className="h-[18px] w-[18px] shrink-0" />
      {!iconOnly && "Sign out"}
    </button>
  );
}
