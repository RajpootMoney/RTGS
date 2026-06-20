import { Metadata } from "next";
import { notFound } from "next/navigation";
import industries from "@/data/industries.json";
import LeadForm from "@/components/LeadForm";

interface IndustryProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for static export
export function generateStaticParams() {
  return industries.map((industry) => ({
    slug: industry.slug,
  }));
}

export async function generateMetadata({ params }: IndustryProps): Promise<Metadata> {
  const { slug } = await params;
  const industry = industries.find((i) => i.slug === slug);
  if (!industry) {
    return { title: "Industry Not Found" };
  }
  return {
    title: `${industry.name} Packaging Solutions | RTGS PACK LLP`,
    description: industry.description,
    keywords: industry.keywords.join(", "),
  };
}

export default async function IndustryPage({ params }: IndustryProps) {
  const { slug } = await params;
  const industry = industries.find((i) => i.slug === slug);

  if (!industry) {
    notFound();
  }

  return (
    <div className="bg-white">
      {/* Banner */}
      <div className="bg-primary text-white py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{industry.name} Packaging Solutions</h1>
        <p className="text-xl max-w-2xl mx-auto text-gray-200">{industry.description}</p>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-accent pb-2">Customized Packaging for {industry.name}</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                The {industry.name} requires packaging solutions that are robust, precise, and capable of withstanding rigorous supply chain conditions. At RTGS PACK LLP, we specialize in delivering custom returnable and reusable packaging systems specifically tailored for this sector.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                By utilizing high-grade Polypropylene (PP) Corrugated sheets and custom ESD/Foam fitments, we ensure zero transit damage while maximizing payload efficiency.
              </p>
            </section>

            <section className="bg-gray-50 p-8 rounded-lg border border-gray-200">
              <h3 className="text-2xl font-bold text-primary mb-4">Why our solutions work</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span className="text-gray-700 text-lg font-medium">Reduced Logistics Cost via Returnable Systems</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span className="text-gray-700 text-lg font-medium">Enhanced Product Safety and Impact Resistance</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span className="text-gray-700 text-lg font-medium">Compliance with strict industry standards (e.g., ESD for Electronics)</span>
                </li>
              </ul>
            </section>

          </div>

          {/* Sidebar / Inquiry Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <LeadForm title="Discuss Your Requirements" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
