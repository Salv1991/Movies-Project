import { useEffect, useState } from 'react';
import { StarIcon } from '@heroicons/react/20/solid';
import categoryStyles from '../../styles/categoryStyles.module.css';
type Genre = {
    id: number;
    name: string;
}
type MovieCategoryPreviewProps = {
  genre: Genre;
}
const SearchById = ({genre}:MovieCategoryPreviewProps) => {
    type fetchedDataProps = {
        adult: boolean
        backdrop_path: string
        genre_ids:number[]
        id: 385687
        original_language: string
        original_title?: string
        original_name?: string
        overview: string
        popularity: number
        poster_path:string
        release_date:string
        title:string
        video: boolean
        vote_average: number
        vote_count:number
    }
    const imagePathWidth500 = `https://image.tmdb.org/t/p/w500/`;
    const [data, setData] = useState<fetchedDataProps[]>([]);
    useEffect(() => {
        async function movieDB() {         
            const response = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genre}&api_key=${import.meta.env.VITE_API_KEY_MOVIESTMDB}`);

            const fetchedData = await response.json();
            setData(fetchedData.results);
            console.log("Animation",fetchedData);
        }
        movieDB();
        console.log("Animation",data);
      },[]);
    return(
        <div  className={categoryStyles['category-wrapper']}>
            {/* <div className={movieCategoryPreviewStyles['movie-title-container']}>
                <h2>{title.toUpperCase()}</h2>
            </div> */}
            {data.length>0 && 
            <div className={categoryStyles['movies-container']}>
                {data.slice(0,6).map( (movie) => (
                    <div key={movie.id} className={categoryStyles['movie-container']}>
                        <div className={categoryStyles['movie-image-container']}>
                            <img className={categoryStyles['movie-image']} src={`${imagePathWidth500}${movie.poster_path}`} alt="" />     
                        </div>
                        <div className={categoryStyles['movie-details']}>
                            <div className={categoryStyles['movie-ratings']}>
                                {movie.vote_average}<StarIcon/><span>{`(${movie.vote_count})`}</span>
                            </div>
                            <h3 className={categoryStyles['movie-title']}>{movie.original_title || movie.original_name}</h3>
                        </div>
                    </div>    
                ))}
            </div>
            }
            {data.length===0 &&
            <div className={categoryStyles['movies-container']}><h3>No results error</h3>
            </div>
                
            }
        </div>
    )
}
export default SearchById;