import { SwapiDBC } from "../../../../../shared/Shared"
import { MovieSwapiInterface } from "../../../../domain/interfaces/MovieSwapiInterface"
import Classification from "../../../../domain/model/Movie/Classification"
import Genre from "../../../../domain/model/Movie/Genre"
import Movie from "../../../../domain/model/Movie/Movie"
import NullMovie from "../../../../domain/model/Movie/NullMovie"
import NullStudio from "../../../../domain/model/studio/NullStudio"
import MakerCharacters from "./MakerCharacter"
import MakerDirector from "./MakerDirector"
import MakerProducers from "./MakerProducer"

export default class MakerMovie {

    private readonly makerCharacters: MakerCharacters
    private readonly makerDirector: MakerDirector
    private readonly makerProducers: MakerProducers

    constructor(private readonly swapiDBC: SwapiDBC) {
        this.makerCharacters = new MakerCharacters(this.swapiDBC)
        this.makerDirector = new MakerDirector()
        this.makerProducers = new MakerProducers()
    }


    readonly make = async (movie: MovieSwapiInterface): Promise<Movie> => {

        try {
            const characters = await this.makerCharacters.make(movie.characters)

            const director = this.makerDirector.make(movie.director)

            const producers = this.makerProducers.make(movie.producer)

            return Promise.resolve(new Movie({
                id: String(movie.episode_id),
                title: movie.title,
                synopsis: movie.opening_crawl,
                release: new Date(movie.release_date),
                classification: Classification.UNKNOWN,
                genre: Genre.UNKNOWN,
                characters,
                director,
                producers,
                studio: new NullStudio(),
                images: [],
                trailer: [],
            }))
        } catch (error) {
            console.error('Error parsing producer:', error)
            return Promise.resolve(new NullMovie())
        }

    }
}