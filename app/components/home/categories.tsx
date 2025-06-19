import Link from "next/link";
import Image from "next/image";

// Components
import { GlowingCard } from "@/app/ui/cards/glowing-cards";
import { USER_CATEGORY_IMAGE } from "@/app/lib/constants";

export default function Categories({ categories }: any) {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 py-2 xl:py-0 px-4">
      {categories.map((item: any) => (
        <Link
          key={item.id}
          href={
            item.name === "IT"
              ? "/login"
              : `/softwares/windows?userCategory=${item.id}`
          }
          className="relative rounded-md bg-blue-700 overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105"
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
              className="w-full h-full transition-transform duration-300 ease-in-out"
            />
          </GlowingCard>
        </Link>
      ))}
    </div>
  );
}
