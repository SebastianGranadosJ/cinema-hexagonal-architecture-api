import EnvMysqlInterface from "../../../../../../movie/domain/interfaces/EnvMysqlInterface"
import env_json from '../../../../../../../env/.dbc.json'

export default class MysqlProvider {
  private readonly env: EnvMysqlInterface

  constructor() {
    this.env = env_json as EnvMysqlInterface

    if (!this.env || !this.env.MYSQL) {
      throw new Error('Invalid MYSQL configuration')
    }
  }

  readonly config = () => ({
    host: this.env.MYSQL.HOST,
    user: this.env.MYSQL.USER,
    password: this.env.MYSQL.PASSWORD,
    database: this.env.MYSQL.DATABASE,
    port: this.env.MYSQL.PORT ?? 3306,
  })
}
