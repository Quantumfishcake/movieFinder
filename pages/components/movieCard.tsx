import React, { FunctionComponent } from 'react';

interface MovieProps {
    addFavourite: Function,
    favouriteData: [],
    user: {
        username: string
    },
    movie: {
        genre_ids: [string],
        id: number,
        vote_average: number,
        vote_count: number,
        release_date: string,
        title: string,
        backdrop_path: string,
        overview: string,
    }
}

const MovieCard: FunctionComponent<MovieProps> = ({ movie, user, favouriteData, addFavourite }: MovieProps) => {

    const image_path = `https://image.tmdb.org/t/p/w500${movie?.backdrop_path}`
    const movie_path = `https://www.themoviedb.org/movie/${movie?.id}`

    return (
        <>
            <div className="card w-80 bg-base-100 shadow-xl m-2">
                <figure className="relative">
                    <img src={image_path} alt="Shoes" />
                    <div className="absolute bottom-2 right-2 w-14 h-14 flex bg-white flex-wrap rounded-xl border border-black">
                        <div className="text-2xl w-full flex items-center justify-center">{movie?.vote_average}</div>
                        <div className="text-sm w-full flex items-center justify-center">{movie?.vote_count}</div>
                    </div>
                </figure>
                <div className="card-body">
                    <h2 className="card-title"><a href={movie_path}>{movie?.title}</a></h2>
                    <p>{movie?.release_date}</p>
                    <p>{movie?.overview.substr(0, 100) + "\u2026"}</p>
                    <div className="card-actions justify-end">
                        {
                            favouriteData && favouriteData.includes((movie?.id).toString()) ? <div>added</div> : <button id={"add_" + movie?.id} className="btn btn-primary" onClick={() => addFavourite(movie?.id)}>Favourite</button>
                        }

                    </div>
                </div>
            </div>
        </>
    );
};

export default MovieCard;