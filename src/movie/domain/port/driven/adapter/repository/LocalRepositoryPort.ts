
import Repository from '../../../../../../shared/repository/domain/model/interfaces/Repository'
import Movie from '../../../../model/Movie/Movie'

export default interface LocalRepositoryPort extends Repository<string, Movie> {
  findByTitle: (title: string) => Promise<Movie[]>
}
