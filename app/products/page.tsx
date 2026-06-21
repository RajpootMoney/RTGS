import { Metadata } from "next";
import Link from "next/link";
import products from "@/data/products.json";

export const metadata: Metadata = {
  title: "Industrial Packaging Products | RTGS PACK LLP",
  description: "Browse our extensive range of industrial packaging solutions including PP Corrugated Boxes, PP Trays, ESD Packaging, and Foam Fitments.",
};

export default function ProductsIndex() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-primary py-16 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Products</h1>
        <p className="text-xl max-w-2xl mx-auto">Sustainable, Reusable, and Custom Industrial Packaging Solutions</p>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-fast flex flex-col h-full">
              <div className="h-48 bg-gray-200 relative flex items-center justify-center">
                <span className="text-gray-500 font-semibold">{product.name} Image</span>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">{product.name}</h2>
                <p className="text-gray-600 mb-4 flex-grow">{product.description}</p>
                
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2 uppercase tracking-wide">Key Features</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {product.features.slice(0, 3).map(feature => (
                      <li key={feature} className="flex items-center">
                        <span className="text-accent mr-2">✓</span> {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-auto grid grid-cols-2 gap-3 pt-4 border-t border-gray-100">
                  <Link 
                    href={`/products/${product.slug}`}
                    className="text-center bg-primary hover:bg-secondary text-white py-2.5 px-2 rounded-lg font-semibold transition-fast text-sm flex items-center justify-center"
                  >
                    View Details
                  </Link>
                  <a 
                    href="tel:+919876543210"
                    className="text-center border border-secondary text-secondary hover:bg-secondary hover:text-white py-2.5 px-2 rounded-lg font-semibold transition-fast text-sm flex items-center justify-center gap-1.5"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .3l-2.2 2.2c-2.8-1.4-5.1-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.3-1.1-.5-2.3-.5-3.6 0-.8-.7-1.5-1.5-1.5H4C3.2 2.5 2.5 3.2 2.5 4c0 10.2 8.3 18.5 18.5 18.5.8 0 1.5-.7 1.5-1.5v-4c0-.8-.7-1.5-1.5-1.5z"/>
                    </svg>
                    Call Now
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
