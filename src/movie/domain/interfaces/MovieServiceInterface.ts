import { MovieFilter } from '../api/MovieFilter'
import Movie from '../model/Movie/Movie'

export default interface MovieServiceInterface {
  findByTitle(title: string): Promise<Movie[]>
  findByFilter(filter: MovieFilter): Promise<Movie[]>
  findById(id: string):Promise<Movie>
  findByIdList(ids: string[]):Promise<Movie[]>
  createMovie(movie:Movie): Promise<Movie>
}
