import Image from 'next/image'
import Link from 'next/link'
import React, { Suspense } from 'react'
import LanguageSwitcher from '../LanguageSwitcher'
import { CarTaxiFront } from 'lucide-react'
import SearchInput from './Search-Input'
import AuthButton from './Auth-Button'
import { ShoppingCart } from "lucide-react";

const Navbar = () => {
    return (
        <header className="relative z-50 w-full border-b bg-white lg:h-[78px]">
            <div className="hidden xl:flex mx-auto h-[78px] max-w-7xl items-center justify-between px-6">

                {/* Logo */}
                <div className="flex items-center gap-2">
                    <Link href="/">
                        <Image
                            src="/logo.png"
                            alt="MPS"
                            width={132}
                            height={53}
                            className="h-[53px] w-[132px]"
                            priority
                        />
                    </Link>
                </div>


                <div className="flex items-center gap-6">

                    {/* Language Selector */}
                    <LanguageSwitcher />

                    {/* Search */}
                    <Suspense fallback={<div className="w-[337px] h-[39px]" />}>
                        <SearchInput />
                    </Suspense>

                    {/* Icons */}
                    <div className="flex items-center gap-6 text-blue-900">
                        <AuthButton />

                        {/* <button className="hover:text-blue-600">
              <Heart className="h-5 w-5" />
            </button> */}

                        <ShoppingCart />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Navbar