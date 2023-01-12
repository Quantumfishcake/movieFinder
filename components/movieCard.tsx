import React, { FunctionComponent, SyntheticEvent } from 'react';
import { Movie } from "../types/mainTypes"


interface MovieProps {
    updateMovieFavouriteStatus: (movie: Movie, addOrDelete: boolean) => void,
    favourited: boolean,
    movie: Movie
}

const MovieCard: FunctionComponent<MovieProps> = ({ movie, favourited, updateMovieFavouriteStatus }: MovieProps) => {

    const image_path = `https://image.tmdb.org/t/p/w500${movie?.backdrop_path}`
    const movie_path = `https://www.themoviedb.org/movie/${movie?.id}`

    // SyntheticEvent<HTMLImageElement, Event> src doesnt exist on type
    const replaceImage = (event: any) => {
        //replacement of broken Image
        event.target.src = "https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg"; 
    }

    return (
        <>
            <div className="card w-60 bg-base-100 shadow-xl m-2">
                <figure className="relative" style={{maxHeight: "135px"}}>
                    <img src={image_path} onError={replaceImage} alt="Shoes" />
                    <div className="absolute bottom-2 right-2 w-14 h-14 flex bg-white flex-wrap rounded-xl border border-black">
                        <div className="text-2xl w-full flex items-center justify-center">{movie?.vote_average}</div>
                        <div className="text-sm w-full flex items-center justify-center">{movie?.vote_count}</div>
                    </div>
                </figure>
                <div className="p-2">
                    <h2 className="card-title text-base"><a href={movie_path}>{movie?.title ? movie.title : movie?.name ? movie.name : ""}</a></h2>
                    <p className='text-sm'>{movie?.release_date ? movie.release_date : movie?.first_air_date ? movie.first_air_date : ""}</p>
                    {/* <p>{movie?.overview.substr(0, 100) + "\u2026"}</p> */}
                    <div className="card-actions justify-end">
                        {
                            favourited ?
                                <button id={"add_" + movie?.id} className="btn btn-primary btn-sm" onClick={() => updateMovieFavouriteStatus(movie, false)}>Remove</button>
                                : <button id={"add_" + movie?.id} className="btn btn-primary btn-sm btn-outline" onClick={() => updateMovieFavouriteStatus(movie, true)}>Favourite</button>
                        }

                    </div>
                </div>
            </div>
        </>
    );
};

export default MovieCard;