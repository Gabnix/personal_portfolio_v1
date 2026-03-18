"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { AnimatedWrapper } from "@/components/shared/AnimatedWrapper";
import { slideInFromLeft, slideInFromRight } from "@/lib/animations";

export function AboutSection() {
  return (
    <section id="about" className="py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <SectionHeader
          label="About Me"
          subtitle="A bit about who I am and what I do."
        />

        <div className="mt-12 grid md:grid-cols-2 gap-12 items-center">
          <AnimatedWrapper variant={slideInFromLeft}>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I&apos;m a software engineer who enjoys building things for the
                web. I care about writing clean, maintainable code and creating
                interfaces that feel intuitive.
              </p>
              <p>
                When I&apos;m not coding, you can find me exploring new
                technologies, contributing to open source, or enjoying a good
                book.
              </p>
              <div className="pt-4">
                <Link href="/about" className={cn(buttonVariants({ variant: "outline" }))}>
                  More about me <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </AnimatedWrapper>

          <AnimatedWrapper variant={slideInFromRight}>
            <div className="aspect-square rounded-2xl bg-muted flex items-center justify-center">
              {/* Replace with <Image> once you have a profile photo */}
              <span className="text-muted-foreground text-sm">Photo</span>
            </div>
          </AnimatedWrapper>
        </div>
      </div>
    </section>
  );
}
