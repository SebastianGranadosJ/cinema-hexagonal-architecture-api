import mysql, { Pool, RowDataPacket } from 'mysql2/promise'
import MysqlProvider from './MySQLProvider'

export default class MySqlDBC {
  private static instance: MySqlDBC
  private readonly pool: Pool

  private constructor() {
    const provider = new MysqlProvider()
    this.pool = mysql.createPool(provider.config())
  }

  static readonly getInstance = (): MySqlDBC => {
    MySqlDBC.instance = this.instance ?? new MySqlDBC()
    return MySqlDBC.instance
  }

  readonly query = async <T = any>(sql: string, params?: any[]): Promise<T[]> => {
    const [rows] = await this.pool.query<RowDataPacket[]>(sql, params)
    return rows as T[]
  }

  readonly execute = async (sql: string, params?: any[]): Promise<void> => {
    await this.pool.execute(sql, params)
  }

  readonly close = async (): Promise<void> => {
    await this.pool.end()
  }
}
