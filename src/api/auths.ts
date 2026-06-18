import axiosClient from "./axios-client";
import type { LoginRequest } from "../models/auths/LoginRequest";
import type { RegisterRequest } from "../models/auths/RegisterRequest";
import type { AuthResponse } from "../models/auths/AuthResponse";

export async function login(data: LoginRequest): Promise<AuthResponse> {
  const res = await axiosClient.post<AuthResponse>("/auth/login", data);
  return res.data;
}

export async function registerUser(data: RegisterRequest): Promise<AuthResponse> {
  const res = await axiosClient.post<AuthResponse>("/auth/register", data);
  return res.data;
}