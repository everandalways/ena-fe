import type { Metadata } from "next";
import { HeroCarousel } from "@/components/home/hero-carousel";
import { DiamondSelector } from "@/components/home/diamond-selector";
import { FilterSection } from "@/components/home/filter-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { AnimatedSection } from "@/components/shared/animated-section";
import { SITE_NAME, SITE_URL, buildCanonicalUrl } from "@/lib/metadata";

export const metadata: Metadata = {
    title: {
        absolute: `${SITE_NAME} - Your One-Stop Shop`,
    },
    description:
        "Discover high-quality products at competitive prices. Shop now for the best deals on electronics, fashion, home goods, and more.",
    alternates: {
        canonical: buildCanonicalUrl("/"),
    },
    openGraph: {
        title: `${SITE_NAME} - Your One-Stop Shop`,
        description:
            "Discover high-quality products at competitive prices. Shop now for the best deals.",
        type: "website",
        url: SITE_URL,
    },
};

export default async function Home(_props: PageProps<'/'>) {
    return (
        <div className="min-h-screen">
            <HeroCarousel />
            <AnimatedSection delay={0.2}>
                <DiamondSelector />
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
                <FilterSection facetValues={undefined} />
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
                <TestimonialsSection />
            </AnimatedSection>
        </div>
    );
}
