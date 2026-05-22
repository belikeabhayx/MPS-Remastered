'use client'
import { useState } from "react";
import Link from "next/link";
import { ChevronRight, ChevronDown } from "lucide-react";
import { translateHref } from "@/i18n/routing";



export type MenuItem = {
  name: string;
  href?: string;
  key?: string;
  items?: MenuItem[];
};

export default function NavMenu({ currentLang = 'en', items }: { currentLang?: string; items: MenuItem[] }) {
  return (
    <nav className="hidden xl:block bg-[#2b3a8f] h-[50px]">
      <div className="mx-auto max-w-7xl px-7 h-full flex items-center">
        <ul className="flex items-center gap-3 text-white text-sm font-medium z-50">
          {items.map((menu) => (
            <NavNode key={menu.key ?? menu.name} item={menu} depth={0} currentLang={currentLang} />
          ))}
        </ul>
      </div>
    </nav>
  );
}

function NavNode({ item, depth, currentLang }: { item: MenuItem; depth: number; currentLang: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.items && item.items.length > 0;

  return (
    <li
      className={`relative ${depth === 0 ? "h-full flex items-center" : ""}`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {item.href ? (
        <Link
          href={translateHref(item.href, currentLang)}
          className={`flex items-center gap-1 transition-colors ${depth > 0
            ? "text-gray-700 hover:bg-gray-50 hover:text-[#2b3a8f] w-full block px-4 py-2 text-sm"
            : "hover:text-gray-200 h-full px-2"
            }`}
        >
          {item.name}
          {item.items && (
            <span className="text-xs opacity-70">
              {depth === 0 ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </span>
          )}
        </Link>
      ) : (
        <div
          className={`flex items-center gap-1 cursor-pointer transition-colors ${depth > 0
            ? "justify-between text-gray-700 hover:bg-gray-50 hover:text-[#2b3a8f] px-4 py-2 w-full text-sm"
            : "hover:text-gray-200 h-full px-2"
            }`}
        >
          {item.name}
          {item.items && (
            <span className="text-xs opacity-70">
              {depth === 0 ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </span>
          )}
        </div>
      )}

      {/* Dropdown - using CSS transitions instead of framer-motion */}
      {hasChildren && (
        <ul
          className={`absolute bg-white shadow-xl border border-gray-100 min-w-[240px] z-50 py-1
            transition-all duration-150 ease-out
            ${depth === 0 ? "left-0 top-full mt-0 pt-1" : "left-full top-0 ml-0"}
            ${isOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"}
          `}
          style={{ marginTop: depth === 0 ? '0' : '-1px' }}
        >
          {isOpen && item.items!.map((subItem) => (
            <NavNode key={subItem.key ?? subItem.name} item={subItem} depth={depth + 1} currentLang={currentLang} />
          ))}
        </ul>
      )}
    </li>
  );
}
