// import { QuickBase } from "quickbase";
// import { quickbaseClient } from "./quickbaseClient";
// import { QuickbaseClientParams } from "./types/types";

// export const apiRequest = async <T>(
//   params: QuickbaseClientParams,
//   requestFn: (quickbase: QuickBase) => Promise<T>
// ): Promise<T> => {
//   const quickbase = await quickbaseClient(params);
//   try {
//     const response = await requestFn(quickbase);
//     return response;
//   } catch (error) {
//     console.error("API request failed:", error);
//     throw error;
//   }
// };
