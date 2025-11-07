import { client } from "./client";

export interface ApiTestResponse {
  ok?: boolean;
  message?: string;
  [k: string]: any;
}

export async function apiTest(params?: Record<string, any>): Promise<ApiTestResponse> {
  const { data } = await client.get("/api-test", { params });
  return data;
}
