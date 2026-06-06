"use client";

import React, { useState, useEffect } from "react";
import { Product } from "@/types";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    cat: "Apparel",
    price: "",
    priceRange: "",
    moq: "25",
    customization: "",
    description: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const glassCardClass = "bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.6)] relative overflow-hidden";
  const inputClass = "w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37]/50 focus:ring-1 focus:ring-[#d4af37]/35 transition-all font-sans";
  const labelClass = "text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1.5 block";

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      setLoading(true);
      const res = await fetch("/api/products");
      const data = await res.json();
      if (data.success) {
        setProducts(data.products);
      }
    } catch (err) {
      console.error("Failed to load products:", err);
    } finally {
      setLoading(false);
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Generate slug from title automatically if ID is empty
    if (name === "title" && !formData.id) {
      const generatedSlug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      setFormData((prev) => ({ ...prev, id: generatedSlug }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!imageFile) {
      setError("Product image file is required.");
      return;
    }

    setSubmitting(true);

    try {
      // 1. Upload Image to Supabase Storage
      const uploadFormData = new FormData();
      uploadFormData.append("file", imageFile);

      const uploadRes = await fetch("/api/admin/upload", {
        method: "POST",
        body: uploadFormData,
      });

      const uploadData = await uploadRes.json();
      if (!uploadRes.ok) {
        throw new Error(uploadData.error || "Failed to upload product image.");
      }

      const imageUrl = uploadData.url;

      // 2. Save Product to Database
      const productPayload = {
        ...formData,
        price: parseFloat(formData.price),
        moq: parseInt(formData.moq, 10),
        img: imageUrl,
      };

      const productRes = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productPayload),
      });

      const productData = await productRes.json();
      if (!productRes.ok) {
        throw new Error(productData.error || "Failed to save product.");
      }

      setSuccess("Product uploaded and catalog successfully synchronized!");
      
      // Reset Form
      setFormData({
        id: "",
        title: "",
        cat: "Apparel",
        price: "",
        priceRange: "",
        moq: "25",
        customization: "",
        description: "",
      });
      setImageFile(null);
      setImagePreview(null);
      
      // Refresh list
      fetchProducts();

    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12 w-full">
      {/* ── HEADER ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
        <div>
          <h2 className="text-2xl font-bold text-white font-display tracking-tight drop-shadow-md">Product Catalog</h2>
          <p className="text-xs text-zinc-400 mt-1">Add baseline materials and synchronize the global inventory directory.</p>
        </div>
      </div>

      {/* ── CONTENT GRID ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN: Catalog List */}
        <div className="xl:col-span-2 space-y-6">
          <div className={`${glassCardClass} p-6 h-[720px] flex flex-col`}>
            {/* Ambient golden internal glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4af37]/5 rounded-full blur-[80px] pointer-events-none"></div>
            
            <h3 className="text-sm font-bold text-zinc-300 mb-4 relative z-10">Active Sourcing Catalog</h3>
            
            {loading ? (
              <div className="flex-1 flex flex-col justify-center items-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#d4af37] mb-3"></div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">Querying registry database...</span>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto pr-2 relative z-10 space-y-3">
                {products.length === 0 ? (
                  <div className="h-full flex flex-col justify-center items-center text-zinc-500 text-xs">
                    No products found in the database. Use the panel on the right to add your first catalog item.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {products.map((product) => (
                      <div key={product.id} className="p-4 bg-black/40 border border-white/5 rounded-xl hover:border-white/10 transition-all flex gap-4">
                        <div className="h-16 w-16 bg-zinc-900 border border-white/10 rounded-lg overflow-hidden shrink-0">
                          <img src={product.img} alt={product.title} className="h-full w-full object-cover" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="text-[9px] font-mono text-[#d4af37] uppercase tracking-wider bg-[#d4af37]/10 px-2 py-0.5 rounded-full">{product.cat}</span>
                          <h4 className="text-xs font-bold text-white mt-1.5 truncate">{product.title}</h4>
                          <div className="flex justify-between items-center mt-2 text-[10px] font-mono text-zinc-400">
                            <span>MOQ: {product.moq}</span>
                            <span className="text-white font-bold">{product.priceRange}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Add Product Form */}
        <div className="space-y-6">
          <div className={`${glassCardClass} p-6`}>
            <h3 className="text-sm font-bold text-zinc-300 mb-6">Create Baseline Item</h3>
            
            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className={labelClass}>Product Title</label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g. Gildan Heavyweight Hoodie"
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Slug / ID</label>
                  <input
                    type="text"
                    name="id"
                    required
                    value={formData.id}
                    onChange={handleInputChange}
                    placeholder="gildan-hoodie"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Category</label>
                  <select
                    name="cat"
                    value={formData.cat}
                    onChange={handleInputChange}
                    className={inputClass}
                  >
                    <option value="Apparel">Apparel</option>
                    <option value="Drinkware">Drinkware</option>
                    <option value="Performance">Performance</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Base Price ($)</label>
                  <input
                    type="number"
                    name="price"
                    step="0.01"
                    required
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="39.99"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>MOQ</label>
                  <input
                    type="number"
                    name="moq"
                    required
                    value={formData.moq}
                    onChange={handleInputChange}
                    placeholder="25"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Volume Pricing Range</label>
                <input
                  type="text"
                  name="priceRange"
                  required
                  value={formData.priceRange}
                  onChange={handleInputChange}
                  placeholder="e.g. $14.20 - $22.50"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Customization Options</label>
                <input
                  type="text"
                  name="customization"
                  required
                  value={formData.customization}
                  onChange={handleInputChange}
                  placeholder="e.g. Screen Print | Embroidery"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Description</label>
                <textarea
                  name="description"
                  required
                  rows={3}
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Material specs, structure, durability characteristics..."
                  className={`${inputClass} resize-none`}
                />
              </div>

              <div>
                <label className={labelClass}>Product Image</label>
                <div className="mt-1 flex items-center gap-4">
                  <div className="h-16 w-16 bg-black/40 border border-white/10 rounded-xl flex items-center justify-center overflow-hidden shrink-0">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" />
                    ) : (
                      <svg className="h-6 w-6 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="product-image-file"
                  />
                  <label
                    htmlFor="product-image-file"
                    className="cursor-pointer bg-white/5 border border-white/10 text-white hover:bg-white/10 px-4 py-2 rounded-lg text-xs font-bold transition-all"
                  >
                    Select File
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#d4af37] text-[#090a0f] py-3 rounded-xl text-xs font-bold hover:bg-[#bfa032] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-[0_0_20px_rgba(212,175,55,0.25)] font-mono uppercase tracking-wider"
              >
                {submitting ? "Uploading Product..." : "Deploy Product"}
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
