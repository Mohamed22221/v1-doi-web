import Image from "next/image";
import Link from "next/link";

interface FeaturedCategoryCardProps {
  title: string;
  image: string;
  href: string;
}

/**
 * FeaturedCategoryCard
 *
 * Figma node 1109:8836 (Desktop) / 1325:24824 (Mobile)
 * Full background image with radial/linear dark overlay and centered title at the bottom.
 */
export function FeaturedCategoryCard({ title, image, href }: FeaturedCategoryCardProps) {
  return (
    <Link
      href={href}
      className="group relative flex h-[160px] w-full items-end justify-center overflow-hidden rounded-[20px] transition-transform duration-300 hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none sm:h-[240px] sm:rounded-xl"
    >
      {/* Background Image */}
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
        sizes="(max-width: 640px) 50vw, 25vw"
      />

      {/* Overlay - Radial/Linear gradient to make text readable */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background: "linear-gradient(to top, #2A3D5D, #2A3D5D1A)",
        }}
      />

      {/* Category Title */}
      <span className="relative z-10 mb-4 px-2 text-center text-sm font-bold tracking-wide text-white sm:mb-6 sm:text-xl">
        {title}
      </span>
    </Link>
  );
}
