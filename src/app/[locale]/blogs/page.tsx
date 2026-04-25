import { fetchBlogs } from '@/lib/woocommerce/blogs'
import BlogsHomepage from './components/BlogHomepage'
import Footer from '@/components/footer/footer';

interface PageProps {
    params: Promise<{ locale: string }>
}

const Blogspage = async ({ params }: PageProps) => {

    const { locale } = await params; // e.g. "en", "nl", "de"

    const [{ posts, totalPages }] = await Promise.all([fetchBlogs(1, 9, locale)])


    return (
        <div>
            <BlogsHomepage
                posts={posts}
                totalPages={totalPages}
                currentPage={1}
            />
            <Footer />
        </div>
    )
}

export default Blogspage