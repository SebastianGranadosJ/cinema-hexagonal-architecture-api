import { SwapiDBC } from '../../../../../shared/Shared'


import Movie from '../../../../domain/model/Movie/Movie'
import NullMovie from '../../../../domain/model/Movie/NullMovie'
import SwapiRepositoryPort from '../../../../domain/port/driven/adapter/repository/SwapiRepositoryPort'
import { MovieSwapiInterface } from '../../../../domain/interfaces/MovieSwapiInterface'
import { MovieFilter } from '../../../../domain/api/MovieFilter'
import MakerMovie from './MakerMovie'
import MovieFilterValidator from './MovieFilterValidator'

export default class SwapiRepository implements SwapiRepositoryPort {
  private readonly makerMovie: MakerMovie

  constructor(private readonly swapiDBC: SwapiDBC) {

    this.makerMovie = new MakerMovie(swapiDBC)
  }

  readonly findByTitle = async (title: string): Promise<Movie[]> => {
    const films: MovieSwapiInterface[] = await this.swapiDBC.films()

    return Promise.all(
      films.map(async (film) => {
        if (film.title.toLowerCase().includes(title.toLowerCase())) {
          return this.makerMovie.make(film)
        }
        return new NullMovie()
      })
    )
  }


  readonly findByFilter = async (filter: MovieFilter): Promise<Movie[]> => {
    const films: MovieSwapiInterface[] = await this.swapiDBC.films()
    const movies = await Promise.all(films.map(f => this.makerMovie.make(f))) // transformación por fuera
    const validator = new MovieFilterValidator(movies, filter)
    return validator.execute()
  }


  readonly findById = async (id: string): Promise<Movie> => {
    const films: MovieSwapiInterface[] = await this.swapiDBC.films()

    const film = films.find(f => String(f.episode_id) == id);

    if (!film) {

      return Promise.resolve(new NullMovie())
    }

    return this.makerMovie.make(film);


  }


  readonly findByIdList = async (ids: string[]): Promise<Movie[]> => {
    const movies: Movie[] = []

    for (const id of ids) {
      const movie = await this.findById(id)
      movies.push(movie)
    }

    return movies
  }



}
