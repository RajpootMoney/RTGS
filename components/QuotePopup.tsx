"use client";

import { useState, useEffect } from "react";

export default function QuotePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  useEffect(() => {
    if (isDismissed) return;

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 7000); // 7 seconds

    return () => clearTimeout(timer);
  }, [isDismissed]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
      setIsDismissed(true);
    }, 400); // Wait 400ms for exit animation
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    
    // Simulate API form submission
    setTimeout(() => {
      setStatus("success");
      // Auto-close modal after showing success state
      setTimeout(() => {
        handleClose();
      }, 2500);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${
        isClosing ? "animate-overlay-exit" : "animate-overlay"
      }`}
      onClick={handleClose}
    >
      <div 
        className={`relative bg-white rounded-2xl shadow-2xl border border-gray-100 max-w-lg w-full max-h-[90vh] overflow-hidden flex flex-col ${
          isClosing ? "animate-modal-pop-exit" : "animate-modal-pop"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header background with company color gradient */}
        <div className="bg-gradient-to-r from-[#0A4D68] via-[#088395] to-[#05BFDB] p-6 text-white relative">
          <button 
            onClick={handleClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white hover:scale-110 active:scale-95 transition-all text-xl font-bold cursor-pointer"
            aria-label="Close modal"
          >
            ✕
          </button>
          <h3 className="text-2xl font-bold mb-1">Get a Custom Quote</h3>
          <p className="text-white/90 text-sm">Describe your packaging needs and get a callback or quotation today.</p>
        </div>

        {/* Content and Form */}
        <div className="p-6 md:p-8 overflow-y-auto">
          {status === "success" ? (
            <div className="text-center py-8 space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 text-3xl mb-2 animate-bounce">
                ✓
              </div>
              <h4 className="text-xl font-bold text-gray-900">Request Sent Successfully!</h4>
              <p className="text-gray-600">Our packaging engineers will review your dimensions and contact you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div>
                <label htmlFor="popup-name" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Name *</label>
                <input 
                  type="text" 
                  id="popup-name" 
                  required 
                  placeholder="Your Name" 
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#05BFDB]/20 focus:border-[#05BFDB] focus:bg-white focus:outline-none transition-all placeholder-gray-400 text-sm text-gray-900" 
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="popup-email" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Email *</label>
                  <input 
                    type="email" 
                    id="popup-email" 
                    required 
                    placeholder="name@company.com" 
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#05BFDB]/20 focus:border-[#05BFDB] focus:bg-white focus:outline-none transition-all placeholder-gray-400 text-sm text-gray-900" 
                  />
                </div>
                <div>
                  <label htmlFor="popup-phone" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Phone *</label>
                  <input 
                    type="tel" 
                    id="popup-phone" 
                    required 
                    placeholder="Phone Number" 
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#05BFDB]/20 focus:border-[#05BFDB] focus:bg-white focus:outline-none transition-all placeholder-gray-400 text-sm text-gray-900" 
                  />
                </div>
              </div>

              <div>
                <label htmlFor="popup-requirement" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Packaging Requirement *</label>
                <select 
                  id="popup-requirement" 
                  required 
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#05BFDB]/20 focus:border-[#05BFDB] focus:bg-white focus:outline-none transition-all text-sm text-gray-900"
                >
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
                <label htmlFor="popup-message" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Detailed Requirements</label>
                <textarea 
                  id="popup-message" 
                  rows={3} 
                  placeholder="E.g. dimensions, quantity, color, special requests..." 
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#05BFDB]/20 focus:border-[#05BFDB] focus:bg-white focus:outline-none transition-all placeholder-gray-400 text-sm text-gray-900"
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={status === "submitting"}
                className="w-full bg-gradient-to-r from-[#0A4D68] to-[#088395] text-white py-3 rounded-xl font-bold text-base hover:from-[#088395] hover:to-[#0A4D68] active:scale-[0.98] hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
              >
                {status === "submitting" ? "Sending Request..." : "Request Custom Quote"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
