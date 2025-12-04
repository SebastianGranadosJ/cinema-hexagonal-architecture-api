export default interface EnvMysqlInterface {
  MYSQL: {
    HOST: string
    USER: string
    PASSWORD: string
    DATABASE: string
    PORT?: number
  }
}
