import Image from "next/image";

export default function LandingProductLineup() {
  return (
    <section className="bg-zinc-950 py-24 px-6 md:px-12 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Our Product Lineup</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Gildan 18500 Hoodie", cat: "Apparel", img: "/hoodie.png" },
            { title: "Matte Black Tumbler", cat: "Drinkware", img: "/tumbler.png" },
            { title: "Under Armour Polo", cat: "Performance", img: "/polo.png" },
            { title: "Tech Organizer", cat: "Accessories", img: "/pouch.png" }
          ].map((product, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="w-full aspect-[4/5] bg-zinc-900 rounded-xl mb-4 overflow-hidden border border-zinc-800 group-hover:border-[#d4af37]/40 transition-colors flex items-center justify-center relative">
                <Image 
                  src={product.img} 
                  alt={product.title} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                {/* Subtle hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h4 className="text-lg font-bold group-hover:text-[#d4af37] transition-colors">{product.title}</h4>
              <p className="text-sm text-zinc-500">{product.cat}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
