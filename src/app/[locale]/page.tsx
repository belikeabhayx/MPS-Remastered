import BlogCarousel, { BlogPostCarouselItem } from "@/components/homepage/blogs/page";
import BrowseCategories from "@/components/homepage/BrowseCategories";
import PopularCategories from "@/components/homepage/category";
import Hero from "@/components/homepage/Hero";
import Inventory from "@/components/homepage/inventory/inventory";
import TestimonialsSection from "@/components/homepage/testimonials";
import TrustCompanies from "@/components/homepage/trust";
import Updates from "@/components/homepage/updates/updates";
import { fetchBlogs } from "@/lib/woocommerce/blogs";
import { setRequestLocale } from "next-intl/server";

interface PageProps {
  params: Promise<{ locale: string }>;
}

const page = async ({ params }: PageProps) => {
  const { locale } = await params;
  setRequestLocale(locale);

  let initialPosts: BlogPostCarouselItem[] = [];
  try {
    const { posts } = await fetchBlogs(1, 10, locale);
    initialPosts = posts.map((post) => ({
      id: post.id,
      title: post.title.rendered,
      image: post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/default.png",
      link: `/blogs/${post.slug}`,
    }));
  } catch (error) {
    console.error("Error fetching blog posts for homepage:", error);
  }

  return (
    <div>
      <div className="bg-[#F7F8FB]">
        <Hero />
        <BrowseCategories />
      </div>
      <TrustCompanies />
      {/* <FeaturedProduct products={[]} /> */}
      <PopularCategories />
      <TestimonialsSection />
      <Updates />
      <Inventory />
      <BlogCarousel initialPosts={initialPosts} />
    </div>
  );
};

export default page;
