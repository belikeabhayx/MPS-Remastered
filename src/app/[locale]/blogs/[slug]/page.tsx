import { fetchBlogsBySlug, fetchBlogs } from '@/lib/woocommerce/blogs';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import BlogSideBar from '../components/BlogSideBar';
import { SanitizedHTML } from '@/components/common/SanitizedHTML';
import { extractHeadings } from '@/lib/parse-headings';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];

  for (const locale of routing.locales) {
    // Fetch a reasonable number of recent blogs to pre-render
    const { posts } = await fetchBlogs(1, 20, locale);
    for (const post of posts) {
      params.push({ locale, slug: post.slug });
    }
  }

  return params;
}

interface PageProps {
  params: Promise<{ slug: string, locale: string }>
}

const page = async ({ params }: PageProps) => {

  const { slug, locale } = await params;
  setRequestLocale(locale);
  const post = await fetchBlogsBySlug(slug, locale);

  if (!post) notFound();

  const featuredImage = post?._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/default.png';

  const date = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const authorName = post._embedded?.author?.[0]?.name || 'marinepartsystem.com';

  const { content, headings } = extractHeadings(post.content.rendered);

  return (
    <div className='font-sans mt-4 md:mt-5 mb-56'>
      {/* Hero Image */}
      <div className="w-full max-w-7xl px-4 md:px-6 mx-auto mb-12">
        <div className="w-full h-[250px] sm:h-[400px] lg:h-[523px] rounded-[24px] relative overflow-hidden border border-gray-200">
          <Image src={featuredImage} alt='blog header image' fill
            className="object-contain"
            priority />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 md:gap-12 pb-20">
        {/* Sidebar Navigation */}
        <aside className="hidden lg:block">
          <div className="sticky top-[100px] border border-[#26358626] shadow-[0px_4px_35px_0px_#2635861A] bg-white p-4 rounded-lg max-h-[calc(100vh-120px)] overflow-y-auto custom-scrollbar">
            <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-6">Navigate</h3>
            <nav className="space-y-4">
              <BlogSideBar headings={headings} />
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="prose md:prose-lg max-w-none text-gray-700">
          <SanitizedHTML
            tag="h1"
            className="text-3xl md:text-5xl font-serif text-black mb-6 leading-tight"
            content={post.title.rendered}
          />

          <div className="flex items-center gap-4 mb-8 text-sm text-gray-500">
            <span>{date}</span>
            <span>•</span>
            <span>By {authorName}</span>
          </div>

          <SanitizedHTML
            className="text-lg leading-relaxed mb-8 blog-content"
            content={content}
          />
        </main>
      </div>
    </div>
  );
}

export default page