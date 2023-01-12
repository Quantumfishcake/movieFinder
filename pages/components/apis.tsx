import axios from "axios";
import { Movie } from "../types/mainTypes";

const path = "https://a7lbd2brxl.execute-api.ap-southeast-1.amazonaws.com/dev/movie"

const addToFavourites = (userId:string, movieId:string) => {
    console.log('movies id', movieId)
    const body = { id: userId, sk:movieId.toString() };
    return axios.put(path, body)
}

const addMovie = (movieData:Movie) => {
    const body = { sk:'movie', ...movieData };
    return axios.put(path, body)
}

const retrieveFavourites = async (userId:string) => {
    return axios.get(path + "/" + userId)
}

// delete movie from db and from user's favourite list
const deleteMovie = (userId:string, movieId:string) => {
    const body = { id: userId, sk:movieId.toString() };
    return axios.delete(path + "/object/" + userId + "/" + movieId, {data: body})
}

const getMoviesByIds = (ids:string[]) => {
    console.log('ids', ids)

    const movieIds = ids.map((id) => {
        return {"id": id, "sk": "movie"}
    })

    const body = {
        "movieList": [
           ...movieIds
        ]
    }
    return axios.post("https://a7lbd2brxl.execute-api.ap-southeast-1.amazonaws.com/dev/movies", body)
}

export {addToFavourites, retrieveFavourites, getMoviesByIds, addMovie, deleteMovie}