import Head from 'next/head'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'

import { API } from "aws-amplify"
import { useEffect, useState } from "react"

import { withAuthenticator } from "@aws-amplify/ui-react";

import MovieCard from './components/movieCard'

import axios from "axios"

// const inter = Inter({ subsets: ['latin'] })

const myAPI = "getData"
const path = "/users"

const App = () => {
  const [users, setUsers] = useState([])
  const [input, setInput] = useState("")
  const [title, setTitle] = useState("")
  const [yearMin, setYearMin] = useState("")
  const [yearMax, setYearMax] = useState("")
  const [rating, setRating] = useState("")
  const [voteCount, setVoteCount] = useState("")
  const [genre, setGenre] = useState("")

  const [movies, setMovies] = useState([]);

//   const getUser = () => {
//     API.get(myAPI, path + "/" + input).then((res) => {
//       console.log(res)

//       setUsers([...res])
//     })
//   }


  const getMovies = () => {

    const APIKEY = "3aa9de6998765e0677b43353d0ea652f"
    const path = "https://api.themoviedb.org/3/discover/movie?api_key=3aa9de6998765e0677b43353d0ea652f&language=en-US&sort_by=popularity.desc"
    const params = {
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
          <h1 className="">title</h1>
          <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" value={title} onChange={(e) => setTitle(e.target.value)} />
          <h1>year min</h1>
          <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" value={yearMin} onChange={(e) => setYearMin(e.target.value)} />
          <h1>year max</h1>
          <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" value={yearMax} onChange={(e) => setYearMax(e.target.value)} />
          <h1>rating</h1>
          <input type="text" placeholder="Type here" className="input input-bordered  w-full max-w-xs" value={rating} onChange={(e) => setRating(e.target.value)} />
          <h1>vote count</h1>
          <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" value={voteCount} onChange={(e) => setVoteCount(e.target.value)} />
          <h1>genre</h1>
          <input type="text" placeholder="Type here" className="input input-bordered  w-full max-w-xs" value={genre} onChange={(e) => setGenre(e.target.value)} />
          <button onClick={() => getMovies()}>Get movies</button>

        </div>

        <div className='flex flex-wrap'>

          {
            movies.map((movie, index) => {
              console.log(movie)
              return (
                <MovieCard key={index} movie={movie}></MovieCard>
              )
            })
          }
        </div>

      </div>
    </div>
  )
}

export default App

