import { Metadata } from "next";
import { notFound } from "next/navigation";
import products from "@/data/products.json";
import LeadForm from "@/components/LeadForm";

interface ProductProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for static export
export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: ProductProps): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) {
    return { title: "Product Not Found" };
  }
  return {
    title: `${product.name} Manufacturer | Nilanchal Packaging`,
    description: product.description,
    keywords: product.keywords.join(", "),
  };
}

export default async function ProductPage({ params }: ProductProps) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="bg-white">
      {/* Product Banner */}
      <div className="bg-gray-900 text-white py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{product.name}</h1>
        <p className="text-xl max-w-2xl mx-auto text-gray-300">{product.description}</p>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Product Gallery Placeholder */}
            <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center border border-gray-200">
              <span className="text-gray-500 font-semibold text-xl">{product.name} Main Image</span>
            </div>

            {/* Product Overview */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-gray-100 pb-2">Product Overview</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Our {product.name} are designed to provide the highest level of protection and efficiency for your industrial packaging needs. Manufactured using premium grade materials, they offer exceptional durability and sustainability.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                As a leading manufacturer, Nilanchal Packaging ensures that every batch meets stringent quality standards, delivering a returnable and reusable solution that reduces your overall packaging costs.
              </p>
            </section>

            {/* Key Features */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-gray-100 pb-2">Key Features</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {product.features.map(feature => (
                  <div key={feature} className="flex items-start">
                    <svg className="w-6 h-6 text-accent mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <span className="text-gray-800 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Specifications Table Placeholder */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-gray-100 pb-2">Specifications</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-100 text-gray-700">
                      <th className="py-3 px-4 border border-gray-200 font-bold">Parameter</th>
                      <th className="py-3 px-4 border border-gray-200 font-bold">Details</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr>
                      <td className="py-3 px-4 border border-gray-200 font-medium">Material</td>
                      <td className="py-3 px-4 border border-gray-200">High-grade Polypropylene (PP) / Specialized Foam</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="py-3 px-4 border border-gray-200 font-medium">Dimensions</td>
                      <td className="py-3 px-4 border border-gray-200">100% Customizable based on requirements</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 border border-gray-200 font-medium">Durability</td>
                      <td className="py-3 px-4 border border-gray-200">High impact resistance, long life cycle</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="py-3 px-4 border border-gray-200 font-medium">Eco-Friendly</td>
                      <td className="py-3 px-4 border border-gray-200">100% Recyclable and Reusable</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Applications & Benefits */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Benefits</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Significant cost reduction over time</li>
                  <li>Maximum protection during transit</li>
                  <li>Space-saving and stackable designs</li>
                  <li>Zero-waste packaging footprint</li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Industries Served</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Automobile & Auto Components</li>
                  <li>Electronics & IT Hardware</li>
                  <li>Pharmaceuticals</li>
                  <li>FMCG & Logistics</li>
                </ul>
              </div>
            </section>

          </div>

          {/* Sidebar / Inquiry Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <LeadForm title={`Inquire About ${product.name}`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
