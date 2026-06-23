import axiosClient from "./axios-client";
import type { SetUserGoalsRequest } from "../models/user-goals/SetUserGoalsRequest";
import type { UserGoalsResponse } from "../models/user-goals/UserGoalsResponse";

export async function getUserGoals(): Promise<UserGoalsResponse> {
  const res = await axiosClient.get<UserGoalsResponse>("/user-goals");
  return res.data;
}

export async function setUserGoals(
  data: SetUserGoalsRequest
): Promise<UserGoalsResponse> {
  const res = await axiosClient.post<UserGoalsResponse>("/user-goals", data);
  return res.data;
}