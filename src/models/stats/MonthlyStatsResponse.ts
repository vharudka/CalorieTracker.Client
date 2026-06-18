export interface MonthlyStatsResponse {
  year: number;
  month: number;
  totalCalories: number;
  averageCalories: number;
  dailyCalorieLimit: number;
  remainingCalories: number;
  dailyCalories: number[];
  totalProtein: number;
  totalFat: number;
  totalCarbohydrates: number;
}