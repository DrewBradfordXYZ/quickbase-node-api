import { QuickBase } from 'quickbase';
import { QuickBaseResponseGetFields } from 'quickbase';

export declare const apiRequest: <T>(dbid: string, requestFn: (quickbase: QuickBase) => Promise<T>) => Promise<T>;

export declare function getFields(params: GetFieldsParams): Promise<QuickBaseResponseGetFields>;

export declare interface GetFieldsParams {
    tableId: string;
    includeFieldPerms?: boolean;
}

export declare const quickbaseClient: (dbid: string) => Promise<QuickBase>;

export { }
