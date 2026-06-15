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
    <div className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-primary">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">{title}</h3>
      
      {status === "success" ? (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
          <strong className="font-bold">Thank you! </strong>
          <span className="block sm:inline">Your request has been received. Our team will contact you shortly.</span>
          <button 
            onClick={() => setStatus("idle")}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded font-medium hover:bg-green-700 transition-fast"
          >
            Submit Another Request
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
            <input type="text" id="name" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent" />
          </div>
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
            <input type="text" id="company" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input type="email" id="email" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent" />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
              <input type="tel" id="phone" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent" />
            </div>
          </div>
          <div>
            <label htmlFor="requirement" className="block text-sm font-medium text-gray-700 mb-1">Product Requirement *</label>
            <select id="requirement" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent">
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
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea id="message" rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent"></textarea>
          </div>
          <button 
            type="submit" 
            disabled={status === "submitting"}
            className="w-full bg-primary text-white py-3 rounded-md font-bold text-lg hover:bg-secondary transition-fast disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {status === "submitting" ? "Submitting..." : "Request Quote"}
          </button>
        </form>
      )}
    </div>
  );
}
