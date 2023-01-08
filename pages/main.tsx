import Head from 'next/head'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'

import { API } from "aws-amplify"
import { useEffect, useState } from "react"

import { ComponentPropsToStylePropsMap, withAuthenticator } from "@aws-amplify/ui-react";

import MovieCard from './components/movieCard'
import InputQuery from './components/input'


import { retrieveFavourites, addToFavourites } from './components/apis'

import axios from "axios"

// const inter = Inter({ subsets: ['latin'] })

const myAPI = "getData"
const path = "/users"

const App = ({user}) => {
  const [users, setUsers] = useState([])
  const [input, setInput] = useState("")
  const [title, setTitle] = useState("")
  const [yearMin, setYearMin] = useState("")
  const [yearMax, setYearMax] = useState("")
  const [rating, setRating] = useState("")
  const [voteCount, setVoteCount] = useState("")
  const [genre, setGenre] = useState("")
  const [favouriteData, setFavouriteData] = useState([])

  const [movies, setMovies] = useState([]);

//   const getUser = () => {
//     API.get(myAPI, path + "/" + input).then((res) => {
//       console.log(res)

//       setUsers([...res])
//     })
//   }

const getMovies2 = () => {
    const body = {
        "movieList": [{"id":"315162", "sk":"movie"}]
    }
    axios.put("https://a3g5kgsil8.execute-api.ap-southeast-1.amazonaws.com/dev/list", body)
}


useEffect(() => {

    const fetchData = async () => {
        const data =  await retrieveFavourites(user?.username)
        const listOfFavouriteMovieIds = data?.data.map(obj => obj.sk)
        setFavouriteData(listOfFavouriteMovieIds)
      }
      fetchData()
   

  },[]);

  const addMovieToFavouriteList = async (movieId) => {
    addToFavourites(user?.username, movieId).then(res => {
       const tempFavouriteData = [movieId.toString(), ...favouriteData]
       setFavouriteData(tempFavouriteData)
    })
}

  const getMovies = () => {

    const APIKEY = "3aa9de6998765e0677b43353d0ea652f"
    const path = "https://api.themoviedb.org/3/discover/movie?api_key=3aa9de6998765e0677b43353d0ea652f&language=en-US&sort_by=popularity.desc"
    const params = {
      "with_keywords": title,
      "with_genres": genre,
      "release_date.gte": yearMin,
      "release_date.lte": yearMax,
      "vote_average.gte": rating,
      "vote_count.gte": voteCount
    }

    const filteredParams = Object.entries(params).reduce((acc, [k, v]) => v ? { ...acc, [k]: v } : acc, {});

    axios
      .get(path, {
        params: filteredParams,
      })
      .then(function (response) {
        console.log(response.data);
        setMovies(response.data.results)
      })
      .catch(function (error) {
        console.error(error);
      });

    // https://api.themoviedb.org/3/discover/movie?api_key=3aa9de6998765e0677b43353d0ea652f&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&release_date.gte=2004&vote_count.gte=1000&vote_average.gte=8&with_genres=35&with_watch_monetization_types=flatrate
  }

  return (
    <div>
      <div id="movies">
        <div id="search" className="flex">

          <InputQuery title={"title"} value={title} updateFunc={setTitle}/>
          <InputQuery title={"year min"} value={yearMin} updateFunc={setYearMin}/>
          <InputQuery title={"year max"} value={yearMax} updateFunc={setYearMax}/>
          <InputQuery title={"rating"} value={rating} updateFunc={setRating}/>
          <InputQuery title={"vote count"} value={voteCount} updateFunc={setVoteCount}/>
          <InputQuery title={"genre"} value={genre} updateFunc={setGenre}/>

          <button className="btn" onClick={() => getMovies()}>Get movies</button>
          <button className="btn" onClick={() => getMovies2()}>Get movies2222</button>

        </div>

        <div className='flex flex-wrap'>

          {
            movies.length && movies.length > 0 ?
            movies.map((movie, index) => {
              console.log(movie)
              return (
                <MovieCard key={index} movie={movie} addFavourite={addMovieToFavouriteList} favouriteData={favouriteData}></MovieCard>
              )
            }) :
            <div>no res</div>
          }
        </div>

      </div>
    </div>
  )
}

export default App

