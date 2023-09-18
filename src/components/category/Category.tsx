import categoryStyles from '../../styles/categoryStyles.module.css';
import { useEffect, useState } from 'react';
import { StarIcon } from '@heroicons/react/20/solid';
import { Link } from 'react-router-dom';
//ENUMS
import { CategoryTypeUrl } from '../../enums/CategoryTypeUrl';
type CategoryProps = {
    title?:string;
    url:string;
    type:CategoryTypeUrl;
}
const Category = ({title, url, type }:CategoryProps) => {
    type fetchedDataProps = {
        adult: boolean
        backdrop_path: string
        genre_ids:number[]
        id: 385687
        original_language: string
        original_title?: string
        original_name?: string
        name?:string
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
            const response = await fetch(`https://api.themoviedb.org/3/${url}?language=en-US&api_key=${import.meta.env.VITE_API_KEY_MOVIESTMDB}`);
            const fetchedData = await response.json();
            setData(fetchedData.results);
            console.log(fetchedData);
        }
        movieDB();
        console.log(data);
      },[]);
    return(
        <div  className={categoryStyles['category-wrapper']}>
            {/* <div className={movieCategoryPreviewStyles['movie-title-container']}>
                <h2>{title.toUpperCase()}</h2>
            </div> */}
            {data.length>0 && 
            <div className={categoryStyles['movies-container']}>
                {data.map( (movie) => (
                    <Link to={`/${type}/${movie.id}`} key={movie.id} className={categoryStyles['movie-container']}>
                        <div className={categoryStyles['movie-image-container']}>
                            <img className={categoryStyles['movie-image']} src={`${imagePathWidth500}${movie.poster_path}`} alt="" />     
                        </div>
                        <div className={categoryStyles['movie-details']}>
                            <div className={categoryStyles['movie-ratings']}>
                                <h3>{movie.vote_average}</h3>
                                <div><StarIcon/></div>
                                <span>{`(${movie.vote_count})`}</span>
                            </div>
                            <h3 className={categoryStyles['movie-title']}>{movie.name || movie.original_title || movie.original_name}</h3>
                        </div>
                    </Link>    
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
export default Category;