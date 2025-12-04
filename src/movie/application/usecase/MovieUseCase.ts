import { MovieFilter } from "../../domain/api/MovieFilter"
import MovieServiceInterface from "../../domain/interfaces/MovieServiceInterface"
import Movie from "../../domain/model/Movie/Movie"
import NullMovie from "../../domain/model/Movie/NullMovie"
import MovieUseCasePort from "../../domain/port/driver/usecase/MovieUseCasePort"


export default class MovieUseCase implements MovieUseCasePort {
  constructor(private readonly movieService: MovieServiceInterface) {}

  readonly register = async (movie: Movie): Promise<Movie> => {
    return this.movieService.createMovie(movie)
  }

  readonly search = async (filter: MovieFilter): Promise<Movie[]> => {
  
    // en cualquier otro caso usamos findByFilter
    return this.movieService.findByFilter(filter)
  }

  readonly getById = async (id: string): Promise<Movie> => {
    if (!id) {
      return new NullMovie()
    }
    return this.movieService.findById(id)
  }

  readonly getByIdList = async (list: string[]): Promise<Movie[]> => {
    if (!list || list.length === 0) {
      return []
    }
    return this.movieService.findByIdList(list)
  }
}
