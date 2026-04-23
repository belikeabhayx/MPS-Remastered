'use client'
import React from 'react'
import BlogCard from './BlogCard'
import type { BlogPost } from '@/lib/woocommerce/types';
import BlogPagination from './BlogPagination';



interface BlogsHomepageProps {
  posts: BlogPost[];
  totalPages: number;
  currentPage: number;
}

const BlogsHomepage: React.FC<BlogsHomepageProps> = ({ posts, totalPages, currentPage }) => {
  return (
    <div className="w-full bg-white px-4 py-16 mb-64">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-serif text-[#263586]">
            Blogs
          </h2>
          <p className="text-[#00000099] max-w-3xl mx-auto text-sm md:text-lg">
            Oil filters for Volvo Penta, Yanmar, Vetus, Nanni and other marine
            diesel engines. Use the filters to quickly find the correct filter
            for your engine and keep your oil system in top condition.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 lg:gap-y-28 mb-16">
          {posts.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 py-20">
              No blogs found.
            </div>
          ) : (
            posts.map((post) => <BlogCard key={post.id} post={post} />)
          )}
        </div>

        {/* Pagination */}
     <BlogPagination currentPage={currentPage} totalPages={totalPages} />
      </div>
    </div>
  );
}

export default BlogsHomepage
