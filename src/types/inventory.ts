
export interface InventoryItem {
  id: string;
  name: string;
  description: string;
  quantity: number;
  price: number;
  category: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface InventoryFilter {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}
