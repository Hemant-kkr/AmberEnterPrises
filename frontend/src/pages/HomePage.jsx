import MainLayout from "../layout/MainLayout.jsx";
import HeroSection from "../components/Home/HeroSection.jsx";
import Featured from "../components/Home/Featured.jsx";
import BulkOrder from '../components/Home/BulkOrder.jsx'
import ProductForm from "../features/seller/components/ProductForm.jsx";
function HomePage() {
  return (
       <>
      <HeroSection />
      <Featured />
      <BulkOrder />
    </>
  );
}
export default HomePage;
