import { fetchBlogs } from '@/lib/woocommerce/blogs'
import BlogsHomepage from '../../components/BlogHomepage'
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { setRequestLocale } from 'next-intl/server';

export async function generateStaticParams() {
  const results = await Promise.all(
    routing.locales.map(async (locale) => {
      const { totalPages } = await fetchBlogs(1, 9, locale);
      const pagesToPreRender = Math.min(totalPages, 5);
      const localParams = [];
      for (let i = 2; i <= pagesToPreRender; i++) {
        localParams.push({ locale, page: i.toString() });
      }
      return localParams;
    })
  );

  return results.flat();
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