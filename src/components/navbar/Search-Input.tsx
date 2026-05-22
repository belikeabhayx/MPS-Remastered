import { Search } from 'lucide-react'


const SearchInput = () => {
    return (
        <div className="relative hidden md:block h-[39px] w-[337px]">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
            <input
                type="text"
                placeholder='Search for products...'
                aria-label="Search for products"
                className="w-full rounded-md border bg-gray-50 py-2 pl-10 pr-4 text-sm outline-none focus:border-blue-500"
            />
        </div>
    )
}

export default SearchInput