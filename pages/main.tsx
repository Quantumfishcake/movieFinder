import { useEffect, useState } from "react"

import MovieCard from './components/movieCard'
import SmallMovieCard from './components/smallMovieCard'
import InputQuery from './components/input'

import { retrieveFavourites, addToFavourites, addMovie, deleteMovie } from './components/apis'

import axios from "axios"
import bg3 from '../public/bg3.webp'
import { Movie } from "./types/mainTypes"

import GenrePicker from './components/genrePicker'
interface User {
    user: {
        username: string;
    }
}
interface FavouriteMovieIds {
    id: String,
    sk: string
}

const App = ({ user }: User) => {
    const [title, setTitle] = useState("")
    const [yearMin, setYearMin] = useState("")
    const [yearMax, setYearMax] = useState("")
    const [rating, setRating] = useState("")
    const [voteCount, setVoteCount] = useState("")
    const [genres, setGenres] = useState<number[]>([])
    const [favouriteData, setFavouriteData] = useState<string[]>([])
    const [movies, setMovies] = useState<Movie[]>([]);
    const [popularMovies, setpopularMovies] = useState<Movie[]>([]);
    const [tvOrMovie, setTvOrMovie] = useState("movie")
    const [searchedForMovie, setsearchedForMovie] = useState(false)

    useEffect(() => {

        getPopularMovies()

        const fetchData = async () => {
            const data = await retrieveFavourites(user?.username)
            const listOfFavouriteMovieIds = data?.data.map((obj: FavouriteMovieIds) => obj.sk)
            setFavouriteData(listOfFavouriteMovieIds)
        }
        fetchData()

    }, []);

    const addOrDeleteMovieFromFavourite = async (movie: Movie, addOrDelete:boolean) => {
        // true = add, false = remove
        if (addOrDelete) {
            addToFavourites(user?.username, movie?.id).then(() => {
                const tempFavouriteData = [movie?.id.toString(), ...favouriteData]
                setFavouriteData(tempFavouriteData)
            })
            addMovie(movie)
        } else {
            deleteMovie(user?.username, movie?.id).then(() => {
                const tempFavouriteData = favouriteData.filter((movieId) => movieId !== movie?.id.toString())
                setFavouriteData(tempFavouriteData)
            })
        }

    }

    const searchMovies = () => {

        const APIKEY = "3aa9de6998765e0677b43353d0ea652f"
        const path = `https://api.themoviedb.org/3/discover/${tvOrMovie}?api_key=3aa9de6998765e0677b43353d0ea652f&language=en-US&sort_by=popularity.desc`

        const yearParams = tvOrMovie === "movie" ? { "primary_release_date.gte": yearMin, "primary_release_date.lte": yearMax } : { "first_air_date.gte": yearMin, "first_air_date.lte": yearMax }

        const params = {
            "with_keywords": title,
            "with_genres": genres.join(","), // 35, 18, 10749
            ...yearParams,
            "vote_average.gte": rating,
            "vote_count.gte": voteCount
        }

        const filteredParams = Object.entries(params).reduce((acc, [k, v]) => v ? { ...acc, [k]: v } : acc, {});

        axios
            .get(path, {
                params: filteredParams,
            })
            .then(function (response) {
                response.data.results.forEach((movie: Movie) => movie.id = movie.id.toString())
                setMovies(response.data.results)
                setsearchedForMovie(true)
            })
            .catch(function (error) {
                console.error(error);
            });

        // https://api.themoviedb.org/3/discover/movie?api_key=3aa9de6998765e0677b43353d0ea652f&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&release_date.gte=2004&vote_count.gte=1000&vote_average.gte=8&with_genres=35&with_watch_monetization_types=flatrate
    }

    const getMovies = async (page = 1) => {
        const APIKEY = "3aa9de6998765e0677b43353d0ea652f"
        const path = `https://api.themoviedb.org/3/search/multi?api_key=3aa9de6998765e0677b43353d0ea652f&language=en-US`
        const params = {
            "query": title,
            "page": page
        }

        axios
            .get(path, {
                params: params,
            })
            .then(function (response) {
                response.data.results.forEach((movie: Movie) => movie.id = movie.id.toString())
                setMovies(response.data.results)
                setsearchedForMovie(true)
            })
            .catch(function (error) {
                console.error(error);
            });
    }

    const getPopularMovies = async (page = 1) => {
        const APIKEY = "3aa9de6998765e0677b43353d0ea652f"
        const path = `https://api.themoviedb.org/3/${tvOrMovie}/popular?api_key=3aa9de6998765e0677b43353d0ea652f&language=en-US&page=1`
        const params = {
            "page": page
        }

        axios
            .get(path, {
                params: params,
            })
            .then(function (response) {
                response.data.results.forEach((movie: Movie) => movie.id = movie.id.toString())
                setpopularMovies(response.data.results)
            })
            .catch(function (error) {
                console.error(error);
            });
    }

    const switchTvOrMovie = (tvOrMovie: string) => {
        setTvOrMovie(tvOrMovie)
        getPopularMovies()
    }

    const updateGenres = (genre: number) => {
        if (genres.indexOf(genre) === -1) {
            setGenres([...genres, genre])
        } else {
            const newGenres = genres.filter((g) => g !== genre)
            setGenres(newGenres)
        }
    }

    return (
        <div>
            <div id="searchContainer" style={{
                backgroundImage: `url(${bg3.src})`,
                width: '100%',
                height: '100%',
                minHeight: '300px',
                backgroundSize: 'cover'

            }}
                className="p-10">
                <div style={{ maxWidth: '1024px', margin: '0 auto' }}>
                    <div>
                        <button className={`btn btn-primary mx-2  ${tvOrMovie === 'movie' ? "btn-outline" : ""}`} onClick={() => switchTvOrMovie("movie")}>Movie</button>
                        <button className={`btn btn-primary ${tvOrMovie === 'tv' ? "btn-outline" : ""}`} onClick={() => switchTvOrMovie("tv")}>Tv</button>
                    </div>

                    <div className="flex items-end">
                        <InputQuery title={"title"} value={title} updateFunc={setTitle} />
                        <button className="btn m-2" onClick={() => getMovies()}>Search {tvOrMovie}</button>
                    </div>

                    <div className="flex items-end justify-between">
                        <InputQuery title={"year min"} value={yearMin} updateFunc={setYearMin} size={'-sm'} />
                        <InputQuery title={"year max"} value={yearMax} updateFunc={setYearMax} size={'-sm'} />
                        <InputQuery title={"rating"} value={rating} updateFunc={setRating} size={'-sm'} />
                        <InputQuery title={"vote count"} value={voteCount} updateFunc={setVoteCount} size={'-sm'} />

                        <button className="btn" onClick={() => searchMovies()}>Find {tvOrMovie}</button>

                    </div>
                    <GenrePicker updateGenres={updateGenres} currentGenres={genres} />

                </div>

            </div>
            <div id="movies" style={{ maxWidth: "1072px", margin: "0 auto" }}>
                <div id="searchMovieContainer" className='flex flex-wrap justify-center m-6'>

                    {
                        movies.length && movies.length > 0 ?
                            movies.map((movie, index) => {
                                const favourited = favouriteData.includes(movie?.id)
                                return (
                                    <MovieCard key={index} movie={movie} updateMovieFavouriteStatus={addOrDeleteMovieFromFavourite} favourited={favourited}></MovieCard>
                                )
                            }) :
                            !searchedForMovie && popularMovies.length && popularMovies.length > 0 ?
                                popularMovies.map((movie, index) => {
                                    const favourited = favouriteData.includes(movie?.id)
                                    return (
                                        <MovieCard key={index} movie={movie} updateMovieFavouriteStatus={addOrDeleteMovieFromFavourite} favourited={favourited}></MovieCard>
                                    )
                                }) :
                                <div>No items find that matched your query</div>
                    }
                </div>

            </div>
        </div>
    )
}

export default App

