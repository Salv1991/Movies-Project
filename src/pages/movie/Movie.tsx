import { useParams } from "react-router-dom";
import { CalendarIcon, ClockIcon } from "@heroicons/react/20/solid";
//STYLES
import movieStyles from './movieStyles.module.css';
import Category from "../../components/category/Category";
import { CategoryContainer } from "../../components/categoryContainer/CategoryContainer";
import { useApiSearchById } from "../../hooks/useApi";
import { CategoryTypeUrl } from "../../enums/CategoryTypeUrl";

type MovieProps = {
    linkType:string;
    mediaType: string;
}
const Movie = ({linkType, mediaType}:MovieProps) => {
    const {id} = useParams();
    const imagePathWidth500 = `https://image.tmdb.org/t/p/w500/`;
    const imagePathWidth1000 = `https://image.tmdb.org/t/p/w1280/`;
 
    const{ data, isLoaded, error} = useApiSearchById(`${mediaType}/${id}`);

    return (
        <section className={movieStyles['movie-page-section']}>
            {data && isLoaded? (
                <div className={movieStyles['movie-container']}>
                    <img src={imagePathWidth1000+data.backdrop_path} alt="" />

                    {/* LEFT SIDE */}
                    <div className={movieStyles['left']}>
                        <div className={movieStyles['image-container']}>
                            <img src={`${imagePathWidth500}${data.poster_path}`} alt="" /> 
                        </div>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className={movieStyles['right']}>
                        <div className={movieStyles['title-and-details-container']}>
                            <div>

                                {/* TITLE CONTAINER */}
                                <div className={movieStyles['title-container']}>
                                    <h1 className={movieStyles['movie-title']}>{data.original_title ||data.name}</h1>
                                </div>

                                {/* DETAILS CONTAINER */}
                                <div className={movieStyles['movie-details-container']}>
                                    <h2 className={movieStyles['detail']}> 
                                    <div  className={movieStyles['genres-container']}>
                                        {data.genres?.map((genre) => (
                                            <p key={data.id} className={movieStyles['genre']} >{genre.name}</p>
                                        ))}
                                    </div>
                                    </h2>
                                    <div className={movieStyles['divider']}></div>
                                    <h2 className={movieStyles['detail']}><CalendarIcon/><span>{data.release_date}</span></h2>
                                    <div className={movieStyles['divider']}></div>
                                    <h2 className={movieStyles['detail']}><ClockIcon/> <span>{data.runtime}min</span></h2>
                                </div>
                            </div>
                            
                        </div>
                       
                        <div className={`${movieStyles['movie-overview-container']}`}>
                            <p>{data.overview}</p>
                        </div>   
                        <div className={`${movieStyles['rating-container']} ${data.vote_average<=6?movieStyles['red-rating']:''}${data.vote_average>6?movieStyles['orange-rating']:''} ${data.vote_average>=8?movieStyles['green-rating']:''}`}>
                                <h3 className={movieStyles['rating']}>{data.vote_average?.toFixed(1)}</h3>
                        </div>  
                    </div> 
                </div>  
            ):(
                <h1>Loading</h1>
            )}
            
            {/* SIMILAR MOVIES SECTION */}
            <div>
                <CategoryContainer header="SIMILAR TO THIS">
                    <Category url={`${mediaType}/${id}/similar`}  linkType={linkType} />
                </CategoryContainer> 
            </div>
        </section>
    )
}
export default Movie;