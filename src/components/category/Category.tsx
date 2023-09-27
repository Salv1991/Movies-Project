import { Link } from 'react-router-dom';
//STYLES
import categoryStyles from '../../styles/categoryStyles.module.css';
//ICONS
import { StarIcon } from '@heroicons/react/20/solid';
import {ChevronRightIcon, ChevronDoubleRightIcon, ChevronLeftIcon, ChevronDoubleLeftIcon} from '@heroicons/react/20/solid';
//ENUMS
import { CategoryType } from '../../enums/categoryType';
//HOOKS
import { useApi } from '../../hooks/useApi';
//COMPONENTS
import LoadingSpinner from '../loadingSpinner/LoadingSpinner';
//TYPES
type CategoryProps = {
    url: string;
    categoryType: CategoryType | 'movie' | 'series';
    categoryPageNumber: number;
    setCategoryPageNumber:(value:number) => void;
}


const Category = ({ url, categoryType, categoryPageNumber, setCategoryPageNumber }:CategoryProps) => {
    const imagePathWidth500 = `https://image.tmdb.org/t/p/w500/`;
    const {data, isLoaded, error, setCategoryPageNumber: setPage} = useApi(url, categoryPageNumber, setCategoryPageNumber);
    let totalPages= data.total_pages;
    if(data.total_pages>=500) {
        totalPages = 500;
   }
    return(
        <>
        <div  className={categoryStyles['category-wrapper']}>
            {/*LOADING */}
            {!isLoaded && !error &&
            <div className={categoryStyles['category-wrapper']}>
                <div >
                    <LoadingSpinner />
                </div>
            </div>
            }

            {/*MOVIES CONTAINER */}
            {data.results && isLoaded && 
            <>
            <div className={categoryStyles['total-pages-details']}>
                <h3>  {data.total_results} results</h3>
             </div>
            <div className={categoryStyles['movies-container']}>
                
                {data.results.map( (movie) => (
                    <Link
                        reloadDocument  
                        to={`/${categoryType}/${movie.id}`} 
                        key={movie.id} 
                        className={categoryStyles['movie-container']}
                    >
                        <div className={categoryStyles['movie-image-container']}>
                            {movie.poster_path==null ? (
                                <img loading='lazy' className={`${categoryStyles['placeholder-image']} ${categoryStyles['movie-image']}`} src='/images/placeholder-image.svg' alt="placeholder image" />     
                            ):(
                                <img loading='lazy' className={categoryStyles['movie-image']} src={`${imagePathWidth500}${movie.poster_path}`} alt="" />     
                            )
                            }
                        </div>
                        <div className={categoryStyles['movie-details']}>
                        <h3 className={categoryStyles['movie-title']}>{movie.title || movie.name || movie.original_title || movie.original_name || 'Name not found'}</h3>
                            <p className={categoryStyles['movie-overview']}>{movie.overview===''? 'no summary available': movie.overview}</p>
                            <div className={categoryStyles['movie-ratings']}>
                                <h3>{movie.vote_average.toFixed(1)}</h3>
                                <div><StarIcon/></div>
                                <span>{`(${movie.vote_count})`}</span>
                            </div>
                        </div>
                    </Link>    
                ))}
            </div>
            
            </>
            }
            { !isLoaded &&  error && 
                <div className={categoryStyles['no-results-container']}>
                    <h3> Error </h3>
                </div>    
            }
            
            {/*NO RESULTS */}
            {data.results!==undefined && data.results.length===0 && isLoaded && 
                <div className={categoryStyles['no-results-container']}>
                    <h3>NO RESULTS</h3>
                </div>    
            }
            {/* CATEGORY PAGES NAVIGATION */}
            <div className={categoryStyles['pages-container']}>
                <button
                    title='First page'
                    onClick={()=> setPage(1)}
                >
                    <ChevronDoubleLeftIcon/>
                </button>

                <button 
                    title='Previous page'                
                    onClick={()=> {
                        if(data.page<=1)return;
                        setPage(data.page-1);
                        window.scrollTo(0, 0);
                        }
                    }  
                >
                    <ChevronLeftIcon/>
                </button>  

                <span>{`${data.page}/${totalPages}`}</span>

                <button
                    title='Next page'   
                    onClick={()=> {
                        if(data.page>=totalPages)return;
                        setPage(data.page+1)
                        window.scrollTo(0, 0)

                    }}
                >
                    <ChevronRightIcon/>
                </button>

                <button
                    title='Last page'   
                    onClick={()=> {  
                    if(data.page>=totalPages)return;
                        setPage(totalPages);
                        window.scrollTo(0, 0)
                    }}
                >
                    <ChevronDoubleRightIcon/>
                </button>
            </div>
        </div>
        </>

    )
}
export default Category;