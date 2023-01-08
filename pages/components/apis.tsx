import axios from "axios";

const path = "https://a3g5kgsil8.execute-api.ap-southeast-1.amazonaws.com/dev/movie"

const addToFavourites = (userId, movieId) => {
    const body = { id: userId, sk:movieId.toString() };
    return axios.put(path, body)
}
const retrieveFavourites = async (userId) => {
    return axios.get(path + "/" + userId)
}

export {addToFavourites, retrieveFavourites}