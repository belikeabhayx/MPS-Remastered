import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

const BrowseCategories = () => {
  const t = useTranslations("home");
  return (
    <section className="max-w-7xl mx-auto px-4 pb-16">
      <div className="relative w-full overflow-hidden rounded-[7px] bg-[linear-gradient(135deg,#DBEAFE_0%,#BFDBFE_100%)] shadow-[0px_4px_35px_0px_#26358640] flex flex-row items-center justify-between h-auto py-5 md:py-0 md:h-[121px]">
        {/* Decorative Circle */}
        <div className="absolute rounded-full bg-[#263678] pointer-events-none hidden md:block w-[480px] h-[480px] -top-[179px] md:-right-[220px] lg:-right-[92px]" />

        {/* Left Content */}
        <div className="relative z-10 pl-5 pr-2 py-0 md:pl-12 md:py-0 h-full flex flex-col justify-center max-w-2xl md:max-w-[55%] lg:max-w-[60%] xl:max-w-2xl flex-1">
          <p className="hidden md:block text-xs font-semibold font-sans uppercase tracking-widest text-[#5D6879] mb-2">
            {t("browse.tagline")}
          </p>
          <h2 className="text-[18px] leading-snug md:text-2xl font-bold font-satoshi text-[#111827] mb-0 md:mb-2">
            {t("browse.title")}
          </h2>
          <p className="hidden md:block text-sm font-satoshi text-[#4B5563]">
            {t("browse.desc")}
          </p>
        </div>

        <div className="relative z-10 pr-4 pl-2 md:pr-12 h-full flex items-center justify-center md:items-center">
          <Link
            href={"/category"}
            className="group bg-white text-[#263678] px-4 py-2.5 md:px-6 md:py-3 rounded-lg font-semibold text-xs md:text-sm flex items-center gap-2 md:gap-3 shadow-sm hover:bg-gray-50 transition-all cursor-pointer font-satoshi whitespace-nowrap"
          >
            {t("browse.button")}
            <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BrowseCategories;
