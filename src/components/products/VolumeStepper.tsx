"use client";

interface VolumeStepperProps {
  minQty: number;
  currentQty: number;
  onChange: (qty: number) => void;
}

export default function VolumeStepper({ minQty, currentQty, onChange }: VolumeStepperProps) {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">
          Configure Volume Units
        </label>
        <span className="text-xs font-medium text-zinc-500">
          Min. Order Quantity (MOQ): {minQty}
        </span>
      </div>
      <div className="flex items-center gap-4 bg-zinc-950/80 border border-zinc-900 rounded-2xl p-2.5">
        <button
          onClick={() => onChange(Math.max(minQty, currentQty - 10))}
          className="h-11 w-11 flex items-center justify-center rounded-xl bg-zinc-900 text-zinc-400 hover:text-white transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
          disabled={currentQty <= minQty}
        >
          -10
        </button>
        <span className="flex-1 text-center font-display font-bold text-white text-lg">
          {currentQty} <span className="text-xs text-zinc-500">units</span>
        </span>
        <button
          onClick={() => onChange(currentQty + 10)}
          className="h-11 w-11 flex items-center justify-center rounded-xl bg-zinc-900 text-zinc-400 hover:text-white transition-colors cursor-pointer"
        >
          +10
        </button>
      </div>
    </div>
  );
}
