import { getTranslations } from "next-intl/server";
import InventoryClient from "./inventory-client";

const DEFAULT_VALUES = [
  {
    id: "01",
    title: "Extensive Inventory",
    description:
      "At MarinePartSystem, we take pride in maintaining one of the most extensive inventories of marine engine parts. Every item we stock is carefully inspected for wear, leaks, and reliability to ensure you get only the highest quality components. Our parts meet or exceed OEM specifications, giving you the confidence that your vessel will perform at its best—trip after trip.",
  },
  {
    id: "02",
    title: "Quality Assurance",
    description:
      "Our rigorous quality assurance process ensures that every part we sell meets or exceeds industry standards. We perform detailed inspections and testing to guarantee reliability and performance for your marine engines.",
  },
  {
    id: "03",
    title: "Fast Global Shipping",
    description:
      "We understand that downtime costs money. That's why we offer fast, reliable shipping to ports and marinas worldwide. Our logistics partners ensure your parts arrive on time, wherever you are.",
  },
  {
    id: "04",
    title: "Expert Support",
    description:
      "Our team consists of experienced marine engineers and parts specialists who are ready to assist you. From part identification to installation advice, we are here to support you every step of the way.",
  },
];

export default async function Inventory() {
  const t = await getTranslations("home");
  
  const titles = t.raw("inventory.titles") as string[];
  const descriptions = t.raw("inventory.descriptions") as string[];
  const valuesLabel = t("inventory.values") || "Our Values";

  const values = DEFAULT_VALUES.map((item, index) => ({
    ...item,
    title: titles?.[index] || item.title,
    description: descriptions?.[index] || item.description,
  }));

  return (
    <section className="bg-white max-w-7xl mx-auto mb-0 lg:mb-30 xl:mb-36">
      <div className="flex flex-col lg:flex-row w-full mx-auto lg:items-center lg:gap-8">
        <InventoryClient values={values} valuesLabel={valuesLabel} />
      </div>
    </section>
  );
}
