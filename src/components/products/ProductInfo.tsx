interface ProductInfoProps {
  title: string;
  description: string;
  minQty: number;
}

export default function ProductInfo({ title, description, minQty }: ProductInfoProps) {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold font-display text-white mb-2 leading-tight">
          {title}
        </h1>
        <p className="text-[#d4af37] font-semibold text-sm uppercase tracking-wider">
          Sourcing MOQ: {minQty} units
        </p>
      </div>

      <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-8">
        {description}
      </p>
    </>
  );
}
