import Link from "next/link";
import Image from "next/image";

// Constants
import { USER_CATEGORY_IMAGE } from "@/app/lib/constants";

// Components
import { GlowingCard } from "@/app/ui/cards/glowing-cards";

export default function Categories({ categories }: any) {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 py-2 xl:py-0 px-2 md:px-4">
      {categories.map((item: any) => (
        <Link
          key={item.id}
          href={
            item.name === "IT"
              ? "/login"
              : `/softwares/windows?userCategory=${item.id}`
          }
          className="relative group rounded-xl border border-white/20 bg-blue-700 overflow-hidden 
             shadow-md hover:shadow-lg hover:shadow-blue-400/30 
             transition-all duration-300 ease-in-out hover:-translate-y-1"
        >
          <GlowingCard
            title={item.name === "IT" ? "Admin / IT" : item.name}
            cardHeight="h-[200px] xl:h-[250px]"
          >
            <Image
              src={USER_CATEGORY_IMAGE[item.name] || "/images/default_cat.jpg"}
              alt="img"
              width={1000}
              height={100}
              className="w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-105"
            />

            {/* Fade-in overlay */}
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Optional subtle gradient at bottom for text readability */}
            <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
          </GlowingCard>
        </Link>
      ))}
    </div>
  );
}
