"use client";

import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { AnimatedWrapper } from "@/components/shared/AnimatedWrapper";
import { SOCIAL_LINKS } from "@/lib/constants";

export function ContactSection() {
  return (
    <section id="contact" className="py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <AnimatedWrapper className="max-w-2xl">
          <SectionHeader
            label="Get In Touch"
            subtitle="I'm currently open to new opportunities. Whether you have a question or just want to say hi, my inbox is always open."
          />
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/contact" className={cn(buttonVariants({ size: "lg" }))}>
              <Mail className="mr-2 h-4 w-4" />
              Send a message
            </Link>
            <a href={SOCIAL_LINKS.email} className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
              Email directly <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        </AnimatedWrapper>
      </div>
    </section>
  );
}
