"use client";

import { useState } from "react";

export default function LeadForm({ title = "Request Quote" }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    // Simulate form submission for static site
    setTimeout(() => {
      setStatus("success");
    }, 1500);
  };

  return (
    <div className="bg-white/95 backdrop-blur-md p-8 rounded-xl shadow-premium border border-gray-100 hover:shadow-2xl hover:border-primary/10 transition-all duration-500">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 text-gradient">{title}</h3>
      
      {status === "success" ? (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg relative animate-fade-in-up">
          <strong className="font-bold">Thank you! </strong>
          <span className="block sm:inline">Your request has been received. Our team will contact you shortly.</span>
          <button 
            onClick={() => setStatus("idle")}
            className="mt-4 w-full bg-green-600 text-white px-4 py-2.5 rounded-lg font-semibold hover:bg-green-700 active:scale-98 transition-all duration-300 shadow-sm"
          >
            Submit Another Request
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">Name *</label>
            <input type="text" id="name" required className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent focus:bg-white focus:outline-none transition-all duration-300 placeholder-gray-400" />
          </div>
          <div>
            <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-1">Company Name</label>
            <input type="text" id="company" className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent focus:bg-white focus:outline-none transition-all duration-300 placeholder-gray-400" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">Email *</label>
              <input type="email" id="email" required className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent focus:bg-white focus:outline-none transition-all duration-300 placeholder-gray-400" />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-1">Phone *</label>
              <input type="tel" id="phone" required className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent focus:bg-white focus:outline-none transition-all duration-300 placeholder-gray-400" />
            </div>
          </div>
          <div>
            <label htmlFor="requirement" className="block text-sm font-semibold text-gray-700 mb-1">Product Requirement *</label>
            <select id="requirement" required className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent focus:bg-white focus:outline-none transition-all duration-300">
              <option value="">Select a Product</option>
              <option value="PP Corrugated Boxes">PP Corrugated Boxes</option>
              <option value="PP Trays">PP Trays</option>
              <option value="ESD Packaging">ESD Packaging</option>
              <option value="Foam Fitments">Foam Fitments</option>
              <option value="PP Corrugated Sheets">PP Corrugated Sheets</option>
              <option value="Custom Packaging">Custom Packaging Solutions</option>
            </select>
          </div>
          <div>
            <label htmlFor="size" className="block text-sm font-semibold text-gray-700 mb-1">Required Size / Dimensions</label>
            <input type="text" id="size" placeholder="e.g. 400x300x200 mm or Custom" className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent focus:bg-white focus:outline-none transition-all duration-300 placeholder-gray-400" />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-1">Message</label>
            <textarea id="message" rows={4} className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent/20 focus:border-accent focus:bg-white focus:outline-none transition-all duration-300 placeholder-gray-400"></textarea>
          </div>
          <button 
            type="submit" 
            disabled={status === "submitting"}
            className="w-full bg-primary text-white py-3 rounded-lg font-bold text-lg hover:bg-secondary hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {status === "submitting" ? "Submitting..." : "Request Quote"}
          </button>
        </form>
      )}
    </div>
  );
}
