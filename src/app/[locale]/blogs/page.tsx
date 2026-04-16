import { fetchBlogs } from '@/lib/woocommerce/blogs'
import BlogsHomepage from './components/BlogHomepage'

const Blogspage = async () => {
    const [{ posts, totalPages }] = await Promise.all([fetchBlogs()])


    return (
        <div>
            <BlogsHomepage posts={posts} totalPages={totalPages} currentPage={0} />
        </div>
    )
}

export default Blogspage