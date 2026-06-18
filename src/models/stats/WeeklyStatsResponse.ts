export interface WeeklyStatsResponse {
  weekStart: string;
  weekEnd: string;
  totalCalories: number;
  averageCalories: number;
  dailyCalorieLimit: number;
  remainingCalories: number;
  dailyCalories: number[];
  totalProtein: number;
  totalFat: number;
  totalCarbohydrates: number;
}