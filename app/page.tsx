import Link from "next/link";
import LeadForm from "@/components/LeadForm";
import products from "@/data/products.json";
import industries from "@/data/industries.json";
import Counter from "@/components/Counter";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gray-950 text-white overflow-hidden py-28 lg:py-36">
        <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1587293852726-70cdb56c2866?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center animate-zoom-bg z-0"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-900/85 to-transparent z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-gradient-light drop-shadow-md">
              PP Corrugated Box Manufacturer & Industrial Packaging Solutions
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300 leading-relaxed font-light">
              Manufacturers of sustainable, reusable, recyclable and returnable industrial packaging solutions including PP Corrugated Boxes, PP Trays, ESD Packaging, Foam Fitments and Custom Packaging Products.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/quote" className="bg-accent text-white px-8 py-4 rounded-md font-bold text-lg text-center hover:bg-white hover:text-accent hover:scale-105 active:scale-95 hover:shadow-accent/40 hover:shadow-2xl transition-all duration-300 shadow-lg">
                Get Free Quote
              </Link>
              <Link href="/contact" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-md font-bold text-lg text-center hover:bg-white hover:text-gray-900 hover:scale-105 active:scale-95 hover:shadow-white/20 hover:shadow-2xl transition-all duration-300">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-primary text-white py-14 shadow-lg relative z-10">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center animate-fade-in-up delay-100">
          <div className="p-4 rounded-xl hover:scale-105 hover:bg-white/5 transition-all duration-300 group cursor-default">
            <div className="text-4xl md:text-5xl font-bold mb-2 text-accent transition-all duration-300 group-hover:scale-110 group-hover:text-white drop-shadow-sm">
              <Counter value={10} suffix="+" />
            </div>
            <div className="text-sm uppercase tracking-wider font-semibold opacity-90 group-hover:opacity-100">Years Experience</div>
          </div>
          <div className="p-4 rounded-xl hover:scale-105 hover:bg-white/5 transition-all duration-300 group cursor-default">
            <div className="text-4xl md:text-5xl font-bold mb-2 text-accent transition-all duration-300 group-hover:scale-110 group-hover:text-white drop-shadow-sm">
              <Counter value={500} suffix="+" />
            </div>
            <div className="text-sm uppercase tracking-wider font-semibold opacity-90 group-hover:opacity-100">Clients Served</div>
          </div>
          <div className="p-4 rounded-xl hover:scale-105 hover:bg-white/5 transition-all duration-300 group cursor-default">
            <div className="text-4xl md:text-5xl font-bold mb-2 text-accent transition-all duration-300 group-hover:scale-110 group-hover:text-white drop-shadow-sm">
              <Counter value={100} suffix="+" />
            </div>
            <div className="text-sm uppercase tracking-wider font-semibold opacity-90 group-hover:opacity-100">Packaging Solutions</div>
          </div>
          <div className="p-4 rounded-xl hover:scale-105 hover:bg-white/5 transition-all duration-300 group cursor-default">
            <div className="text-4xl md:text-5xl font-bold mb-2 text-accent transition-all duration-300 group-hover:scale-110 group-hover:text-white drop-shadow-sm">
              <Counter value={100} suffix="%" />
            </div>
            <div className="text-sm uppercase tracking-wider font-semibold opacity-90 group-hover:opacity-100">Custom Manufacturing</div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4 max-w-4xl text-center animate-fade-in-up delay-200">
          <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-6 pb-2 inline-block">India&apos;s Trusted PP Packaging Manufacturer</h2>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-light max-w-3xl mx-auto">
            RTGS PACK LLP is a leading manufacturer of PP Corrugated Boxes, PP Trays, ESD Packaging, Foam Fitments and Industrial Packaging Solutions. We help industries reduce packaging costs through reusable, recyclable and sustainable packaging systems.
          </p>
        </div>
      </section>

      {/* Product Categories Section */}
      <section className="py-24 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-gradient">Our Industrial Packaging Products</h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => {
              const delays = ["delay-100", "delay-200", "delay-300", "delay-400", "delay-500", "delay-600"];
              const delayClass = delays[index % delays.length];
              return (
                <ScrollReveal key={product.id} delayClass={delayClass} className="h-full">
                  <div className="bg-white rounded-xl shadow-premium hover:shadow-premium-hover hover:-translate-y-2.5 hover:border-secondary/20 transition-all duration-500 ease-out border border-gray-100 flex flex-col h-full group">
                    <div className="h-48 bg-gray-100 w-full relative overflow-hidden flex items-center justify-center text-gray-400 group-hover:bg-gray-50 transition-all duration-500">
                      {/* Placeholder for Product Image */}
                      <div className="absolute inset-0 flex items-center justify-center text-gray-400 group-hover:text-primary group-hover:scale-110 transition-all duration-500">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold text-primary mb-2 transition-colors duration-300 group-hover:text-secondary">{product.name}</h3>
                      <p className="text-gray-600 mb-6 flex-grow">{product.description}</p>
                      <Link href={`/products/${product.slug}`} className="inline-block text-secondary font-semibold hover:text-accent hover:translate-x-2 transition-all duration-300 self-start">
                        Learn More &rarr;
                      </Link>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-gradient">Why Choose Us</h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
          </div>
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up delay-200">
            {["Water Resistant", "Heat Resistant", "Reusable", "Recyclable", "Returnable", "Durable", "Long Life", "Non Breakable", "Protective Cushioning", "Water Repellent"].map((feature) => (
              <span key={feature} className="px-6 py-3 bg-gray-50 text-primary font-semibold rounded-full shadow-sm hover:shadow-md hover:shadow-primary/10 hover:bg-primary hover:text-white hover:scale-105 active:scale-95 cursor-default transition-all duration-300">
                {feature}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-24 bg-gray-950 text-white relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient-light">Industries We Serve</h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-accent to-secondary mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center animate-fade-in-up delay-200">
            {industries.map((industry) => (
              <div key={industry.id} className="p-6 border border-gray-800 rounded-xl hover:border-accent/40 hover:bg-gray-900 hover:scale-105 active:scale-98 transition-all duration-300 cursor-pointer hover:shadow-xl hover:shadow-accent/10 group">
                <Link href={`/industries/${industry.slug}`}>
                  <h3 className="font-bold text-lg group-hover:text-accent transition-colors duration-300">{industry.name}</h3>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section className="py-24 bg-gradient-to-b from-green-50 to-emerald-50/50 border-t-4 border-emerald-500">
        <div className="container mx-auto px-4 text-center max-w-4xl animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold text-emerald-950 mb-8 hover:scale-[1.01] transition-transform duration-300">Sustainable Packaging Solutions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in-up delay-200">
            <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-premium hover:shadow-premium-hover hover:-translate-y-1.5 hover:border-emerald-200 hover:bg-white transition-all duration-300 border border-transparent">
              <h3 className="font-bold text-lg text-green-800 mb-2">Reusable Packaging</h3>
            </div>
            <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-premium hover:shadow-premium-hover hover:-translate-y-1.5 hover:border-emerald-200 hover:bg-white transition-all duration-300 border border-transparent">
              <h3 className="font-bold text-lg text-green-800 mb-2">Returnable Systems</h3>
            </div>
            <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-premium hover:shadow-premium-hover hover:-translate-y-1.5 hover:border-emerald-200 hover:bg-white transition-all duration-300 border border-transparent">
              <h3 className="font-bold text-lg text-green-800 mb-2">100% Recyclable</h3>
            </div>
          </div>
          <div className="mt-10 animate-fade-in-up delay-300">
            <p className="text-green-800 font-semibold tracking-wide text-lg">Eco-Friendly Manufacturing &bull; Zero Waste Approach</p>
          </div>
        </div>
      </section>

      {/* CTA / Lead Form Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/2 animate-fade-in-up delay-100">
            <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-6">Ready to upgrade your packaging?</h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Contact us today for custom, sustainable, and heavy-duty industrial packaging solutions tailored to your specific needs.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center text-gray-700 hover:translate-x-1.5 transition-all duration-300">
                <svg className="w-6 h-6 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                Fast Turnaround Time
              </li>
              <li className="flex items-center text-gray-700 hover:translate-x-1.5 transition-all duration-300">
                <svg className="w-6 h-6 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                Cost Effective Solutions
              </li>
              <li className="flex items-center text-gray-700 hover:translate-x-1.5 transition-all duration-300">
                <svg className="w-6 h-6 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                Pan India Delivery
              </li>
            </ul>
          </div>
          <div className="lg:w-1/2 w-full max-w-lg mx-auto animate-fade-in-up delay-200 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 rounded-xl">
            <LeadForm title="Request a Free Quote" />
          </div>
        </div>
      </section>
    </>
  );
}
