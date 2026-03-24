import { SITE_NAME } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} {SITE_NAME}
        </p>
      </div>
    </footer>
  );
}
