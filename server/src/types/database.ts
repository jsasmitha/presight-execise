export type SqlParameter = string | number;

export interface WhereClauseResult {
  where: string;
  params: SqlParameter[];
}