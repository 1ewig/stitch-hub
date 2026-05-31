export default function LandingFooter() {
  return (
    <footer className="bg-black pt-24 pb-12 px-6 border-t border-zinc-900">
      <div className="max-w-4xl mx-auto text-center mb-24">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">Ready to Define Your Legacy?</h2>
        <button className="bg-[#d4af37] text-black px-12 py-4 rounded-full font-bold text-lg hover:bg-[#ebd06f] hover:-translate-y-1 transition-all duration-300 shadow-[0_4px_20px_rgba(212,175,55,0.2)] cursor-pointer">
          Start Your Secure Project
        </button>
      </div>

      <div className="max-w-7xl mx-auto border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-2xl font-black tracking-widest text-white">ASCEND<span className="text-[#d4af37]">.</span></div>
        <div className="flex gap-8 text-sm font-medium text-zinc-400">
          <a href="#" className="hover:text-white transition-colors">Products</a>
          <a href="#" className="hover:text-white transition-colors">AI Logistics</a>
          <a href="#" className="hover:text-white transition-colors">Capabilities</a>
          <a href="#" className="hover:text-white transition-colors">Admin Login</a>
        </div>
        <div className="text-xs text-zinc-600">
          © 2026 Ascend B2B. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
