import { SanitizedHTML } from '@/components/common/SanitizedHTML';
import { Card } from '@/components/ui/card';
import { BlogPost } from '@/lib/woocommerce/types';
import Image from 'next/image';
import Link from 'next/link';

interface BlogCardProps {
    post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {

    // Extract data from the post object
    const title = post.title.rendered;

    // Title for safe rendering
    const sanitizedTitle = title;

    const description = post.excerpt.rendered.replace(/<[^>]+>/g, ''); // Remove HTML tags from excerpt
    const slug = post.slug;

    // Extract image
    const image = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/default.png'; // Fallback image

    // Extract author
    const authorName = post._embedded?.author?.[0]?.name || 'Unknown Author';
    const authorAvatar = post._embedded?.author?.[0]?.avatar_urls?.['96'] || '/default-avatar.png'; // Fallback avatar

    // Format date
    const date = new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <Link href={`/blogs/${slug}`} className="block h-full">
            <Card className="border-none shadow-none bg-transparent w-full h-full group">
                {/* Image Container */}
                <div className="relative w-full aspect-4/3 rounded-sm overflow-hidden mb-4 bg-gray-100">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </div>

                {/* Content */}
                <div className="flex flex-col gap-2">
                    <SanitizedHTML
                        tag="h3"
                        className="text-2xl font-satoshi font-medium leading-tight text-gray-900 group-hover:text-[#2e3b84] transition-colors"
                        content={sanitizedTitle}
                    />

                    <p className="text-lg font-satoshi font-medium text-gray-500 line-clamp-2">
                        {description}
                    </p>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2">
                        <div className="relative w-6 h-6 rounded-full overflow-hidden">
                            <Image
                                src={authorAvatar}
                                alt={authorName}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <span className="text-lg font-satoshi">{authorName}</span>
                    </div>
                    <span className="text-lg font-satoshi text-[#00000099]">{date}</span>
                </div>
            </Card>
        </Link>
    )
}

export default BlogCard