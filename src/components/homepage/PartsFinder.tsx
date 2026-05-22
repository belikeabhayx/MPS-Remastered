'use client'
import { useTranslations } from 'next-intl'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useState } from 'react';
import { SanitizedHTML } from '../common/SanitizedHTML';
import { Loader2 } from 'lucide-react';
import { Brand, Category } from '@/lib/woocommerce/types';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

interface PartsFinderProps {
  brands?: Brand[];
  categories?: Category[];
}

const PartsFinder = ({ brands = [], categories = [] }: PartsFinderProps) => {
  const t = useTranslations("partsFinder");

  const [selectedBrandId, setSelectedBrandId] = useState<string>("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [selectedModelId, setSelectedModelId] = useState<string>("");
  const isLoadingBrands = false;
  const isLoadingCategories = false;
  const isLoadingModels = false;

  const handleBrandChange = (value: string) => {
    setSelectedBrandId(value)
  }

  const handleCategoryChange = (value: string) => {
    setSelectedCategoryId(value);
  };


  console.log(brands)

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

        {/* Select One */}
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

        {/* Select Two */}
        <div className="relative">
          <Select
            value={selectedCategoryId}
            onValueChange={handleCategoryChange}
            disabled={isLoadingCategories}
          >
            <SelectTrigger icon={<img src="/down.svg" alt="" className="size-3 pointer-events-none" />} aria-label={t("brand")} className="bg-[#1E3A8A4D] backdrop-blur-sm border border-[#93C5FD] rounded-lg w-full hover:bg-white/15 transition text-white px-3 py-2.5 text-sm [&>span]:text-white [&>span]:data-[placeholder=true]:text-white">
              <SelectValue
                placeholder={isLoadingCategories ? t("loading") : t("category")}
              />
            </SelectTrigger>
            <SelectContent>
              {categories?.map((category: Category) => (
                <SelectItem key={category.id} value={category.id.toString()} aria-label={category.name}>
                  <SanitizedHTML content={category.name} tag="span" />
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {isLoadingCategories && <Loader2 className="absolute right-10 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-white pointer-events-none" />}
        </div>

        {/* Select Three */}
        <div className="relative">
          <Select
            onValueChange={setSelectedModelId}
            value={selectedModelId}
            disabled={isLoadingModels}
          >
            <SelectTrigger icon={<img src="/down.svg" alt="" className="size-3 pointer-events-none" />} aria-label={t?.engineModel || "Engine / model"} className="bg-[#1E3A8A4D] backdrop-blur-sm border border-[#93C5FD] rounded-lg w-full hover:bg-white/15 transition text-white px-3 py-2.5 text-sm [&>span]:text-white [&>span]:data-[placeholder=true]:text-white">
              <SelectValue
                placeholder={
                  isLoadingModels
                    ? (t?.loading || "Loading...")
                    : models.length === 0 && selectedCategoryId
                      ? "No models found"
                      : (t?.engineModel || "Engine / model")
                }
              />
            </SelectTrigger>
            <SelectContent>
              {models?.map((model: Category) => (
                <SelectItem key={model.id} value={model.id.toString()} aria-label={model.name}>
                  <SanitizedHTML content={model.name} tag="span" />
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {isLoadingModels && <Loader2 className="absolute right-10 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-white pointer-events-none" />}
        </div>

        <Input
          placeholder={t?.partNo || "Part no. (optional)"}
          value={partNo}
          aria-label={t?.partNo || "Part no. (optional)"}
          onChange={(e) => setPartNo(e.target.value)}
          className="bg-[#1E3A8A4D] backdrop-blur-sm border border-[#93C5FD] rounded-lg w-full hover:bg-white/15 transition text-white placeholder:text-white px-3 py-2.5 text-sm"
        />
      </div>

      {/* <Button
        onClick={handleSearch}
        aria-label={t?.searchParts || "Search Parts"}
        title={t?.searchParts || "Search Parts"}
        role="button"
        disabled={isSearchClicked}
        className="mt-2 w-full bg-[#FF9900] hover:bg-[#e68a00] text-black font-bold rounded-lg h-[50px] uppercase tracking-wide transition disabled:cursor-not-allowed"
      >
        {isSearchClicked ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin" />
            {t?.loading || "Loading..."}
          </span>
        ) : (
          t?.searchParts || "Search Parts"
        )}
      </Button>

      <p className="text-xs text-black mt-2 text-center">
        {t?.unsure || "Unsure? Send us a photo of your engine"} <br className="block md:hidden" />{" "}
        {t?.unsure ? "" : "plate – we will help you."}
      </p> */}

    </div>
  )
}

export default PartsFinder