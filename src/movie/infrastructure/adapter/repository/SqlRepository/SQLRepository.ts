import MysqlDBC from "../../../../../shared/repository/infrastructure/dbc/local/mysql/LocalMySQLDBC"
import Classification from "../../../../domain/model/Movie/Classification"
import Genre from "../../../../domain/model/Movie/Genre"
import Movie from "../../../../domain/model/Movie/Movie"

export default class SQLRepository {
  private readonly db: MysqlDBC

  constructor() {
    this.db = MysqlDBC.getInstance()
  }

  /**
   * Crea la tabla de movies si no existe
   */
  async createTable(): Promise<void> {
    const sql = `
      CREATE TABLE IF NOT EXISTS movies (
        id VARCHAR(50) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        synopsis TEXT,
        release_date DATE,
        classification ENUM('G','PG','PG-13','PG-14','R','UNKNOWN') DEFAULT 'UNKNOWN',
        genre ENUM('ACTION','ADVENTURE','BIOGRAPHY','CRIME','DOCUMENTARY','FANTASY','HISTORY','MUSIC','MYSTERY','SCIFI','UNKNOWN') DEFAULT 'UNKNOWN'
      )
    `
    await this.db.execute(sql)
  }

  async getById(id: string): Promise<Movie | null> {
  const sql = `SELECT * FROM movies WHERE id = ?`
  const rows = await this.db.query<Movie>(sql, [id])
  return rows[0] ?? null
}


  /**
   * Obtiene varias películas por una lista de ids (reutiliza getById)
   */
  async getByIds(ids: string[]): Promise<Movie[]> {
    const movies: Movie[] = []
    for (const id of ids) {
      const movie = await this.getById(id)
      if (movie) movies.push(movie)
    }
    return movies
  }

  /**
   * Crea una película
   */
  async create(movie: Movie): Promise<void> {
    const sql = `
      INSERT INTO movies (id, title, synopsis, release_date, classification, genre)
      VALUES (?, ?, ?, ?, ?, ?)
    `
    await this.db.execute(sql, [
      movie['id'],
      movie['title'],
      movie['synopsis'],
      movie['release'],
      movie['classification'] ?? Classification.UNKNOWN,
      movie['genre'] ?? Genre.UNKNOWN
    ])
  }
}
