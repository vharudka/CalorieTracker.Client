import type { FoodEntryResponse } from "../food-entries/FoodEntryResponse";

export interface DailyStatsResponse {
  date: string;
  totalCalories: number;
  dailyCalorieLimit: number;
  remainingCalories: number;
  entries: FoodEntryResponse[];
}