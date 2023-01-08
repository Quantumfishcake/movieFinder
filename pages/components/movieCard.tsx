import React, { FunctionComponent } from 'react';

interface MovieProps {
    movie: {
        genre_ids: [string],
        id: number,
        vote_average: number,
        vote_count: number,
        release_date: string,
        title: string,
        backdrop_path: string,
        overview: string
    }
}


const MovieCard: FunctionComponent<MovieProps> = ({ movie }: MovieProps) => {

    const image_path = `https://image.tmdb.org/t/p/w500${movie?.backdrop_path}`

    return (
        <>
            <div className="card w-96 bg-base-100 shadow-xl m-2">
                <figure><img src={image_path} alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title">{movie?.title}</h2>
                    <p>{movie?.vote_average}</p>
                    <p>{movie?.release_date}</p>
                    <p>{movie?.overview}</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Buy Now</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MovieCard;