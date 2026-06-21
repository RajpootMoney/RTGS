import { Metadata } from "next";
import Link from "next/link";
import LeadForm from "@/components/LeadForm";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Smart Shipping & Logistics Solutions | RTGS PACK LLP",
  description: "Durable PP Corrugated Box subscription, rental packaging, damaged box replacement, and pan-India doorstep shipment solutions for industries.",
  keywords: "Logistics Packaging, PP Corrugated Box Rental, Packaging Subscription, Returnable Packaging, Damaged Box Replacement, Doorstep Shipment",
};

export default function ShippingLogistics() {
  const services = [
    {
      title: "Subscription Plan",
      tagline: "Uninterrupted Supply Chain",
      description: "Regular supply of packaging boxes with flexible monthly & yearly plans.",
      details: "Ensure your operations never run dry. Align box deliveries with your monthly production schedules, scale up or down as needed, and enjoy bulk subscription discounts.",
      icon: (
        <svg className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "Rental Packaging",
      tagline: "Pay Per Use",
      description: "Reusable PP boxes available on rent for transportation & storage.",
      details: "Zero capital expenditure. Rent heavy-duty PP corrugated boxes for short-term projects or seasonal spikes, reducing warehouse clutter when not in use.",
      icon: (
        <svg className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
        </svg>
      )
    },
    {
      title: "Damaged Box Replacement",
      tagline: "Eco-Loop Replacement",
      description: "Quick replacement support for damaged or unusable boxes.",
      details: "Full lifecycle support. If a box gets damaged during transit or operations, we collect and swap it for a fresh one. We recycle the old box, ensuring zero waste.",
      icon: (
        <svg className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89H18" />
        </svg>
      )
    },
    {
      title: "Doorstep Shipment",
      tagline: "Pan India Delivery Network",
      description: "Safe and timely delivery directly to your warehouse or factory.",
      details: "Seamless doorstep transport. We manage the freight logistics to bring packaging and materials safely to your factory floor or logistics hub exactly when you need them.",
      icon: (
        <svg className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
        </svg>
      )
    }
  ];

  const highlights = [
    { title: "Reusable PP Corrugated Boxes", desc: "Designed for over 100+ logistics loops, vastly outperforming cardboard." },
    { title: "Cost-Effective Logistics Solutions", desc: "Lower total cost of ownership through durability and rental pricing options." },
    { title: "Eco-Friendly Packaging", desc: "Made from 100% recyclable PP material, supporting a circular economy." },
    { title: "Pan India Delivery", desc: "Reliable logistics partners to transport boxes directly to any factory location." },
    { title: "Durable & Lightweight Products", desc: "High impact resistance with minimal weight to reduce freight costs." },
    { title: "Custom Packaging Solutions", desc: "Engineered specifically for your parts, dimensions, and inner fitment requirements." }
  ];

  const industries = [
    {
      name: "Automobile",
      desc: "Custom returnable boxes and trays engineered for heavy component handling.",
      icon: (
        <svg className="w-12 h-12 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 17h5l1.5-4h5.5l1.5 4h1a2 2 0 002-2v-3a2 2 0 00-2-2h-3.86a2 2 0 01-1.4-.58l-2.48-2.48A2 2 0 0010.34 8H5a2 2 0 00-2 2v5a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      name: "FMCG",
      desc: "Hygenic, water-resistant boxes suitable for retail transport and storage loops.",
      icon: (
        <svg className="w-12 h-12 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      )
    },
    {
      name: "Electronics",
      desc: "Antistatic ESD-safe boxes and inserts to protect sensitive components.",
      icon: (
        <svg className="w-12 h-12 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 5h10a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2z" />
        </svg>
      )
    },
    {
      name: "Warehousing",
      desc: "Nestable and stackable crates optimizing vertical rack storage limits.",
      icon: (
        <svg className="w-12 h-12 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
    {
      name: "Manufacturing",
      desc: "Tough materials-handling containers built to withstand heavy shopfloor usage.",
      icon: (
        <svg className="w-12 h-12 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      )
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gray-950 text-white overflow-hidden py-24 lg:py-32">
        <div 
          className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center animate-zoom-bg z-0"
          style={{ transformOrigin: "center" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-900/90 to-transparent z-0"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl animate-fade-in-up">
            <span className="inline-block px-4 py-1.5 bg-accent/20 border border-accent/40 text-accent font-semibold text-sm rounded-full mb-6 uppercase tracking-wider animate-float-bounce">
              Safe. Reusable. Reliable.
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-gradient-light">
              Smart Shipping & Logistics Solutions
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-3xl mb-8 font-light">
              We provide complete packaging & logistics solutions with durable PP Corrugated Boxes for industries across India.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#services" className="bg-primary text-white border border-primary px-8 py-4 rounded-md font-bold text-lg text-center hover:bg-secondary hover:border-secondary hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg">
                Explore Services
              </a>
              <a href="#contact-quote" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-md font-bold text-lg text-center hover:bg-white hover:text-gray-900 hover:scale-105 active:scale-95 transition-all duration-300">
                Request Free Plan Quote
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-gray-50 border-b border-gray-100 scroll-mt-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-gradient">Our Logistics & Packaging Services</h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg">
              Flexible options to buy, rent, subscribe, or manage returnable industrial packaging loops efficiently.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((svc, index) => {
              const delays = ["delay-100", "delay-200", "delay-300", "delay-400"];
              return (
                <ScrollReveal key={svc.title} delayClass={delays[index]} className="h-full">
                  <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-premium hover:shadow-premium-hover hover:-translate-y-1.5 hover:border-secondary/20 transition-all duration-500 flex flex-col h-full group">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-4 bg-gray-50 group-hover:bg-accent/10 rounded-xl transition-colors duration-300">
                        {svc.icon}
                      </div>
                      <div>
                        <span className="text-xs uppercase tracking-wider text-secondary font-bold">{svc.tagline}</span>
                        <h3 className="text-2xl font-bold text-primary group-hover:text-secondary transition-colors duration-300">{svc.title}</h3>
                      </div>
                    </div>
                    <p className="text-gray-800 font-semibold mb-3 text-lg leading-snug">{svc.description}</p>
                    <p className="text-gray-600 leading-relaxed text-base flex-grow">{svc.details}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-gradient">Why Choose Us</h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg">
              Unlock logistics efficiencies with high-performance packaging designed to survive the toughest loops.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {highlights.map((hl, index) => {
              const delays = ["delay-100", "delay-200", "delay-300", "delay-400", "delay-500", "delay-600"];
              return (
                <ScrollReveal key={hl.title} delayClass={delays[index % delays.length]}>
                  <div className="p-6 bg-gray-50/50 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:bg-white hover:border-accent/30 transition-all duration-300 group flex items-start gap-4 h-full">
                    <div className="p-1.5 bg-emerald-50 text-emerald-600 rounded-full flex-shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-primary mb-2 group-hover:text-secondary transition-colors duration-300">{hl.title}</h4>
                      <p className="text-gray-600 leading-relaxed text-sm">{hl.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Industries We Serve Section */}
      <section className="py-24 bg-gray-950 text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-gray-950 to-black z-0"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient-light">Industries We Serve</h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-accent to-secondary mx-auto rounded-full"></div>
            <p className="mt-4 text-gray-400 max-w-2xl mx-auto text-lg">
              Tailored, application-specific returnable packaging loops across multiple industrial domains.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {industries.map((ind, index) => {
              const delays = ["delay-100", "delay-200", "delay-300", "delay-400", "delay-500"];
              return (
                <ScrollReveal key={ind.name} delayClass={delays[index]} className="h-full">
                  <div className="p-6 bg-gray-900/60 border border-gray-800 rounded-2xl hover:border-accent/40 hover:bg-gray-900 hover:scale-105 transition-all duration-300 flex flex-col h-full text-center items-center group shadow-xl">
                    <div className="mb-4 p-3 bg-gray-800 rounded-xl group-hover:bg-accent/10 transition-colors duration-300">
                      {ind.icon}
                    </div>
                    <h3 className="font-bold text-xl text-white group-hover:text-accent transition-colors duration-300 mb-3">{ind.name}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed flex-grow">{ind.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA & Lead Form Section */}
      <section id="contact-quote" className="py-24 bg-white scroll-mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2">
              <ScrollReveal delayClass="delay-100">
                <span className="inline-block px-4 py-1.5 bg-secondary/10 text-secondary font-bold text-sm rounded-full mb-6 uppercase tracking-wider">
                  Optimize Your Supply Chain
                </span>
                <h2 className="text-3xl md:text-5xl font-bold text-gradient leading-tight mb-6">
                  Smarter Packaging.<br />Faster Deliveries.
                </h2>
                <p className="text-xl text-gray-700 font-light mb-8 leading-relaxed">
                  Reliable packaging and logistics solutions designed for modern businesses. Let us help you eliminate single-use waste and reduce cost per loop.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="p-5 border-l-4 border-accent bg-gray-50 rounded-r-xl">
                    <div className="text-3xl font-bold text-primary mb-1">Up to 70%</div>
                    <div className="text-sm font-semibold text-gray-600">Reduction in Packaging Waste</div>
                  </div>
                  <div className="p-5 border-l-4 border-secondary bg-gray-50 rounded-r-xl">
                    <div className="text-3xl font-bold text-primary mb-1">Pan India</div>
                    <div className="text-sm font-semibold text-gray-600">Doorstep Delivery Hub Network</div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
            
            <div className="lg:w-1/2 w-full max-w-lg mx-auto">
              <ScrollReveal delayClass="delay-300">
                <LeadForm title="Request Shipping & Logistics Quote" />
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
