import BlogCarousel from "@/components/homepage/blogs/page";
import BrowseCategories from "@/components/homepage/BrowseCategories";
import PopularCategories from "@/components/homepage/category";
import FeaturedProduct from "@/components/homepage/featuredProduct";
import Hero from "@/components/homepage/Hero";
import Inventory from "@/components/homepage/inventory/inventory";
import TestimonialsSection from "@/components/homepage/testimonials";
import TrustCompanies from "@/components/homepage/trust";
import Updates from "@/components/homepage/updates/updates";

const page = () => {
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
      {/* <BlogCarousel initialPosts={[]} /> */}
    </div>
  );
};

export default page;
