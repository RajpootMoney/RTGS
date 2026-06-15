import { Metadata } from "next";
import Link from "next/link";
import industries from "@/data/industries.json";

export const metadata: Metadata = {
  title: "Industries We Serve | Nilanchal Packaging",
  description: "We provide specialized industrial packaging solutions for the Automobile, Electronics, Pharmaceutical, FMCG, and Logistics industries.",
};

export default function IndustriesIndex() {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-primary py-16 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Industries We Serve</h1>
        <p className="text-xl max-w-2xl mx-auto">Tailored packaging solutions for diverse industrial sectors.</p>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((industry) => (
            <div key={industry.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-fast group">
              <div className="h-40 bg-gray-100 flex items-center justify-center">
                 <span className="text-gray-400 font-semibold">{industry.name}</span>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-fast">{industry.name}</h2>
                <p className="text-gray-600 mb-6">{industry.description}</p>
                <Link 
                  href={`/industries/${industry.slug}`}
                  className="text-secondary font-bold hover:text-accent flex items-center"
                >
                  Explore Solutions <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
