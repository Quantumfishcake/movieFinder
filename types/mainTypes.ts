interface UserTypes{
    user: {
        Session: string,
        username:string
    }
}

interface Movie {
    adult: boolean,
    backdrop_path: string,
    genre_ids: string[],
    id: string
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    release_date: string
    title?: string
    video: boolean
    vote_average: number
    vote_count: number,
    first_air_date?: string,
    name?: string
}

export type {UserTypes, Movie}