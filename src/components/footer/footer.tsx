import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { Facebook, Linkedin } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import CTA from './cta';

interface FooterProps {
    ctaBackground?: string;
}

const Footer = async ({ ctaBackground }: FooterProps) => {
    const t = await getTranslations("footer");

    return (
        <footer className="relative" style={{ background: 'linear-gradient(180deg, #263586 0%, #090D20 100%)' }}>
            {/* Orange CTA Card */}
            <CTA background={ctaBackground} />

            {/* Main Footer Content */}
            <div className="container mx-auto px-4 pt-40 pb-8 text-white max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8 lg:gap-12 mb-16">
                    {/* Column 1: Brand & Info */}
                    <div className="space-y-6">
                        <div className="relative w-[209px] h-[84px]">
                            {/* Logo */}
                            <Image
                                src="/logo.png"
                                alt="MPS"
                                className="object-contain brightness-0 invert"
                                fill
                                sizes="(max-width: 768px) 100vw, 33vw"
                            />
                        </div>
                        <p className="text-sm leading-relaxed max-w-xs font-satoshi">
                            {t('specialists')}
                        </p>

                        <div className="space-y-1 text-sm text-gray-300 font-satoshi">
                            <p><span className="font-semibold text-white">{t('phone')}</span> <a href="tel:+31682439981" className="hover:text-white transition-colors">+31 6 8243 9981</a></p>
                            <p><span className="font-semibold text-white">{t('email')}</span> <a href="mailto:info@marinepartsystem.com" className="hover:text-white transition-colors">info@marinepartsystem.com</a></p>
                            <p><span className="font-semibold text-white">{t('coc')}</span> 83128069 | <span className="font-semibold text-white">{t('vat')}</span> NL003779297B32</p>
                        </div>

                        <div className="flex gap-4">
                            <Link href="#" aria-label="Facebook" className="w-8 h-8 rounded-full bg-white text-[#1E2548] flex items-center justify-center hover:bg-gray-200 transition-colors">
                                <Facebook size={16} fill="currentColor" />
                            </Link>
                            <Link href="#" aria-label="LinkedIn" className="w-8 h-8 rounded-full bg-white text-[#1E2548] flex items-center justify-center hover:bg-gray-200 transition-colors">
                                <Linkedin size={16} fill="currentColor" />
                            </Link>
                            <Link href="#" aria-label="X" className="w-8 h-8 rounded-full bg-white text-[#1E2548] flex items-center justify-center hover:bg-gray-200 transition-colors">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </Link>
                        </div>
                    </div>

                    {/* Column 2: Shop by Brand */}
                    <div>
                        <h3 className="text-xl font-serif mb-6">{t('shopByBrand')}</h3>
                        <ul className="space-y-3 text-gray-300 text-sm font-satoshi">
                            <li><Link href={`/product-category/volvo-penta`} className="hover:text-white transition-colors">Volvo Penta Parts</Link></li>
                            <li><Link href={`/product-category/yanmar`} className="hover:text-white transition-colors">Yanmar Parts</Link></li>
                            <li><Link href={`/product-category/nanni`} className="hover:text-white transition-colors">Nanni Parts</Link></li>
                            <li><Link href={`/product-category/vetus`} className="hover:text-white transition-colors">Vetus Parts</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Customer Service */}
                    <div>
                        <h3 className="text-xl font-serif mb-6">{t('quickLinks')}</h3>
                        <ul className="space-y-3 text-gray-300 text-sm font-satoshi">
                            <li><Link href={`/privacy-policy`} className="hover:text-white transition-colors">{t('privacyPolicy')}</Link></li>
                            <li><Link href={`/terms-conditions`} className="hover:text-white transition-colors">{t('termsConditions')}</Link></li>
                            <li><Link href={`/payment-delivery`} className="hover:text-white transition-colors">{t('paymentDelivery')}</Link></li>
                            <li><Link href={`/right-of-withdrawal`} className="hover:text-white transition-colors">{t('rightOfWithdrawal')}</Link></li>
                            <li><Link href={`/legal-notice`} className="hover:text-white transition-colors">{t('legalNotice')}</Link></li>
                            <li><Link href={`/cookie-policy`} className="hover:text-white transition-colors">{t('cookiePolicy')}</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Addresses */}
                    <div>
                        <h3 className="text-xl font-serif mb-6">{t('addresses')}</h3>
                        <div className="space-y-4 text-gray-300 text-sm font-satoshi">
                            <div>
                                <p className="font-semibold text-white mb-1">{t('mainAddress')}</p>
                                <p>Seeaster 10, 9051 VG Stiens, Friesland, Netherlands.</p>
                            </div>
                            <div>
                                <p className="font-semibold text-white mb-1">{t('returnAddress')}</p>
                                <p>Ljipstritte 10, 9051 AS Stiens, Friesland, Netherlands.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Bottom Strip */}
                <div className="border-t-2 border-[#FFFFFF] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm font-satoshi">©2025 MarinePartSystem. {t('allRightsReserved')}.</p>
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-satoshi">{t('deliveryPartner')}</span>
                        <div className="rounded h-8 w-20 relative flex items-center justify-center">
                            {/* DHL Placeholder */}
                            <Image src="/footer/dhl.png" alt="DHL" width={100} height={100} />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;