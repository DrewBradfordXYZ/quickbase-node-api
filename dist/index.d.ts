import { QuickBaseResponseGetApp } from "quickbase";

export interface QuickBaseClientOptions {
  realm: string;
  dbid: string;
  userToken?: string;
  mode?: string;
}

export interface GetFieldsParams {
  tableId: string;
  includeFieldPerms?: boolean;
}

export declare class QuickBaseClient {
  private options: QuickBaseClientOptions;
  private quickbase: any;
  private tokenKey: string;
  private constructor(options: QuickBaseClientOptions);
  static initialize(options: QuickBaseClientOptions): Promise<QuickBaseClient>;
  getApp(appId: string): Promise<QuickBaseResponseGetApp>;
}
