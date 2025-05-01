
export interface InventoryItem {
  id: string;
  name: string;
  description?: string;
  quantity: number;
  price: number;
  category: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
  partNumber?: string;
  location?: string;
  minQuantity?: number;
}
