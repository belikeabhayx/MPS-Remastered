import Image from "next/image";
import { Link } from "@/i18n/routing";
import { Button } from "../ui/button";

type Props = {
  title: string;
  description?: string;
  large?: boolean;
  href: any;
  shopNowText?: string;
  lang?: string;
};

export default function CategoryCard({ title, description, large, href, shopNowText = "Shop Now", lang = "en" }: Props) {
  if (large) {
    return (
      <div className="relative rounded-[8px] bg-[#263586] text-white overflow-hidden shadow-lg w-full h-[223px]">
        {/* Decorative circle background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[280px] rounded-full bg-[#1e2a6e]" />

        {/* Left engine image */}
        <Image
          src="/hero/engine.png"
          alt="Engine"
          className="absolute bottom-[-72px] left-[-75px]"
          width={300}
          height={140}
          priority
          sizes="150px"
        />

        {/* Right engine image */}
        <Image
          src="/hero/engine.png"
          alt="Engine"
          className="absolute bottom-[-72px] right-[-85px]"
          width={300}
          height={140}
          priority
          sizes="150px"
        />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
          <h3 className={`font-serif font-light mb-6 ${lang === 'en' ? 'text-xl lg:text-[32px]' : 'text-[18px] lg:text-[24px]'}`}>
            {title}
          </h3>

          <Button asChild className="flex justify-between rounded-sm items-center bg-white text-[#263586] px-4 py-2 font-medium hover:bg-slate-100 min-w-[140px]">
            <Link href={href}>
              <span className="truncate">{shopNowText}</span> <span className="ml-2 shrink-0">→</span>
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative rounded-[8px] bg-[#263586] text-white overflow-hidden shadow-lg h-[269px]">
      <div className="relative z-10 p-6 h-full flex flex-col">
        <h3 className={`font-serif font-light mb-3 ${lang === 'en' ? 'text-xl lg:text-[24px] xl:text-[32px]' : 'text-[18px] lg:text-[20px] xl:text-[24px]'}`}>
          {title}
        </h3>

        {description && (
          <p className="text-sm mb-auto font-satoshi line-clamp-3">{description}</p>
        )}

        <Button asChild className="mt-4 w-full flex justify-between rounded-sm items-center bg-white text-indigo-700 px-4 py-2 font-medium hover:bg-slate-100">
          <Link href={href}>
            <span className="truncate">{shopNowText}</span> <span className="shrink-0">→</span>
          </Link>
        </Button>
      </div>

      <Image
        src="/hero/engine.png"
        alt="Engine"
        className="absolute top-[156px] md:top-[135px] lg:top-[156px] xl:top-[132px] left-[75px] md:left-[220px] lg:left-[75px] xl:left-[100px]"
        width={230}
        height={176}
        priority
        sizes="(max-width: 768px) 150px, 230px"
      />
    </div>
  );
}
