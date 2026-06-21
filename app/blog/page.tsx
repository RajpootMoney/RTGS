import { Metadata } from "next";
import { getBlogs } from "@/app/admin/actions";
import BlogCatalogClient from "@/components/BlogCatalogClient";

export const metadata: Metadata = {
  title: "Insights & Industrial Packaging Blog | RTGS PACK LLP",
  description: "Explore expert guides, industry updates, and design tips on PP Corrugated Boxes, ESD anti-static packaging, and closed-loop logistics systems.",
  keywords: "PP Corrugated Box Manufacturer, Industrial Packaging Blog, ESD Packaging, Reusable Packaging Guide",
};

export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Header */}
      <div className="bg-primary py-20 text-center text-white relative overflow-hidden">
        {/* Glow decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-secondary/30 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Insights & Industry Updates</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-200 px-4">
          Expert articles on industrial packaging design, sustainability roadmaps, and custom logistics solutions.
        </p>
      </div>

      {/* Interactive Catalog */}
      <BlogCatalogClient blogs={blogs} />
    </div>
  );
}
