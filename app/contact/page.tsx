import { Metadata } from "next";
import LeadForm from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Contact Us | Nilanchal Packaging",
  description: "Get in touch with Nilanchal Packaging for sustainable industrial packaging solutions.",
};

export default function ContactPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-primary py-16 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
        <p className="text-xl max-w-2xl mx-auto">We are here to answer your packaging queries and provide custom solutions.</p>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          {/* Contact Information */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-900 border-b-2 border-accent pb-2 inline-block">Get In Touch</h2>
            <p className="text-lg text-gray-700">
              Whether you need a quick quote, have a question about our products, or want to discuss a custom packaging solution, our team is ready to help.
            </p>
            
            <div className="space-y-6 mt-8">
              <div className="flex items-start">
                <div className="bg-gray-100 p-3 rounded-full text-primary mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">Manufacturing Facility & Office</h4>
                  <p className="text-gray-600">123 Industrial Estate, Phase 1</p>
                  <p className="text-gray-600">Manufacturing Hub, India</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-gray-100 p-3 rounded-full text-primary mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">Phone Number</h4>
                  <p className="text-gray-600"><a href="tel:+919876543210" className="hover:text-accent">+91 98765 43210</a></p>
                  <p className="text-gray-600"><a href="tel:+919876543211" className="hover:text-accent">+91 98765 43211</a></p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-gray-100 p-3 rounded-full text-primary mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">Email Address</h4>
                  <p className="text-gray-600"><a href="mailto:sales@nilanchalpackaging.com" className="hover:text-accent">sales@nilanchalpackaging.com</a></p>
                  <p className="text-gray-600"><a href="mailto:info@nilanchalpackaging.com" className="hover:text-accent">info@nilanchalpackaging.com</a></p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-gray-100 p-3 rounded-full text-primary mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">Business Hours</h4>
                  <p className="text-gray-600">Monday - Saturday: 9:00 AM - 6:00 PM</p>
                  <p className="text-gray-600">Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <LeadForm title="Send Us a Message" />
          </div>
        </div>

        {/* Map Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Find Us on the Map</h2>
          <div className="w-full h-96 bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center border border-gray-300">
            {/* Google Map Placeholder */}
            <p className="text-gray-500 font-semibold text-lg">Google Map Integration (API Key Required)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
