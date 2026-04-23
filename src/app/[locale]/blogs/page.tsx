import { fetchBlogs } from '@/lib/woocommerce/blogs'
import BlogsHomepage from './components/BlogHomepage'
import { getLocale } from 'next-intl/server';

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
        </div>
    )
}

export default Blogspage