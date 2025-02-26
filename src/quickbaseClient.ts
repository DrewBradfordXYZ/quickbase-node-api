import { QuickBase } from "quickbase";
import dotenv from "dotenv";

// Load common environment variables
dotenv.config();

// Conditionally load environment variables based on NODE_ENV
if (process.env.NODE_ENV === "development") {
  dotenv.config({ path: ".env.development" });
} else if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: ".env.production" });
}

// Helper function to store token in sessionStorage
const storeTokenInSession = (dbid: string, token: string) => {
  const expirationTime = Date.now() + 5 * 60 * 1000; // 5 minutes from now
  const tokenData = { token, expirationTime };
  sessionStorage.setItem(`tempToken_${dbid}`, JSON.stringify(tokenData));
};

// Helper function to retrieve token from sessionStorage
const getTokenFromSession = (dbid: string): string | null => {
  const tokenData = sessionStorage.getItem(`tempToken_${dbid}`);
  if (tokenData) {
    const { token, expirationTime } = JSON.parse(tokenData);
    if (Date.now() < expirationTime) {
      return token;
    } else {
      sessionStorage.removeItem(`tempToken_${dbid}`);
    }
  }
  return null;
};

// Function to generate a new temp token using dbid
const generateTempToken = async (dbid: string): Promise<string> => {
  const quickbase = new QuickBase({
    realm: process.env.QUICKBASE_REALM,
  });
  try {
    const response = await quickbase.getTempTokenDBID({
      dbid: dbid,
    });
    const token = response.temporaryAuthorization;
    storeTokenInSession(dbid, token);
    return token;
  } catch (error) {
    console.error("Failed to generate temp token:", error);
    throw new Error(
      "Failed to generate temp token. Please check your environment variables and QuickBase configuration."
    );
  }
};

// Function to initialize QuickBase client
export const quickbaseClient = async (dbid: string): Promise<QuickBase> => {
  let token: string | null = null;
  let tokenKey: string;

  if (process.env.NODE_ENV === "production") {
    // Handle production-specific logic
    token = getTokenFromSession(dbid);
    if (!token) {
      // Generate a new temp token if not found in sessionStorage
      token = await generateTempToken(dbid);
    }
    tokenKey = "tempToken";
  } else {
    // Use userToken for development
    token = process.env.QUICKBASE_USER_TOKEN || null;
    tokenKey = "userToken";
  }

  if (!token) {
    throw new Error(
      "Token is not available. Please check your environment variables."
    );
  }

  const quickbase = new QuickBase({
    realm: process.env.QUICKBASE_REALM,
    [tokenKey]: token,
  });

  return quickbase;
};
