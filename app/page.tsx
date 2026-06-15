import Link from "next/link";
import LeadForm from "@/components/LeadForm";
import products from "@/data/products.json";
import industries from "@/data/industries.json";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white overflow-hidden py-24 lg:py-32">
        <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1587293852726-70cdb56c2866?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              PP Corrugated Box Manufacturer & Industrial Packaging Solutions
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Manufacturers of sustainable, reusable, recyclable and returnable industrial packaging solutions including PP Corrugated Boxes, PP Trays, ESD Packaging, Foam Fitments and Custom Packaging Products.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/quote" className="bg-accent text-white px-8 py-4 rounded-md font-bold text-lg text-center hover:bg-white hover:text-accent transition-fast shadow-lg">
                Get Free Quote
              </Link>
              <Link href="/contact" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-md font-bold text-lg text-center hover:bg-white hover:text-gray-900 transition-fast">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-primary text-white py-12">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold mb-2 text-accent">10+</div>
            <div className="text-sm uppercase tracking-wider font-semibold">Years Experience</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2 text-accent">500+</div>
            <div className="text-sm uppercase tracking-wider font-semibold">Clients Served</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2 text-accent">100+</div>
            <div className="text-sm uppercase tracking-wider font-semibold">Packaging Solutions</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2 text-accent">100%</div>
            <div className="text-sm uppercase tracking-wider font-semibold">Custom Manufacturing</div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">India's Trusted PP Packaging Manufacturer</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Nilanchal Packaging is a leading manufacturer of PP Corrugated Boxes, PP Trays, ESD Packaging, Foam Fitments and Industrial Packaging Solutions. We help industries reduce packaging costs through reusable, recyclable and sustainable packaging systems.
          </p>
        </div>
      </section>

      {/* Product Categories Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Industrial Packaging Products</h2>
            <div className="w-24 h-1 bg-accent mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-fast border border-gray-100">
                <div className="h-48 bg-gray-200 w-full relative">
                  {/* Placeholder for Product Image */}
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-primary mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <Link href={`/products/${product.slug}`} className="inline-block text-secondary font-semibold hover:text-accent transition-fast">
                    Learn More &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
            <div className="w-24 h-1 bg-accent mx-auto"></div>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {["Water Resistant", "Heat Resistant", "Reusable", "Recyclable", "Returnable", "Durable", "Long Life", "Non Breakable", "Protective Cushioning", "Water Repellent"].map((feature) => (
              <span key={feature} className="px-6 py-3 bg-gray-100 text-primary font-medium rounded-full shadow-sm">
                {feature}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Industries We Serve</h2>
            <div className="w-24 h-1 bg-accent mx-auto"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {industries.map((industry) => (
              <div key={industry.id} className="p-6 border border-gray-700 rounded-lg hover:border-accent hover:bg-gray-800 transition-fast cursor-pointer">
                <Link href={`/industries/${industry.slug}`}>
                  <h3 className="font-bold text-lg">{industry.name}</h3>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section className="py-20 bg-green-50 border-t-4 border-green-500">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-8">Sustainable Packaging Solutions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-bold text-lg text-green-800 mb-2">Reusable Packaging</h3>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-bold text-lg text-green-800 mb-2">Returnable Systems</h3>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-bold text-lg text-green-800 mb-2">100% Recyclable</h3>
            </div>
          </div>
          <div className="mt-8">
            <p className="text-green-800 font-medium">Eco-Friendly Manufacturing &bull; Zero Waste Approach</p>
          </div>
        </div>
      </section>

      {/* CTA / Lead Form Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Ready to upgrade your packaging?</h2>
            <p className="text-lg text-gray-700 mb-8">
              Contact us today for custom, sustainable, and heavy-duty industrial packaging solutions tailored to your specific needs.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center text-gray-700">
                <svg className="w-6 h-6 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                Fast Turnaround Time
              </li>
              <li className="flex items-center text-gray-700">
                <svg className="w-6 h-6 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                Cost Effective Solutions
              </li>
              <li className="flex items-center text-gray-700">
                <svg className="w-6 h-6 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                Pan India Delivery
              </li>
            </ul>
          </div>
          <div className="lg:w-1/2 w-full max-w-lg mx-auto">
            <LeadForm title="Request a Free Quote" />
          </div>
        </div>
      </section>
    </>
  );
}
