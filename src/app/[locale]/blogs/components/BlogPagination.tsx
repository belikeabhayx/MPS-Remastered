"use client";

import React from 'react'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { usePathname, useSearchParams } from 'next/navigation';

interface BlogPaginationProps {
    currentPage: number;
    totalPages: number;
}

const BlogPagination: React.FC<BlogPaginationProps> = ({ currentPage, totalPages }) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const createPageURL = (pageNumber: number | string) => {
        const segments = pathname.split('/');
        // Find 'blogs' in segments to determine the base blogs path
        const blogsIndex = segments.indexOf('blogs');
        
        if (blogsIndex === -1) {
            // Fallback to query params if 'blogs' is not in the path (shouldn't happen here)
            const params = new URLSearchParams(searchParams);
            params.set('page', pageNumber.toString());
            return `${pathname}?${params.toString()}`;
        }

        const basePath = segments.slice(0, blogsIndex + 1).join('/');
        let newPath = basePath;
        
        if (Number(pageNumber) > 1) {
            newPath = `${basePath}/page/${pageNumber}`;
        }

        // Preserve other search params but remove 'page' if it exists there
        const params = new URLSearchParams(searchParams);
        params.delete('page');
        
        const queryString = params.toString();
        return queryString ? `${newPath}?${queryString}` : newPath;
    };

    // Logic to generate page numbers to display
    const generatePaginationItems = () => {
        const pages: (number | string)[] = [];

        if (totalPages <= 7) {
            // If 7 or fewer pages, show all
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Complex logic for > 7 pages
            if (currentPage <= 4) {
                // Near start: 1, 2, 3, 4, 5, ..., total
                for (let i = 1; i <= 5; i++) {
                    pages.push(i);
                }
                pages.push('ellipsis');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 3) {
                // Near end: 1, ..., total-4, total-3, total-2, total-1, total
                pages.push(1);
                pages.push('ellipsis');
                for (let i = totalPages - 4; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                // Middle: 1, ..., current-1, current, current+1, ..., total
                pages.push(1);
                pages.push('ellipsis');
                pages.push(currentPage - 1);
                pages.push(currentPage);
                pages.push(currentPage + 1);
                pages.push('ellipsis');
                pages.push(totalPages);
            }
        }
        return pages;
    };

    const pages = generatePaginationItems();

    if (totalPages <= 1) return null;

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href={currentPage > 1 ? createPageURL(currentPage - 1) : '#'}
                        className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                </PaginationItem>

                {pages.map((page, index) => {
                    if (page === 'ellipsis') {
                        return (
                            <PaginationItem key={`ellipsis-${index}`}>
                                <PaginationEllipsis />
                            </PaginationItem>
                        );
                    }

                    return (
                        <PaginationItem key={page}>
                            <PaginationLink
                                href={createPageURL(page)}
                                isActive={currentPage === page}
                            >
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    );
                })}

                <PaginationItem>
                    <PaginationNext
                        href={currentPage < totalPages ? createPageURL(currentPage + 1) : '#'}
                        className={currentPage >= totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}

export default BlogPagination
