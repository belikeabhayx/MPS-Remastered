import { getTranslations } from 'next-intl/server';


const UpperStrip = async ({ lang }: { lang?: string }) => {
  const t = await getTranslations("upperStrip")

  return (
    <div className='hidden xl:flex h-[27px] text-white bg-gray-950 justify-center items-center font-normal'>{t('freeShipping')}</div>
  )
}

export default UpperStrip