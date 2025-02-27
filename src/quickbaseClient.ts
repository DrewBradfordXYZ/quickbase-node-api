// import { QuickBase } from "quickbase";
// import { QuickbaseClientParams } from "./types/types";

// // Helper function to store token in sessionStorage
// const storeTokenInSession = (dbid: string, token: string) => {
//   const expirationTime = Date.now() + 5 * 60 * 1000; // 5 minutes from now
//   const tokenData = { token, expirationTime };
//   sessionStorage.setItem(`tempToken_${dbid}`, JSON.stringify(tokenData));
// };

// // Helper function to retrieve token from sessionStorage
// const getTokenFromSession = (dbid: string): string | null => {
//   const tokenData = sessionStorage.getItem(`tempToken_${dbid}`);
//   if (tokenData) {
//     const { token, expirationTime } = JSON.parse(tokenData);
//     if (Date.now() < expirationTime) {
//       return token;
//     } else {
//       sessionStorage.removeItem(`tempToken_${dbid}`);
//     }
//   }
//   return null;
// };

// // Function to generate a new temp token using dbid
// const generateTempToken = async (
//   dbid: string,
//   realm: string
// ): Promise<string> => {
//   const quickbase = new QuickBase({ realm });
//   try {
//     const response = await quickbase.getTempTokenDBID({ dbid });
//     const token = response.temporaryAuthorization;
//     storeTokenInSession(dbid, token);
//     return token;
//   } catch (error) {
//     console.error("Failed to generate temp token:", error);
//     throw new Error(
//       "Failed to generate temp token. Please check your environment variables and QuickBase configuration."
//     );
//   }
// };

// // Function to initialize QuickBase client
// export const quickbaseClient = async (
//   params: QuickbaseClientParams
// ): Promise<QuickBase> => {
//   const { realm, dbid, userToken, mode = "production" } = params;
//   let token: string | null = null;
//   let tokenKey: string;

//   if (mode === "production") {
//     // Production-specific code
//     token = getTokenFromSession(dbid);
//     if (!token) {
//       // Generate a new temp token if not found in sessionStorage
//       token = await generateTempToken(dbid, realm);
//     }
//     tokenKey = "tempToken";
//   } else {
//     // Use userToken for development
//     token = userToken || null;
//     tokenKey = "userToken";
//   }

//   if (!token) {
//     throw new Error(
//       `Token is not available. Please check your environment variables. The mode is set to ${mode}.`
//     );
//   }

//   const quickbase = new QuickBase({
//     realm,
//     [tokenKey]: token,
//   });

//   return quickbase;
// };
