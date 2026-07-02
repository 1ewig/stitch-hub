"use client";

import React from "react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { useAdminProducts } from "@/hooks/useAdminProducts";
import ProductForm from "@/components/admin/products/ProductForm";
import ProductCatalog from "@/components/admin/products/ProductCatalog";

const categoryFilters = [
  { label: "All Categories", value: "all" },
  { label: "Apparel (Hoodie, Polo)", value: "Apparel (Hoodie, Polo)" },
  { label: "Drinkware (Tumblers)", value: "Drinkware (Tumblers)" },
  { label: "Gear (Organizer Pouches)", value: "Gear (Organizer Pouches)" },
  { label: "Office (Acoustic Panels)", value: "Office (Acoustic Panels)" },
];

export default function AdminProductsPage() {
  const {
    products, loading, submitting, error, success,
    isEditing, formData, imagePreview,
    handleInputChange, handleImageChange,
    handleEditClick, handleCancelEdit, handleDeleteClick, handleSubmit,
  } = useAdminProducts();

  const [searchTerm, setSearchTerm] = React.useState("");
  const [categoryFilter, setCategoryFilter] = React.useState("all");

  const filteredProducts = React.useMemo(() => {
    return products.filter((p) => {
      const qry = searchTerm.toLowerCase();
      const matchesSearch =
        p.title.toLowerCase().includes(qry) ||
        p.cat.toLowerCase().includes(qry);
      const matchesCategory =
        categoryFilter === "all" || p.cat === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, categoryFilter]);

  return (
    <div className="space-y-6 animate-fadeIn pb-12 w-full">
      <AdminPageHeader title="Product Catalog" subtitle="Add, edit, or remove products from the catalog." />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <ProductForm
            isEditing={isEditing}
            submitting={submitting}
            error={error}
            success={success}
            formData={formData}
            imagePreview={imagePreview}
            handleInputChange={handleInputChange}
            handleImageChange={handleImageChange}
            handleSubmit={handleSubmit}
            handleCancelEdit={handleCancelEdit}
          />
        </div>

        <div className="xl:col-span-1 flex flex-col h-[580px] xl:h-full">
          <ProductCatalog
            products={products}
            filteredProducts={filteredProducts}
            loading={loading}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            categoryFilters={categoryFilters}
            handleEditClick={handleEditClick}
            handleDeleteClick={handleDeleteClick}
          />
        </div>
      </div>
    </div>
  );
}
