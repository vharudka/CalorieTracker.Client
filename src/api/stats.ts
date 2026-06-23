import axiosClient from "./axios-client";

import type { DailyStatsRequest } from "../models/stats/DailyStatsRequest";
import type { DailyStatsResponse } from "../models/stats/DailyStatsResponse";

import type { WeeklyStatsRequest } from "../models/stats/WeeklyStatsRequest";
import type { WeeklyStatsResponse } from "../models/stats/WeeklyStatsResponse";

import type { MonthlyStatsRequest } from "../models/stats/MonthlyStatsRequest";
import type { MonthlyStatsResponse } from "../models/stats/MonthlyStatsResponse";

export async function getDailyStats(
  data: DailyStatsRequest
): Promise<DailyStatsResponse> {
  const res = await axiosClient.get<DailyStatsResponse>(`/stats/daily?date=${data.date}`);
  return res.data;
}

export async function getWeeklyStats(
  data: WeeklyStatsRequest
): Promise<WeeklyStatsResponse> {
  const res = await axiosClient.get<WeeklyStatsResponse>(`/stats/weekly?date=${data.date}`);
  return res.data;
}

export async function getMonthlyStats(
  data: MonthlyStatsRequest
): Promise<MonthlyStatsResponse> {
  const res = await axiosClient.get<MonthlyStatsResponse>(`/stats/monthly?year=${data.year}&month=${data.month}`);
  return res.data;
}