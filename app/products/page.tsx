import { Metadata } from "next";
import Link from "next/link";
import products from "@/data/products.json";

export const metadata: Metadata = {
  title: "Industrial Packaging Products | Nilanchal Packaging",
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
                
                <Link 
                  href={`/products/${product.slug}`}
                  className="mt-auto block w-full text-center bg-primary text-white py-2 rounded-md font-semibold hover:bg-secondary transition-fast"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
