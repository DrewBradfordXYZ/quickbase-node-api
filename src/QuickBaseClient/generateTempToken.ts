import { QuickBase } from "quickbase";
import { storeTokenInSession } from "./storeTokenInSession";

export async function generateTempToken(
  quickbase: QuickBase,
  dbid: string
): Promise<string> {
  try {
    const response = await quickbase.getTempTokenDBID({ dbid });
    const token = response.temporaryAuthorization;
    storeTokenInSession(dbid, token);
    return token;
  } catch (error) {
    console.error("Failed to generate temp token:", error);
    throw new Error(
      "Failed to generate temp token. Please check your environment variables and QuickBase configuration."
    );
  }
}
