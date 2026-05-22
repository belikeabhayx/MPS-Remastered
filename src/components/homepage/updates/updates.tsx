import { getTranslations } from "next-intl/server";
import UpdatesForm from "./UpdatesForm";

export default async function Updates() {

  const t = await getTranslations("home");
  return (
    <div className="w-full max-w-[954px] min-h-[249px] flex justify-center bg-white mx-auto mt-8 md:mt-12 lg:mt-20 mb-12 md:mb-24 lg:mb-36 px-4 sm:px-6">
      <div className="bg-[#F8F9FF] border border-[#26358633] w-full rounded-[16px] px-6 sm:px-8 py-8 sm:py-10 lg:py-0 text-center flex flex-col items-center justify-center">
        <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-serif font-medium text-gray-950 mb-2 tracking-tight">
          {t("updates.title")}
        </h2>
        <p className="text-[#64748B] mb-6 max-w-lg text-sm sm:text-base font-normal leading-relaxed font-satoshi px-4">
          {t("updates.desc")}
        </p>
        <UpdatesForm 
          placeholder={t("updates.placeholder")} 
          buttonText={t("updates.button")} 
        />
      </div>
    </div>
  );
}
