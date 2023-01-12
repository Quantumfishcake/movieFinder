
import { useEffect, useState } from "react"

import {getMoviesByIds, retrieveFavourites, deleteMovie} from './components/apis'
import MovieCard from './components/movieCard'

import { UserTypes, Movie } from "./types/mainTypes"

interface FavouriteMovieIds {
    id: String,
    sk: string
}

const Movies = ({user}:UserTypes) => {

    const [movieData, setMovieData] = useState<Movie[]>([])

    const deleteMovieFromFavourites = async (movie: Movie) => {
        deleteMovie(user?.username, movie.id).then(() => {
            const tempFavouriteData = movieData.filter((movie: any) => movie.id !== movie.id)
            setMovieData(tempFavouriteData)
        })
    }


    useEffect(() => {

        const fetchData = async () => {
            const data = await retrieveFavourites(user?.username)
            const listOfFavouriteMovieIds = data?.data.map((obj: FavouriteMovieIds) => obj.sk)
            
            const data2 = await getMoviesByIds(listOfFavouriteMovieIds)
            setMovieData(data2.data.Responses["movieTable-dev"])
        }
        fetchData()

    }, []);
  
    return (
        <div>
            <div id="movi231es" className="flex" style={{ maxWidth: "1072px", margin: "0 auto" }}>
               
            {
                        movieData.length && movieData.length > 0 ?
                        movieData.map((movie, index) => {
                                return (
                                    <MovieCard key={index} movie={movie} updateMovieFavouriteStatus={deleteMovieFromFavourites} favourited={true}></MovieCard>
                                )
                            }) :
                            <div>no res</div>
                    }

            </div>
        </div>
    )
}

export default Movies




