import { Link } from 'react-router-dom';
//STYLES
import categoryStyles from '../../styles/categoryStyles.module.css';
//ICONS
import { StarIcon } from '@heroicons/react/20/solid';
//ENUMS
import { CategoryType } from '../../enums/categoryType';
//HOOKS
import { useApi } from '../../hooks/useApi';


type CategoryProps = {
    url: string;
    categoryType: CategoryType | 'movie' | 'series';
}
const Category = ({ url, categoryType }:CategoryProps) => {
    const imagePathWidth500 = `https://image.tmdb.org/t/p/w500/`;
    const {data, isLoaded} = useApi(url);
    return(
        <div  className={categoryStyles['category-wrapper']}>
            {data && isLoaded && 
            <div className={categoryStyles['movies-container']}>
                {data.map( (movie) => (
                    <Link reloadDocument  to={`/${categoryType}/${movie.id}`} key={movie.id} className={categoryStyles['movie-container']}>
                        <div className={categoryStyles['movie-image-container']}>
                            {movie.poster_path==null ? (
                                <img className={`${categoryStyles['placeholder-image']} ${categoryStyles['movie-image']}`} src='/images/placeholder-image2.jpg' alt="" />     
                            ):(
                                <img className={categoryStyles['movie-image']} src={`${imagePathWidth500}${movie.poster_path}`} alt="" />     
                            )
                            }
                        </div>
                        <div className={categoryStyles['movie-details']}>
                            <div className={categoryStyles['movie-ratings']}>
                                <h3>{movie.vote_average.toFixed(1)}</h3>
                                <div><StarIcon/></div>
                                <span>{`(${movie.vote_count})`}</span>
                            </div>
                            <h3 className={categoryStyles['movie-title']}>{movie.name || movie.original_title || movie.original_name}</h3>
                        </div>
                    </Link>    
                ))}
            </div>
            }
            {data.length===0 && isLoaded && 
                <div className={categoryStyles['no-results-container']}>
                    <h3>No results</h3>
                </div>    
            }
        </div>
    )
}
export default Category;