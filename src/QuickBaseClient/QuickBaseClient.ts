import { QuickBase, QuickBaseResponseGetApp } from "quickbase";
import { generateTempToken } from "./generateTempToken";
// import { storeTokenInSession } from "./storeTokenInSession";
import { getTokenFromSession } from "./getTokenFromSession";
import { QuickBaseClientOptions } from "../types/types";

export class QuickBaseClient {
  private quickbase: QuickBase;
  private tokenKey: string;

  private constructor(
    private options: QuickBaseClientOptions,
    token: string,
    tokenKey: string
  ) {
    const { realm } = options;
    this.tokenKey = tokenKey;
    this.quickbase = new QuickBase({
      realm,
      [this.tokenKey]: token,
    });
  }

  public static async initialize(
    options: QuickBaseClientOptions
  ): Promise<QuickBaseClient> {
    const { realm, dbid, userToken, mode = "development" } = options;
    let token: string | null = null;
    let tokenKey: string;

    if (mode === "production") {
      // Production-specific code
      token = getTokenFromSession(dbid);
      if (!token) {
        const quickbase = new QuickBase({ realm });
        token = await generateTempToken(quickbase, dbid);
      }
      tokenKey = "tempToken";
    } else {
      // Use userToken for development
      token = userToken || null;
      tokenKey = "userToken";
    }

    if (!token) {
      throw new Error(
        "Token is not available. Please check your environment variables."
      );
    }

    return new QuickBaseClient(options, token, tokenKey);
  }

  public async getApp(appId: string): Promise<QuickBaseResponseGetApp> {
    return this.quickbase.getApp({ appId });
  }

  // Add other API methods as needed
}
