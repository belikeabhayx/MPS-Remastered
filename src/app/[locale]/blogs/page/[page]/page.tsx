import { fetchBlogs } from '@/lib/woocommerce/blogs'
import BlogsHomepage from '../../components/BlogHomepage'
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { setRequestLocale } from 'next-intl/server';

export async function generateStaticParams() {
  const params: { locale: string; page: string }[] = [];

  for (const locale of routing.locales) {
    const { totalPages } = await fetchBlogs(1, 9, locale);
    // Pre-render the first 5 pages, others will be rendered on demand
    const pagesToPreRender = Math.min(totalPages, 5);
    for (let i = 2; i <= pagesToPreRender; i++) {
      params.push({ locale, page: i.toString() });
    }
  }

  return params;
}

interface Props {
  params: Promise<{ locale: string; page: string }>
}

const BlogsPage = async ({ params }: Props) => {
  const { page, locale } = await params;
  setRequestLocale(locale);
  const pageNumber = parseInt(page, 10);

  if (isNaN(pageNumber) || pageNumber < 2) return notFound();

  const { posts, totalPages } = await fetchBlogs(pageNumber, 9, locale);

  if (pageNumber > totalPages) return notFound();

  return (
    <div>
      <BlogsHomepage
        posts={posts}
        totalPages={totalPages}
        currentPage={pageNumber}
      />
    </div>
  );
}

export default BlogsPage;