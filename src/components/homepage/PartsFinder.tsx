'use client'
import { useTranslations, useLocale } from 'next-intl'
import { useRouter } from '@/i18n/routing';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useReducer } from 'react';
import { SanitizedHTML } from '../common/SanitizedHTML';
import { Loader2 } from 'lucide-react';
import { Brand, Category } from '@/lib/woocommerce/types';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Image from 'next/image';

interface PartsFinderProps {
  brands?: Brand[];
  categories?: Category[];
}

const EMPTY_BRANDS: Brand[] = [];

type PartsFinderState = {
  selectedBrandId: string;
  selectedCategoryId: string;
  selectedModelId: string;
  partNo: string;
  categories: Category[];
  models: Category[];
  isLoadingCategories: boolean;
  isLoadingModels: boolean;
  isSearchClicked: boolean;
};

type Action =
  | { type: 'SET_BRAND'; brandId: string }
  | { type: 'SET_CATEGORY'; categoryId: string }
  | { type: 'SET_MODEL'; modelId: string }
  | { type: 'SET_PART_NO'; partNo: string }
  | { type: 'FETCH_CATEGORIES_START' }
  | { type: 'FETCH_CATEGORIES_SUCCESS'; categories: Category[] }
  | { type: 'FETCH_CATEGORIES_FAILURE' }
  | { type: 'FETCH_MODELS_START' }
  | { type: 'FETCH_MODELS_SUCCESS'; models: Category[] }
  | { type: 'FETCH_MODELS_FAILURE' }
  | { type: 'SET_SEARCH_CLICKED'; isClicked: boolean };

const initialState: PartsFinderState = {
  selectedBrandId: "",
  selectedCategoryId: "",
  selectedModelId: "",
  partNo: "",
  categories: [],
  models: [],
  isLoadingCategories: false,
  isLoadingModels: false,
  isSearchClicked: false,
};

function partsFinderReducer(state: PartsFinderState, action: Action): PartsFinderState {
  switch (action.type) {
    case 'SET_BRAND':
      return {
        ...state,
        selectedBrandId: action.brandId,
        selectedCategoryId: "",
        selectedModelId: "",
        categories: [],
        models: [],
      };
    case 'SET_CATEGORY':
      return {
        ...state,
        selectedCategoryId: action.categoryId,
        selectedModelId: "",
        models: [],
      };
    case 'SET_MODEL':
      return {
        ...state,
        selectedModelId: action.modelId,
      };
    case 'SET_PART_NO':
      return {
        ...state,
        partNo: action.partNo,
      };
    case 'FETCH_CATEGORIES_START':
      return {
        ...state,
        isLoadingCategories: true,
      };
    case 'FETCH_CATEGORIES_SUCCESS':
      return {
        ...state,
        isLoadingCategories: false,
        categories: action.categories,
      };
    case 'FETCH_CATEGORIES_FAILURE':
      return {
        ...state,
        isLoadingCategories: false,
      };
    case 'FETCH_MODELS_START':
      return {
        ...state,
        isLoadingModels: true,
      };
    case 'FETCH_MODELS_SUCCESS':
      return {
        ...state,
        isLoadingModels: false,
        models: action.models,
      };
    case 'FETCH_MODELS_FAILURE':
      return {
        ...state,
        isLoadingModels: false,
      };
    case 'SET_SEARCH_CLICKED':
      return {
        ...state,
        isSearchClicked: action.isClicked,
      };
    default:
      return state;
  }
}

