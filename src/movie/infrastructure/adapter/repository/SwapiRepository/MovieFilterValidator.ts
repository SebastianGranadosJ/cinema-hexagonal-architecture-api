import { MovieFilter } from "../../../../domain/api/MovieFilter"
import Movie from "../../../../domain/model/Movie/Movie"

export default class MovieFilterValidator {
  private movies: Movie[]
  private filter: MovieFilter

  constructor(movies: Movie[], filter: MovieFilter) {
    this.movies = movies
    this.filter = filter
  }

  readonly execute = (): Movie[] => {
    return this.movies.filter((movie) => {
      // title
      if (this.filter.title && !movie.getTitle().toLowerCase().includes(this.filter.title.toLowerCase())) {
        return false
      }

      // synopsis
      if (this.filter.synopsis && !movie.getSynopsis().toLowerCase().includes(this.filter.synopsis.toLowerCase())) {
        return false
      }

      if (this.filter.release) {
        const toISODate = (d: unknown): string => {
          const dt = d instanceof Date ? d : new Date(String(d))
          if (isNaN(dt.getTime())) return ""             // valor inválido
          return dt.toISOString().slice(0, 10)           // "YYYY-MM-DD"
        }

        const movieRelease = toISODate(movie.getRelease())
        const filterRelease = toISODate(this.filter.release as unknown)

        if (!filterRelease || movieRelease !== filterRelease) {
          return false
        }
      }

      // classification
      if (this.filter.classification && movie.getClassification() !== this.filter.classification.toUpperCase()) {
        return false
      }

      // genre
      if (this.filter.genre && movie.getGenre() !== this.filter.genre.toUpperCase()) {
        return false
      }

      // characters
      if (this.filter.characters) {
        const charactersArray = Array.isArray(this.filter.characters)
          ? this.filter.characters
          : String(this.filter.characters).split(",").map((c) => c.trim())

        const filterChars = charactersArray.map((c) => c.toLowerCase())
        const movieChars = movie
          .getCharacters()
          .map((c) => `${c.getNames()} ${c.getSurnames()}`.toLowerCase())

        const allMatch = filterChars.every((c) => movieChars.includes(c))
        if (!allMatch) return false
      }

      // director
      if (this.filter.director) {
        const filterDirector = this.filter.director.toLowerCase()
        const movieDirector = `${movie.getDirector().getNames()} ${movie.getDirector().getSurnames()}`.toLowerCase()
        if (filterDirector !== movieDirector) return false
      }

      // producers
      if (this.filter.producers) {
        const producersArray = Array.isArray(this.filter.producers)
          ? this.filter.producers
          : String(this.filter.producers).split(",").map((p) => p.trim())

        const filterProducers = producersArray.map((p) => p.toLowerCase())
        const movieProducers = movie
          .getProducers()
          .map((p) => `${p.getNames()} ${p.getSurnames()}`.toLowerCase())

        const allMatch = filterProducers.every((fp) => movieProducers.includes(fp))
        if (!allMatch) return false
      }

      // studio
      if (this.filter.studio && movie.getStudio().getName() !== this.filter.studio) {
        return false
      }

      return true
    })
  }
}
