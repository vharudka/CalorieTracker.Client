import axiosClient from "./axios-client";

import type { CreateFoodEntryRequest } from "../models/food-entries/CreateFoodEntryRequest";
import type { UpdateFoodEntryRequest } from "../models/food-entries/UpdateFoodEntryRequest";
import type { FoodEntryResponse } from "../models/food-entries/FoodEntryResponse";

export async function createFoodEntry(
  data: CreateFoodEntryRequest
): Promise<FoodEntryResponse> {
  const res = await axiosClient.post<FoodEntryResponse>("/food-entries", data);
  return res.data;
}

export async function updateFoodEntry(
  id: string,
  data: UpdateFoodEntryRequest
): Promise<FoodEntryResponse> {
  const res = await axiosClient.put<FoodEntryResponse>(`/food-entries/${id}`, data);
  return res.data;
}

export async function getFoodEntry(id: string): Promise<FoodEntryResponse> {
  const res = await axiosClient.get<FoodEntryResponse>(`/food-entries/${id}`);
  return res.data;
}

export async function getAllFoodEntries(): Promise<FoodEntryResponse[]> {
  const res = await axiosClient.get<FoodEntryResponse[]>("/food-entries");
  return res.data;
}

export async function deleteFoodEntry(id: string): Promise<void> {
  await axiosClient.delete(`/food-entries/${id}`);
}