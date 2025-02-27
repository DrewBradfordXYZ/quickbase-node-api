// import { QuickBaseResponseGetFields } from "quickbase";
// import { GetFieldsParams } from "./types/types";
// import { apiRequest } from "./apiRequest";

// // Function to retrieve fields for a specified QuickBase table
// export async function getFields(
//   params: GetFieldsParams
// ): Promise<QuickBaseResponseGetFields> {
//   const { tableId, includeFieldPerms } = params;
//   return apiRequest(tableId, async (quickbase) => {
//     const results = await quickbase.getFields({
//       tableId,
//       includeFieldPerms,
//     });
//     return results;
//   });
// }
