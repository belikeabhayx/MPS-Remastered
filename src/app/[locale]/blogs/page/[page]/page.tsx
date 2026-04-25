import { fetchBlogs } from '@/lib/woocommerce/blogs'
import BlogsHomepage from '../../components/BlogHomepage'
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ locale: string; page: string }>
}

const BlogsPage = async ({ params }: Props) => {
  const { page, locale } = await params;
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