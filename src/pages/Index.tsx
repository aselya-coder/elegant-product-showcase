import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import TestimonialPreview from "@/components/home/TestimonialPreview";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturedProducts />
      <WhyChooseUs />
      <TestimonialPreview />
      <CTASection />
    </Layout>
  );
};

export default Index;
