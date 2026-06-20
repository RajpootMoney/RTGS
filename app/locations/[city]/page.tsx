import { Metadata } from "next";
import { notFound } from "next/navigation";
import locations from "@/data/locations.json";
import LeadForm from "@/components/LeadForm";

interface LocationProps {
  params: Promise<{ city: string }>;
}

// Generate static params for static export
export function generateStaticParams() {
  return locations.map((city) => ({
    city: city.toLowerCase(),
  }));
}

export async function generateMetadata({ params }: LocationProps): Promise<Metadata> {
  const { city } = await params;
  const cityIndex = locations.findIndex((c) => c.toLowerCase() === city.toLowerCase());
  if (cityIndex === -1) {
    return { title: "Location Not Found" };
  }
  const cityName = locations[cityIndex];
  
  return {
    title: `PP Box Manufacturer in ${cityName} | RTGS PACK LLP`,
    description: `Leading PP Box Manufacturer in ${cityName}. We supply sustainable, heavy-duty industrial packaging solutions including PP Corrugated Boxes and Trays.`,
    keywords: `PP Box Manufacturer in ${cityName}, Industrial Packaging ${cityName}, PP Corrugated Boxes ${cityName}`,
  };
}

export default async function LocationPage({ params }: LocationProps) {
  const { city } = await params;
  const cityIndex = locations.findIndex((c) => c.toLowerCase() === city.toLowerCase());
  
  if (cityIndex === -1) {
    notFound();
  }
  
  const cityName = locations[cityIndex];

  return (
    <div className="bg-white">
      {/* Hero */}
      <div className="bg-gray-900 text-white py-24 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">PP Box Manufacturer in {cityName}</h1>
        <p className="text-xl max-w-3xl mx-auto text-gray-300">
          Delivering Premium Industrial Packaging and PP Corrugated Solutions to Businesses in {cityName}.
        </p>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12 text-gray-700 text-lg leading-relaxed">
            
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-accent pb-2">Your Trusted Packaging Partner in {cityName}</h2>
              <p className="mb-4">
                As industrial manufacturing and logistics continue to expand in {cityName}, the demand for robust, reliable, and sustainable packaging solutions has never been higher. RTGS PACK LLP stands as a leading <strong>PP Box Manufacturer in {cityName}</strong>, dedicated to serving the diverse needs of local industries.
              </p>
              <p className="mb-4">
                We specialize in customized Polypropylene (PP) Corrugated Boxes, PP Trays, ESD Packaging, and Foam Fitments. Our products are engineered to provide maximum protection for your goods while ensuring long-term reusability, ultimately lowering your packaging costs.
              </p>
            </section>

            <section className="bg-gray-50 p-8 rounded-lg border border-gray-200">
              <h3 className="text-2xl font-bold text-primary mb-4">Why Businesses in {cityName} Choose Us</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 text-xl">✔</span>
                  <span><strong>100% Customization:</strong> We design packaging precisely to your product specifications.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 text-xl">✔</span>
                  <span><strong>Sustainable & Recyclable:</strong> Our PP Corrugated solutions are eco-friendly, supporting your sustainability goals.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 text-xl">✔</span>
                  <span><strong>Durability:</strong> Water-resistant, heat-resistant, and non-breakable designs ideal for heavy-duty industrial use.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 text-xl">✔</span>
                  <span><strong>Timely Delivery:</strong> Efficient supply chain ensuring your operations in {cityName} are never delayed.</span>
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Core Products for {cityName} Industries</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 p-6 rounded-lg">
                  <h4 className="font-bold text-xl text-primary mb-2">PP Corrugated Boxes</h4>
                  <p className="text-base text-gray-600">Reusable, heavy-duty boxes replacing traditional paper corrugated and wooden packaging.</p>
                </div>
                <div className="border border-gray-200 p-6 rounded-lg">
                  <h4 className="font-bold text-xl text-primary mb-2">PP Trays & Partitions</h4>
                  <p className="text-base text-gray-600">Custom insert separators for automotive and electronic components.</p>
                </div>
                <div className="border border-gray-200 p-6 rounded-lg">
                  <h4 className="font-bold text-xl text-primary mb-2">ESD Packaging</h4>
                  <p className="text-base text-gray-600">Anti-static packaging for sensitive electronic manufacturing hubs in {cityName}.</p>
                </div>
                <div className="border border-gray-200 p-6 rounded-lg">
                  <h4 className="font-bold text-xl text-primary mb-2">Foam Fitments</h4>
                  <p className="text-base text-gray-600">EPE protective cushioning for safe transit of fragile goods.</p>
                </div>
              </div>
            </section>

          </div>

          {/* Sidebar / Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <LeadForm title={`Get a Quote in ${cityName}`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
