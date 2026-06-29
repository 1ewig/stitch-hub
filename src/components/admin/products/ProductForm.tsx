"use client";

import React from "react";
import GlassCard from "@/components/admin/GlassCard";
import FormField from "@/components/admin/FormField";

const categoryOptions = [
  { value: "Apparel (Hoodie, Polo)", label: "Apparel (Hoodie, Polo)" },
  { value: "Drinkware (Tumblers)", label: "Drinkware (Tumblers)" },
  { value: "Gear (Organizer Pouches)", label: "Gear (Organizer Pouches)" },
  { value: "Office (Acoustic Panels)", label: "Office (Acoustic Panels)" },
];

interface ProductFormProps {
  isEditing: boolean;
  submitting: boolean;
  error: string | null;
  success: string | null;
  formData: {
    id: string;
    title: string;
    cat: string;
    price: string;
    priceRange: string;
    moq: string;
    customization: string;
    description: string;
  };
  imagePreview: string | null;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  handleCancelEdit: () => void;
}

export default function ProductForm({
  isEditing, submitting, error, success,
  formData, imagePreview,
  handleInputChange, handleImageChange,
  handleSubmit, handleCancelEdit,
}: ProductFormProps) {
  return (
    <GlassCard className="p-6">
      <h3 className="text-sm font-bold text-zinc-300 mb-6">{isEditing ? "Edit Product" : "Create Product"}</h3>

      {error && (
        <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono">{error}</div>
      )}
      {success && (
        <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">{success}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField label="Product Title" name="title" required value={formData.title} onChange={handleInputChange} placeholder="e.g. Gildan Heavyweight Hoodie" />

        <div className="grid grid-cols-2 gap-4">
          <FormField label="Slug / ID" name="id" required value={formData.id} onChange={handleInputChange} placeholder="gildan-hoodie" disabled={isEditing} />
          <FormField label="Category" name="cat" type="select" value={formData.cat} onChange={handleInputChange} options={categoryOptions} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField label="Base Price ($)" name="price" type="number" required value={formData.price} onChange={handleInputChange} placeholder="39.99" step="0.01" />
          <FormField label="Min. Order" name="moq" type="number" required value={formData.moq} onChange={handleInputChange} placeholder="25" />
        </div>

        <FormField label="Volume Pricing Range" name="priceRange" required value={formData.priceRange} onChange={handleInputChange} placeholder="e.g. $14.20 - $22.50" />
        <FormField label="Customization Options" name="customization" required value={formData.customization} onChange={handleInputChange} placeholder="e.g. Screen Print | Embroidery" />
        <FormField label="Description" name="description" type="textarea" required value={formData.description} onChange={handleInputChange} placeholder="Product description and details..." />

        <FormField label="Product Image" name="image" type="file"
          imagePreview={imagePreview} onFileChange={handleImageChange}
          hiddenFileId="product-image-file" accept="image/*"
          value="" onChange={() => {}} />

        <div className="flex gap-3">
          {isEditing && (
            <button type="button" onClick={handleCancelEdit}
              className="flex-1 bg-white/5 border border-white/10 text-white py-3 rounded-xl text-xs font-bold hover:bg-white/10 transition-colors font-mono uppercase tracking-wider">
              Cancel
            </button>
          )}
          <button type="submit" disabled={submitting}
            className="flex-1 bg-[#d4af37] text-[#090a0f] py-3 rounded-xl text-xs font-bold hover:bg-[#bfa032] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-[0_0_20px_rgba(212,175,55,0.25)] font-mono uppercase tracking-wider">
            {submitting ? (isEditing ? "Updating..." : "Saving...") : (isEditing ? "Save Changes" : "Save Product")}
          </button>
        </div>
      </form>
    </GlassCard>
  );
}
