import { fetchBlogs } from '@/lib/woocommerce/blogs'
import BlogsHomepage from './components/BlogHomepage'
import { getLocale } from 'next-intl/server';
import Footer from '@/components/footer/footer';

const Blogspage = async () => {

    const locale = await getLocale(); // e.g. "en", "nl", "de"

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