import { QuickBaseResponseGetApp } from "quickbase";
import { apiRequest } from "./apiRequest";

// Function to retrieve application details
export async function getApp(appId: string): Promise<QuickBaseResponseGetApp> {
  return apiRequest(appId, async (quickbase) => {
    const results = await quickbase.getApp({
      appId,
    });
    return results;
  });
}
