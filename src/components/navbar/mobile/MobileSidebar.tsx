"use client";

import React, { useState } from "react";
import {
    User,
    Search,
    ChevronRight,
    BookOpen,
    HelpCircle,
    FileText,
    Headphones
} from "lucide-react";
import { Link, categoryHref } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { buildMenuItems, staticMenuStructure } from "@/lib/menu-translations";
import { MenuItem } from "../client-nav-menu";

interface Dictionary {
    mobile?: {
        searchProducts?: string;
        helpInfo?: string;
        account?: string;
        aboutUs?: string;
        contactUs?: string;
        buyingGuide?: string;
        knowledgeBase?: string;
    };
    blogs?: {
        title?: string;
        description?: string;
    };
    [key: string]: any;
}

interface MobileSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const MobileSidebar = ({ isOpen, onClose }: MobileSidebarProps) => {
    const locale = useLocale();
    const t = useTranslations();
    const items = buildMenuItems(staticMenuStructure, locale);
    const [expandedKeys, setExpandedKeys] = useState<Record<string, boolean>>({});

    const toggleExpand = (key: string) => {
        setExpandedKeys(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 z-40"
                        onClick={onClose}
                    />

                    {/* Sidebar */}
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ type: "tween", duration: 0.3 }}
                        className="fixed top-0 left-0 w-[85%] max-w-[320px] h-full bg-white z-50 overflow-y-auto text-[#0F0F0F] flex flex-col shadow-xl"
                    >
                        {/* Header / Logo */}
                        <div className="p-5 pb-0 flex items-center justify-between">
                            <Link href="/" onClick={onClose}>
                                <img
                                    src="/logo.png"
                                    alt="MPS"
                                    className="h-[40px] w-auto object-contain"
                                />
                            </Link>

                        </div>

                        {/* Search Bar */}
                        <div className="px-5 mt-6">
                            <div className="relative w-full">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                placeholder={t("mobile.searchProducts")}
                                    className="w-full bg-[#FAFAFC] border border-[#F1F1F5] rounded-lg pl-10 pr-4 py-2.5 text-sm outline-none placeholder:text-gray-400 focus:border-blue-300"
                                />
                            </div>
                        </div>

                        {/* Main Navigation */}
                        <div className="px-5 mt-8 flex flex-col">
                            {items.filter(item => item.key !== "about-us" && item.key !== "contact-us" && item.key !== "blogs").map((item, index) => {
                                const hasChildren = item.items && item.items.length > 0;
                                const isExpanded = expandedKeys[item.key || item.name];

                                return (
                                    <div key={item.key || index} className="flex flex-col border-b border-gray-100 last:border-none">
                                        <div className="flex items-center justify-between py-3">
                                        <Link
                                                href={item.href
                                                    ? item.href.startsWith('/product-category')
                                                        ? categoryHref(item.href, locale)
                                                        : (item.href as any)
                                                    : "/"}
                                                onClick={onClose}
                                                className="flex-1 text-[16px] font-medium text-[#0F0F0F]"
                                            >
                                                {item.name}
                                            </Link>
                                            {hasChildren && (
                                                <button
                                                    onClick={() => toggleExpand(item.key || item.name)}
                                                    className="p-1"
                                                >
                                                    <ChevronRight className={`w-5 h-5 text-[#0F0F0F] transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                                                </button>
                                            )}
                                        </div>

                                        {/* Sub menu */}
                                        <AnimatePresence>
                                            {hasChildren && isExpanded && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="pl-4 overflow-hidden flex flex-col"
                                                >
                                                    {item.items!.filter((subItem: MenuItem) => subItem.key !== "about-us" && subItem.key !== "contact-us").map((subItem: MenuItem, subIndex: number) => (
                                                        <Link
                                                            key={subItem.key || subIndex}
                                                            href={subItem.href
                                                                ? subItem.href.startsWith('/product-category')
                                                                    ? categoryHref(subItem.href, locale)
                                                                    : (subItem.href as any)
                                                                : "/"}
                                                            onClick={onClose}
                                                            className="py-2 text-[14px] text-gray-600 hover:text-[#2b2f7f]"
                                                        >
                                                            {subItem.name}
                                                        </Link>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Help & Info Section */}
                        <div className="px-5 mt-8">
                            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                                {t("mobile.helpInfo")}
                            </h3>
                            <div className="flex flex-col">
                                <Link
                                    href="/my-account"
                                    onClick={onClose}
                                    className="flex items-center gap-3 py-3 text-[16px] font-medium text-[#0F0F0F]"
                                >
                                    <User className="w-5 h-5" />
                                    {t("mobile.account")}
                                </Link>
                                <Link
                                    href="/blogs"
                                    onClick={onClose}
                                    className="flex items-center gap-3 py-3 text-[16px] font-medium text-[#0F0F0F]"
                                >
                                    <FileText className="w-5 h-5" />
                                    {t("mobile.blogs")}
                                </Link>
                                <Link
                                    href="/about-us"
                                    onClick={onClose}
                                    className="flex items-center gap-3 py-3 text-[16px] font-medium text-[#0F0F0F]"
                                >
                                    <BookOpen className="w-5 h-5" />
                                    {t("mobile.aboutUs")}
                                </Link>
                                <Link
                                    href="/contact-us"
                                    onClick={onClose}
                                    className="flex items-center gap-3 py-3 text-[16px] font-medium text-[#0F0F0F]"
                                >
                                    <HelpCircle className="w-5 h-5" />
                                    {t("mobile.contactUs")}
                                </Link>

                                {/* <Link
                                    href="#"
                                    onClick={onClose}
                                    className="flex items-center gap-3 py-3 text-[16px] font-medium text-[#0F0F0F]"
                                >
                                    <FileText className="w-5 h-5" />
                                    {t?.buyingGuide || "Buying Guide"}
                                </Link> */}
                                {/* <Link
                                    href="/knowledge-base"
                                    onClick={onClose}
                                    className="flex items-center gap-3 py-3 text-[16px] font-medium text-[#0F0F0F]"
                                >
                                    <Headphones className="w-5 h-5" />
                                    {t?.knowledgeBase || "Knowledge Base"}
                                </Link> */}
                            </div>
                        </div>

                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default MobileSidebar;
