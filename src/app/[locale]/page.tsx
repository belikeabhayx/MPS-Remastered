import BrowseCategories from "@/components/homepage/BrowseCategories";
import LanguageSwitcher from "@/components/LanguageSwitcher";


const page = () => {
  return (
    <div>
      <LanguageSwitcher />
      <BrowseCategories/>
    </div>
  );
};

export default page;
