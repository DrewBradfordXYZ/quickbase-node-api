export interface GetFieldsParams {
  tableId: string;
  includeFieldPerms?: boolean;
}

export interface QuickBaseClientOptions {
  realm: string;
  dbid: string;
  userToken?: string;
  mode?: string;
}
