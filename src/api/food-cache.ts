import axiosClient from "./axios-client";
import type { FoodCacheRequest } from "../models/food-cache/FoodCacheRequest";
import type { FoodCacheResponse } from "../models/food-cache/FoodCacheResponse";

export async function getFoodFromCache(
  data: FoodCacheRequest
): Promise<FoodCacheResponse | null> {
  const res = await axiosClient.post<FoodCacheResponse | null>(
    "/food/cache",
    data
  );
  return res.data;
}