import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold text-white mb-4">RTGS PACK LLP</h3>
          <p className="mb-4">Sustainable. Reusable. Recyclable Packaging Solutions.</p>
          <div className="flex space-x-4">
            {/* Social Icons Placeholder */}
            <a href="#" className="hover:text-accent transition-fast">LinkedIn</a>
            <a href="#" className="hover:text-accent transition-fast">Facebook</a>
            <a href="#" className="hover:text-accent transition-fast">Twitter</a>
          </div>
        </div>
        
        <div>
          <h4 className="text-lg font-bold text-white mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:text-accent transition-fast">Home</Link></li>
            <li><Link href="/about" className="hover:text-accent transition-fast">About Us</Link></li>
            <li><Link href="/shipping" className="hover:text-accent transition-fast">Shipping & Logistics</Link></li>
            <li><Link href="/blog" className="hover:text-accent transition-fast">Blog</Link></li>
            <li><Link href="/contact" className="hover:text-accent transition-fast">Contact Us</Link></li>
            <li><Link href="/quote" className="hover:text-accent transition-fast">Get Quote</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold text-white mb-4">Products</h4>
          <ul className="space-y-2">
            <li><Link href="/products/pp-corrugated-boxes" className="hover:text-accent transition-fast">PP Corrugated Boxes</Link></li>
            <li><Link href="/products/pp-trays" className="hover:text-accent transition-fast">PP Trays</Link></li>
            <li><Link href="/products/esd-packaging" className="hover:text-accent transition-fast">ESD Packaging</Link></li>
            <li><Link href="/products/foam-fitments" className="hover:text-accent transition-fast">Foam Fitments</Link></li>
            <li><Link href="/products/pp-corrugated-sheets" className="hover:text-accent transition-fast">PP Corrugated Sheets</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold text-white mb-4">Contact Information</h4>
          <address className="not-italic space-y-2">
            <p>123 Industrial Estate,</p>
            <p>Manufacturing Hub, India</p>
            <p>Email: <a href="mailto:sales@rtgspack.com" className="hover:text-accent transition-fast">sales@rtgspack.com</a></p>
            <p>Phone: <a href="tel:+919876543210" className="hover:text-accent transition-fast">+91 98765 43210</a></p>
          </address>
        </div>
      </div>
      
      <div className="container mx-auto px-4 mt-8 pt-8 border-t border-gray-700 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} RTGS PACK LLP. All rights reserved.</p>
      </div>
    </footer>
  );
}
