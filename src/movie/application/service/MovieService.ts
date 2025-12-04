import { MovieFilter } from '../../domain/api/MovieFilter'
import MovieServiceInterface from '../../domain/interfaces/MovieServiceInterface'
import Movie from '../../domain/model/Movie/Movie'
import NullMovie from '../../domain/model/Movie/NullMovie'
//import LocalRepositoryPort from '../../domain/port/driven/adapter/repository/LocalRepositoryPort'
//import RapidRepositoryPort from '../../domain/port/driven/adapter/repository/RapidRepositoryPort'
import SwapiRepositoryPort from '../../domain/port/driven/adapter/repository/SwapiRepositoryPort'

export default class MovieService implements MovieServiceInterface {
  constructor(
    //private readonly rapidRepository: RapidRepositoryPort,
    private readonly swapiRepository: SwapiRepositoryPort,
    //private readonly localRepository: LocalRepositoryPort
  ) { }

  readonly findByTitle = async (title: string): Promise<Movie[]> => {
    const movies: Movie[] = []
    //const rapidMovies = await this.rapidRepository.findByTitle(title)
    const swapiMovies = await this.swapiRepository.findByTitle(title)
    //const localMovies = await this.localRepository.findByTitle(title)

    //movies.push(...rapidMovies, ...swapiMovies, ...localMovies)
    movies.push(...swapiMovies)
    return movies
  }

  readonly findByFilter = async (filter: MovieFilter): Promise<Movie[]> => {
    const movies: Movie[] = []

    const swapiMovies = await this.swapiRepository.findByFilter(filter)

    movies.push(...swapiMovies)
    return movies
  }

  readonly findById = async (id: string): Promise<Movie> => {
    const swapiMovie = await this.swapiRepository.findById(id);

    if (!swapiMovie.isNull) {
      return swapiMovie
    }

    return new NullMovie()
  }


  readonly findByIdList = async (ids: string[]): Promise<Movie[]> => {
    const movies: Movie[] = []

    const swapiMovies = await this.swapiRepository.findByIdList(ids)

    movies.push(...swapiMovies)

    return movies
  }

  readonly createMovie = async (_movie: Movie): Promise<Movie> => {


    return new NullMovie()
  }



}
