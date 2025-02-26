import { QuickBase } from "quickbase";
import { quickbaseClient } from "./quickbaseClient";

export const apiRequest = async <T>(
  dbid: string,
  requestFn: (quickbase: QuickBase) => Promise<T>
): Promise<T> => {
  const quickbase = await quickbaseClient(dbid);
  try {
    const response = await requestFn(quickbase);
    return response;
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
};
