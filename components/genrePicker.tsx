import React, { FunctionComponent } from 'react';

const genres = [{id: 28, name: "Action"}, {id: 12, name: "Adventure"}, {id: 16, name: "Animation"}, {id: 35, name: "Comedy"}, {id: 80, name: "Crime"}, {id: 99, name: "Documentary"}, {id: 18, name: "Drama"}, {id: 10751, name: "Family"}, {id: 14, name: "Fantasy"}, {id: 36, name: "History"}, {id: 27, name: "Horror"}, {id: 10402, name: "Music"}, {id: 9648, name: "Mystery"}, {id: 10749, name: "Romance"}, {id: 878, name: "Science Fiction"}, {id: 10770, name: "TV Movie"}, {id: 53, name: "Thriller"}, {id: 10752, name: "War"}, {id: 37, name: "Western"}]

interface GenrePickerProps {
    updateGenres: (id:number) => void,
    currentGenres: number[]
}

interface GenreListItemProps extends GenrePickerProps{
    id: number,
    name: string,
}

const GenrePicker: FunctionComponent<GenrePickerProps> = ({updateGenres ,currentGenres}:GenrePickerProps) => {

    const GenreListItem = ({id, name, updateGenres, currentGenres}:GenreListItemProps) => {
        return (
            <div className={"m-1 btn btn-xs no-animation " + (currentGenres.includes(id) ? "btn-primary" : "")} onClick={() => updateGenres(id) }><span className="no_click" >{name}</span></div>
        )
    }

    return (
        <div className="filter">
        <h3>Genres</h3>
        <div id="with_genres" className="multi_select flex justify-center flex-wrap">
            {
                genres.map((genre) => {
                    return (
                        <GenreListItem key={genre.id} id={genre.id} name={genre.name} updateGenres={updateGenres} currentGenres={currentGenres}/>
                    )
                })
            }
        </div>
    </div>
    )
}



export default GenrePicker