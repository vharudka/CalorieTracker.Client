export interface FoodEntryResponse {
  id: string;
  userId: string;
  name: string;
  barcode: string;
  grams: number;
  calories: number;
  protein: number;
  fat: number;
  carbohydrates: number;
  eatenAt: string;
}