const PartsFinder = ({ brands = EMPTY_BRANDS }: PartsFinderProps) => {
  const t = useTranslations("partsFinder");
  const locale = useLocale();
  const { push } = useRouter();

  const [state, dispatch] = useReducer(partsFinderReducer, initialState);
  const {
    selectedBrandId,
    selectedCategoryId,
    selectedModelId,
    partNo,
    categories,
    models,
    isLoadingCategories,
    isLoadingModels,
    isSearchClicked,
  } = state;

  const handleBrandChange = async (brandId: string) => {
    dispatch({ type: 'SET_BRAND', brandId });

    if (!brandId) return;

    dispatch({ type: 'FETCH_CATEGORIES_START' });
    try {
      const response = await fetch(`/api/parts-finder?type=categories&brandId=${brandId}&lang=${locale}`);
      if (response.ok) {
        const data = await response.json();
        dispatch({ type: 'FETCH_CATEGORIES_SUCCESS', categories: data.categories || [] });
      } else {
        console.error("Failed to fetch categories");
        dispatch({ type: 'FETCH_CATEGORIES_FAILURE' });
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      dispatch({ type: 'FETCH_CATEGORIES_FAILURE' });
    }
  };

  const handleCategoryChange = async (categoryId: string) => {
    dispatch({ type: 'SET_CATEGORY', categoryId });

    if (!categoryId || !selectedBrandId) return;

    dispatch({ type: 'FETCH_MODELS_START' });
    try {
      const response = await fetch(`/api/parts-finder?type=models&brandId=${selectedBrandId}&categoryId=${categoryId}&lang=${locale}`);
      if (response.ok) {
        const data = await response.json();
        dispatch({ type: 'FETCH_MODELS_SUCCESS', models: data.models || [] });
      } else {
        console.error("Failed to fetch models");
        dispatch({ type: 'FETCH_MODELS_FAILURE' });
      }
    } catch (error) {
      console.error("Error fetching models:", error);
      dispatch({ type: 'FETCH_MODELS_FAILURE' });
    }
  };

  const handleSearch = () => {
    if (!selectedCategoryId) return;

    dispatch({ type: 'SET_SEARCH_CLICKED', isClicked: true });

    const brand = brands.find(b => b.id.toString() === selectedBrandId);
    const category = categories.find(c => c.id.toString() === selectedCategoryId);
    const model = models.find(m => m.id.toString() === selectedModelId);

    const categorySlug = category?.slug || "";
    
    const searchParams = new URLSearchParams();
    if (brand?.slug) {
      searchParams.set("brand", brand.slug);
    }
    if (model?.slug) {
      searchParams.set("model", model.slug);
    }
    if (partNo.trim()) {
      searchParams.set("q", partNo.trim());
    }

    const queryStr = searchParams.toString();
    const basePath = `/product-category/${categorySlug}`;
    const fullPath = queryStr ? `${basePath}?${queryStr}` : basePath;

    // Navigate to the localized product category page
    push(fullPath as any);
  };

  return (
    <div className="bg-[linear-gradient(130.61deg,#263586_11.08%,#E5E9FF_106.5%)] rounded-[8px] p-5 w-full h-auto">
      <p className="text-xs text-white/80 uppercase tracking-wide mb-1 font-satoshi font-bold">
        {t("findPartsQuickly")}
      </p>
      <h2 className="text-2xl text-white font-semibold mb-2 font-serif">
        {t("partsFinder")}
      </h2>

      <p className="text-xs text-white uppercase tracking-wide mb-2 font-medium mt-10 font-satoshi">
        {t("findTheRightPart")}
      </p>

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2 w-full'>

        {/* Select Brand */}
        <div className="relative">
          <Select
            onValueChange={handleBrandChange}
            value={selectedBrandId}
          >
            <SelectTrigger icon={<Image src="/down.svg" alt="" width={12} height={12} className="size-3 pointer-events-none" />} aria-label={t("brand")} className="bg-[#1E3A8A4D] backdrop-blur-sm border border-[#93C5FD] rounded-lg w-full hover:bg-white/15 transition text-white px-3 py-2.5 text-sm [&>span]:text-white [&>span]:data-[placeholder=true]:text-white cursor-pointer">
              <SelectValue placeholder={t("brand")} />
            </SelectTrigger>
            <SelectContent>
              {brands.map((brand: Brand) => (
                <SelectItem key={brand.id} value={brand.id.toString()} aria-label={brand.name} className="cursor-pointer">
                  <SanitizedHTML content={brand.name} tag="span" />
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Select Category */}
        <div className="relative">
          <Select
            value={selectedCategoryId}
            onValueChange={handleCategoryChange}
            disabled={isLoadingCategories || !selectedBrandId}
          >
            <SelectTrigger icon={<Image src="/down.svg" alt="" width={12} height={12} className="size-3 pointer-events-none" />} aria-label={t("category")} className="bg-[#1E3A8A4D] backdrop-blur-sm border border-[#93C5FD] rounded-lg w-full hover:bg-white/15 transition text-white px-3 py-2.5 text-sm [&>span]:text-white [&>span]:data-[placeholder=true]:text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
              <SelectValue
                placeholder={isLoadingCategories ? t("loading") : t("category")}
              />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category: Category) => (
                <SelectItem key={category.id} value={category.id.toString()} aria-label={category.name} className="cursor-pointer">
                  <SanitizedHTML content={category.name} tag="span" />
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {isLoadingCategories && <Loader2 className="absolute right-10 top-1/2 -translate-y-1/2 size-4 animate-spin text-white pointer-events-none" />}
        </div>

        {/* Select Model */}
        <div className="relative">
          <Select
            onValueChange={(modelId) => dispatch({ type: 'SET_MODEL', modelId })}
            value={selectedModelId}
            disabled={isLoadingModels || !selectedCategoryId}
          >
            <SelectTrigger icon={<Image src="/down.svg" alt="" width={12} height={12} className="size-3 pointer-events-none" />} aria-label={t("engineModel")} className="bg-[#1E3A8A4D] backdrop-blur-sm border border-[#93C5FD] rounded-lg w-full hover:bg-white/15 transition text-white px-3 py-2.5 text-sm [&>span]:text-white [&>span]:data-[placeholder=true]:text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
              <SelectValue
                placeholder={
                  isLoadingModels
                    ? t("loading")
                    : models.length === 0 && selectedCategoryId
                      ? t("noModelsFound")
                      : t("engineModel")
                }
              />
            </SelectTrigger>
            <SelectContent>
              {models.map((model: Category) => (
                <SelectItem key={model.id} value={model.id.toString()} aria-label={model.name} className="cursor-pointer">
                  <SanitizedHTML content={model.name} tag="span" />
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {isLoadingModels && <Loader2 className="absolute right-10 top-1/2 -translate-y-1/2 size-4 animate-spin text-white pointer-events-none" />}
        </div>

        <Input
          placeholder={t("partNo")}
          value={partNo}
          aria-label={t("partNo")}
          onChange={(e) => dispatch({ type: 'SET_PART_NO', partNo: e.target.value })}
          className="bg-[#1E3A8A4D] backdrop-blur-sm border border-[#93C5FD] rounded-lg w-full hover:bg-white/15 transition text-white placeholder:text-white px-3 py-2.5 text-sm"
        />
      </div>

      <Button
        onClick={handleSearch}
        aria-label={t("searchParts")}
        title={t("searchParts")}
        role="button"
        disabled={isSearchClicked || !selectedCategoryId}
        className="mt-2 w-full bg-[#FF9900] hover:bg-[#e68a00] text-black font-bold rounded-lg h-[50px] uppercase tracking-wide transition disabled:cursor-not-allowed cursor-pointer flex items-center justify-center"
      >
        {isSearchClicked ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="size-5 animate-spin" />
            {t("loading")}
          </span>
        ) : (
          t("searchParts")
        )}
      </Button>

      <p className="text-xs text-black mt-2 text-center font-satoshi font-medium">
        {t("unsure")}
      </p>

    </div>
  )
}

export default PartsFinder;