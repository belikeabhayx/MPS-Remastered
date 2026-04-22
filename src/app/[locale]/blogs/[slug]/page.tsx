import { fetchBlogsBySlug } from '@/lib/woocommerce/blogs';
import Image from 'next/image';

interface PageProps {
  params: Promise<{ slug: string }>
}

const page = async ({ params }: PageProps) => {

  const { slug } = await params;
  const post = await fetchBlogsBySlug(slug);

  const featuredImage = post?._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/default.png';

  return (
    <div>
      {/* Hero Image */}
      <div className="w-full max-w-7xl px-4 md:px-6 mx-auto mb-12">
        <div className="w-full h-[250px] sm:h-[400px] lg:h-[523px] rounded-[24px] relative overflow-hidden border border-gray-200">
          <Image src={featuredImage} alt='blog header image' fill/>
        </div>
      </div>
    </div>
  );
}

export default page