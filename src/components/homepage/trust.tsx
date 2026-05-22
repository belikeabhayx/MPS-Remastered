import { useTranslations } from 'next-intl'
import Image from 'next/image'

const TrustCompanies = () => {
    const companies = [
        { name: 'Volvo Penta', src: '/trust/volvo.png', width: 150, height: 86 },
        { name: 'Yanmar', src: '/trust/yanmar.png', width: 150, height: 86 },
        { name: 'Vetus', src: '/trust/vetus.png', width: 150, height: 86 },
        { name: 'Nanni', src: '/trust/nani.png', width: 150, height: 86 },
    ]

    const t = useTranslations("home")

    return (
        <section className="max-w-7xl mx-auto w-full py-16 bg-white lg:mt-10">
            <div className="container mx-auto px-4">
                <h2 className="text-center font-satoshi text-gray-500 text-md font-medium tracking-wider uppercase mb-12">
                    {t("trust")}
                </h2>

                <div className="flex items-center justify-between gap-6">
                    {companies.map((company) => (
                        <div
                            key={company.name}
                            className="relative h-8 w-20 sm:w-24 md:w-32 lg:w-40"
                        >
                            <Image
                                src={company.src}
                                alt={company.name}
                                width="150"
                                height="86"
                                className="object-contain"
                                sizes="(max-width: 768px) 128px, 160px"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default TrustCompanies