import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | RTGS PACK LLP",
  description: "Learn about RTGS PACK LLP, India's trusted manufacturer of sustainable and reusable industrial packaging solutions.",
};

export default function About() {
  return (
    <div className="bg-white">
      {/* Page Header */}
      <div className="bg-primary py-16 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
        <p className="text-xl max-w-2xl mx-auto">India's Most Trusted Sustainable Packaging Manufacturer</p>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-4 border-accent inline-block pb-2">Company Overview</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              RTGS PACK LLP is a premier manufacturer of industrial packaging solutions specializing in PP Corrugated Boxes, PP Trays, ESD Packaging, and Foam Fitments.
              With over 10 years of experience, we have established ourselves as a leader in creating sustainable, reusable, and returnable packaging systems.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              We cater to diverse industries including Automobile, Electronics, Pharmaceuticals, and FMCG. Our 100% custom manufacturing capabilities ensure that every client receives a packaging solution precisely engineered for their products.
            </p>
          </div>
          <div className="bg-gray-100 rounded-lg flex items-center justify-center h-full min-h-[300px]">
            {/* Image Placeholder */}
            <span className="text-gray-500 text-lg font-semibold">Manufacturing Facility</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="bg-gray-50 p-8 rounded-lg border-l-4 border-primary shadow-sm">
            <h3 className="text-2xl font-bold text-primary mb-4">Our Vision</h3>
            <p className="text-gray-700 text-lg">
              To become India's most trusted and innovative sustainable packaging manufacturer, driving the industry towards zero-wastage and eco-friendly solutions.
            </p>
          </div>
          <div className="bg-gray-50 p-8 rounded-lg border-l-4 border-secondary shadow-sm">
            <h3 className="text-2xl font-bold text-secondary mb-4">Our Mission</h3>
            <p className="text-gray-700 text-lg">
              Provide innovative, reusable, and high-quality packaging solutions that protect products securely while significantly reducing the overall packaging cost and environmental impact for our clients.
            </p>
          </div>
        </div>

        <div className="mb-20 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Why RTGS PACK LLP?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { title: "Quality Manufacturing", icon: "⭐" },
              { title: "Custom Design", icon: "📐" },
              { title: "Fast Delivery", icon: "🚀" },
              { title: "Sustainable Solutions", icon: "🌿" }
            ].map(item => (
              <div key={item.title} className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-fast">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-green-50 p-12 rounded-2xl text-center">
          <h2 className="text-3xl font-bold text-green-900 mb-6">Our Sustainability Commitment</h2>
          <p className="text-lg text-green-800 max-w-3xl mx-auto mb-8">
            We are dedicated to environmental responsibility. Our products are designed for multiple uses, significantly reducing waste. When they reach the end of their lifecycle, they are 100% recyclable, contributing to a circular economy.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <span className="px-4 py-2 bg-white text-green-700 rounded-full font-semibold shadow-sm">Reduce</span>
            <span className="px-4 py-2 bg-white text-green-700 rounded-full font-semibold shadow-sm">Reuse</span>
            <span className="px-4 py-2 bg-white text-green-700 rounded-full font-semibold shadow-sm">Recycle</span>
          </div>
        </div>
      </div>
    </div>
  );
}
