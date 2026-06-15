import { Metadata } from "next";
import LeadForm from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Get a Free Quote | Nilanchal Packaging",
  description: "Request a free quotation for bulk industrial packaging solutions, PP Corrugated Boxes, and Custom Trays.",
};

export default function QuotePage() {
  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Request a Free Quote</h1>
            <p className="text-lg text-gray-700">
              Provide us with your packaging requirements, and our sales team will get back to you with a customized, cost-effective proposal.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-xl overflow-hidden border border-gray-100">
             <div className="bg-primary px-8 py-6 text-white text-center">
                <h2 className="text-2xl font-bold">Fast Turnaround Time &bull; Pan India Delivery</h2>
             </div>
             <div className="p-8">
               <LeadForm title="Enter Your Details" />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
