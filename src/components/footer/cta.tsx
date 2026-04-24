import Image from 'next/image'

interface CTAProps {
  background?: string;
}

import { getTranslations } from 'next-intl/server';
import { Mail, Phone } from 'lucide-react';

const CTA = async ({ background = '#F57C00' }: CTAProps) => {
  const t = await getTranslations("footer");
  return (
    <div className="container mx-auto px-4 absolute -top-92 md:-top-60 left-1/2 -translate-x-1/2 z-20 max-w-7xl h-[286px]">
      <div
        className="rounded-lg p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 shadow-xl w-full mx-auto overflow-hidden"
        style={{ background }}
      >
        {/* Image Section */}
        <div className="shrink-0 relative w-32 h-32 md:w-48 md:h-48">
          {/* Circle Image Wrapper - Using a placeholder color since we don't have the image */}
          <div className="w-full h-full rounded-full overflow-hidden relative">
            <Image
              src="/footer/pic.avif"
              alt="Support"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Text Section */}
        <div className="flex-1 text-center md:text-left space-y-4">
          <h2 className="text-2xl md:text-4xl font-serif text-[#1E2548] leading-tight">
            {t('cta.title')}
          </h2>
          <p className="text-[#000000] text-sm md:text-base max-w-2xl font-satoshi">
            {t('cta.description')}
          </p>
          <div className="flex flex-row gap-4 items-center justify-center w-full lg:w-1/2 mt-2">
            <a
              href="tel:+31682439981"
              className="flex-1
                        bg-[#263586] text-white 
                        p-4 md:p-5 xl:w-64
                        rounded-xl font-medium 
                        hover:bg-blue-900 transition-colors 
                        flex items-center justify-center"
            >
              <Phone size={24} className="shrink-0" />
            </a>

            <a
              href="mailto:info@marinepartsystem.com"
              className="flex-1 
                        bg-transparent border-2 border-[#263586] text-[#263586] 
                        p-4 md:p-5 xl:w-64
                        rounded-xl font-medium 
                        hover:bg-blue-50 transition-colors 
                        flex items-center justify-center"
            >
              <Mail size={24} className="shrink-0" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CTA