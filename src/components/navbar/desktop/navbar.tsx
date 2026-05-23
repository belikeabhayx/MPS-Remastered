import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'
import LanguageSwitcher from '../../LanguageSwitcher'
import SearchInput from '../Search-Input'
import AuthButton from '../Auth-Button'
import { ShoppingCart } from "lucide-react";
import MobileNavbar from '../mobile/mobNavbar'
import NavMenu from '../client-nav-menu'

const Navbar = async () => {

    return (
        <header className="relative z-50 w-full border-b bg-white">
            {/* Desktop Navbar Row */}
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
                        <ShoppingCart />
                    </div>
                </div>
            </div>

            {/* Desktop Category Bar */}
            <NavMenu />

            {/* Mobile Navbar */}
            <Suspense fallback={<div className="h-[60px]" />}>
                <MobileNavbar />
            </Suspense>
        </header>
    )
}

export default Navbar