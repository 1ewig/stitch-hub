export interface Product {
  title: string;
  cat: string;
  img: string;
  price: number;
  priceRange?: string;    
  customization?: string; 
  description: string;
  moq: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  customNotes: string;
}
