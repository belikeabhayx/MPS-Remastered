'use client'
import { useTranslations } from 'next-intl'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useState } from 'react';
import { SanitizedHTML } from '../common/SanitizedHTML';
import { Loader2 } from 'lucide-react';
import { Brand } from '@/lib/woocommerce/types';

interface PartsFinderProps {
  brands?: Brand[];
}

const PartsFinder = ({ brands = [] }: PartsFinderProps) => {
  const t = useTranslations("partsFinder");

  const [selectedBrandId, setSelectedBrandId] = useState<string>("");
  const isLoadingBrands = false;

  const handleBrandChange = (value: string) => {
    setSelectedBrandId(value)
  }

  return (
    <div className="bg-[linear-gradient(130.61deg,#263586_11.08%,#E5E9FF_106.5%)] rounded-[8px] p-5 w-full h-auto">
      <p className="text-xs text-white/80 uppercase tracking-wide mb-1">
        {t("findPartsQuickly")}
      </p>
      <h2 className="text-2xl text-white font-semibold mb-2">
        {t("partsFinder")}
      </h2>

      <p className="text-xs text-white uppercase tracking-wide mb-2 font-medium mt-10">
        {t("findTheRightPart")}
      </p>

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2 w-full'>
        <div className="relative">
          <Select
            onValueChange={handleBrandChange}
            value={selectedBrandId}
            disabled={isLoadingBrands}
          >
            <SelectTrigger icon={<img src="/down.svg" alt="" className="size-3 pointer-events-none" />} aria-label={t("brand")} className="bg-[#1E3A8A4D] backdrop-blur-sm border border-[#93C5FD] rounded-lg w-full hover:bg-white/15 transition text-white px-3 py-2.5 text-sm [&>span]:text-white [&>span]:data-[placeholder=true]:text-white">
              <SelectValue placeholder={isLoadingBrands ? t("loading") : t("brand")} />
            </SelectTrigger>
            <SelectContent>
              {brands.map((brand: Brand) => (
                <SelectItem key={brand.id} value={brand.id.toString()} aria-label={brand.name}>
                  <SanitizedHTML content={brand.name} tag="span" />
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {isLoadingBrands && <Loader2 className="absolute right-10 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-white pointer-events-none" />}
        </div>

      </div>

    </div>
  )
}

export default PartsFinder