import type {
  ExecuteValues,
  Pool,
  PoolConnection,
  ResultSetHeader,
  RowDataPacket,
} from 'mysql2/promise';

export type DbClient = Pool | PoolConnection;

export const queryRows = async <T extends RowDataPacket>(
  client: DbClient,
  sql: string,
  values: readonly unknown[] = [],
): Promise<T[]> => {
  const [rows] = await client.execute(sql, [...values] as ExecuteValues[]);
  return rows as T[];
};

export const executeStatement = async (
  client: DbClient,
  sql: string,
  values: readonly unknown[] = [],
): Promise<ResultSetHeader> => {
  const [result] = await client.execute(sql, [...values] as ExecuteValues[]);
  return result as ResultSetHeader;
};
