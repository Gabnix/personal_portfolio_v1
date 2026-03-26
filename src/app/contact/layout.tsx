import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Jim Ling",
  description: "Get in touch with Jim Ling for job opportunities, collaborations, or questions.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
