import { Link } from 'react-router-dom';
//STYLES
import categoryStyles from '../../styles/categoryStyles.module.css';
//ICONS
import { StarIcon } from '@heroicons/react/20/solid';
import {ChevronRightIcon, ChevronDoubleRightIcon, ChevronLeftIcon, ChevronDoubleLeftIcon} from '@heroicons/react/20/solid';
//ENUMS
import { CategoryType } from '../../enums/categoryType';

//COMPONENTS
import LoadingSpinner from '../loadingSpinner/LoadingSpinner';
import { useQuery } from 'react-query';
//TYPES
type CategoryProps = {
    url: string;
    categoryType: CategoryType | 'movie' | 'series';
    categoryPageNumber: number;
    setCategoryPageNumber:(value:number) => void;
}


const Category = ({ url, categoryType, categoryPageNumber, setCategoryPageNumber }:CategoryProps) => {
    let totalPages= 0;

    const imagePathWidth154 = `https://image.tmdb.org/t/p/w154/`;
/*     const {data, isLoaded, error} = useApi(url, categoryPageNumber);
 */    
 
    const {data, status } = useQuery(['category', url, categoryPageNumber], async () => {
        const response = await fetch(`https://api.themoviedb.org/3/${url}&page=${categoryPageNumber}&api_key=${import.meta.env.VITE_API_KEY_MOVIESTMDB}`)        
        return response.json();
    });
    
    function totalPagesCounter () {
        totalPages= data.total_pages;
        if(data.total_pages>=500) {
            totalPages = 500;
        }
        return totalPages;
    }
     
    return(
        <>
        <div  className={categoryStyles['category-wrapper']}>
            {/*LOADING */}
            {status ==='loading' && 
            <div className={categoryStyles['category-wrapper']}>
                <div >
                    <LoadingSpinner />
                </div>
            </div>
            }

            {/*MOVIES CONTAINER */}
            {status==='success'  && 
                <>
                <div className={categoryStyles['total-pages-details']}>
                    <h3>  {data.total_results} results</h3>
                </div>
                <div className={categoryStyles['movies-container']}>
                    
                    {data.results.map( (movie:any) => (
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
                                    <img loading='lazy' className={categoryStyles['movie-image']} src={`${imagePathWidth154}${movie.poster_path}`} alt='movie image' />     
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
                
            
                    
                {/* CATEGORY PAGES NAVIGATION */}
                
                <div className={categoryStyles['pages-container']}>
                    <button
                        title='First page'
                        onClick={()=> setCategoryPageNumber(1)}
                    >
                        <ChevronDoubleLeftIcon/>
                    </button>

                    <button 
                        title='Previous page'                
                        onClick={()=> {
                            if(data.page<=1)return;
                            setCategoryPageNumber(data.page-1);
                            window.scrollTo(0, 0);
                            }
                        }  
                    >
                        <ChevronLeftIcon/>
                    </button>  

                    <span>{`${data.page}/${totalPagesCounter()}`}</span>

                    <button
                        title='Next page'   
                        onClick={()=> {
                            if(data.page>=totalPagesCounter())return;
                            setCategoryPageNumber(data.page+1)
                            window.scrollTo(0, 0)

                        }}
                    >
                        <ChevronRightIcon/>
                    </button>

                    <button
                        title='Last page'   
                        onClick={()=> {  
                        if(data.page>=totalPagesCounter())return;
                        setCategoryPageNumber(totalPagesCounter());
                            window.scrollTo(0, 0)
                        }}
                    >
                        <ChevronDoubleRightIcon/>
                    </button>
                </div>
                </>
            }

            {/*ERROR */}
            { status ==='error' &&
                <div className={categoryStyles['no-results-container']}>
                    <h3> Error fetching data </h3>
                </div>    
            }
            
            {/*NO RESULTS */}
            {status==='success' && data.results.length===0 &&
                <div className={categoryStyles['no-results-container']}>
                    <h3>NO RESULTS</h3>
                </div>    
            }
        </div>
        </>

    )
}
export default Category;