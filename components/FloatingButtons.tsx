export default function FloatingButtons() {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col space-y-4 z-50">
      {/* WhatsApp Button */}
      <a
        href="https://wa.me/919876543210"
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-115 active:scale-95 transition-all duration-300 animate-float-bounce hover:shadow-green-500/40 hover:shadow-xl"
        aria-label="Chat on WhatsApp"
      >
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.127.552 4.148 1.603 5.952L.116 24l6.19-1.62c1.748 1 3.705 1.528 5.725 1.528 6.645 0 12.03-5.385 12.03-12.031S18.676 0 12.031 0zm0 21.996c-1.848 0-3.655-.497-5.234-1.436l-.375-.224-3.89 1.018 1.04-3.79-.245-.39C2.4 15.652 1.83 13.882 1.83 12.03c0-5.632 4.582-10.215 10.215-10.215 5.633 0 10.215 4.582 10.215 10.215 0 5.633-4.582 10.215-10.215 10.215zm5.597-7.65c-.307-.153-1.815-.896-2.096-1-.28-.102-.486-.153-.69.153-.205.306-.792 1-.97 1.205-.18.204-.358.23-.665.076-.307-.153-1.295-.477-2.467-1.517-.912-.81-1.527-1.812-1.706-2.118-.18-.307-.02-.473.134-.626.138-.138.307-.358.46-.537.153-.18.205-.306.307-.512.102-.205.05-.383-.025-.537-.077-.153-.69-1.662-.945-2.276-.248-.597-.5-.516-.69-.525-.18-.008-.385-.01-.59-.01-.205 0-.537.077-.818.383-.28.307-1.074 1.05-1.074 2.558s1.1 2.968 1.253 3.173c.153.204 2.164 3.3 5.242 4.626 2.052.887 2.85 1.01 3.904.966 1.13-.048 3.513-1.435 4.004-2.822.49-1.386.49-2.576.345-2.822-.146-.247-.525-.4-.832-.553z"/>
        </svg>
      </a>

      {/* Phone Button */}
      <a
        href="tel:+919876543210"
        className="w-14 h-14 bg-primary rounded-full flex items-center justify-center text-white shadow-lg hover:scale-115 active:scale-95 transition-all duration-300 animate-float-bounce delay-200 hover:shadow-primary/40 hover:shadow-xl"
        aria-label="Call Us"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      </a>
    </div>
  );
}
