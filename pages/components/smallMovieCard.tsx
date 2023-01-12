import React, { FunctionComponent } from 'react';

interface MovieProps {
    movie: {
        genre_ids: string[],
        id: string,
        vote_average: number,
        vote_count: number,
        release_date: string,
        title: string,
        backdrop_path: string,
        overview: string,
        name?: string,
        first_air_date?: string
    }
}

const SmallMovieCard: FunctionComponent<MovieProps> = ({ movie }: MovieProps) => {

    const image_path = `https://image.tmdb.org/t/p/w500${movie?.backdrop_path}`
    const movie_path = `https://www.themoviedb.org/movie/${movie?.id}`
    
    return (
        <>
            <div className="card w-60 bg-base-100 shadow-xl m-2">
                <figure className="relative">
                    <img src={image_path} alt="Shoes" />
                    <div className="absolute bottom-2 right-2 w-14 h-14 flex bg-white flex-wrap rounded-xl border border-black">
                        <div className="text-2xl w-full flex items-center justify-center">{movie?.vote_average}</div>
                        <div className="text-sm w-full flex items-center justify-center">{movie?.vote_count}</div>
                    </div>
                </figure>
                <div className="">
                    <h4 className="card-title text-base p-2"><a href={movie_path}>{movie?.title ? movie.title : movie?.name ? movie.name : ""}</a></h4>
                </div>
            </div>
        </>
    );
};

export default SmallMovieCard;