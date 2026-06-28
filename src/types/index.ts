export interface Product {
  id: string;
  name: string;
  description: string;
  size_ml: number;
  price_etb: number;
  image_url: string | null;
  stock: number;
  rating: number;
  reviews_count: number;
  is_active: boolean;
  created_at: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  customer_name: string;
  phone: string;
  bottle_type: string;
  quantity: number;
  total_price: number;
  delivery_address: string;
  additional_notes: string | null;
  status: "pending" | "processing" | "delivered" | "cancelled";
  created_at: string;
  updated_at: string;
}

export interface GalleryItem {
  id: string;
  title: string | null;
  image_url: string;
  category: string | null;
  display_order: number;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  display_order: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string | null;
  content: string;
  rating: number;
  avatar_url: string | null;
}

export interface Setting {
  id: string;
  key: string;
  value: string | null;
}

export interface InventoryItem {
  id: string;
  product_id: string;
  current_stock: number;
  low_stock_threshold: number;
}
