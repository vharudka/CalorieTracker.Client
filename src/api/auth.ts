import axios from "axios";
import { appConfig } from "../../appConfig";

const api = axios.create({
  baseURL: appConfig.apiUrl,
});

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: number;
    email: string;
  };
}

export interface RegisterResponse {
  message: string;
}

export async function login(payload: LoginPayload): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>("/auth/login", payload);
  console.log(data);
  return data;
}

export async function registerUser(
  payload: RegisterPayload
): Promise<RegisterResponse> {
  const { data } = await api.post<RegisterResponse>("/auth/register", payload);
  return data;
}

export async function getDashboard(token: string): Promise<string> {
  const { data } = await api.get("/dashboard", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    responseType: "text",
  });

  return data;
}