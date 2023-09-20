import { useParams } from "react-router-dom";
import { CalendarIcon, ClockIcon } from "@heroicons/react/20/solid";
//STYLES
import mediaStyles from './movieStyles.module.css';
import Category from "../../components/category/Category";
import { CategoryContainer } from "../../components/categoryContainer/CategoryContainer";
import { useApiSearchById } from "../../hooks/useApi";
import { CategoryType } from "../../enums/categoryType";

type MediaProps = {
    mediaType:string;
    childType: CategoryType;
}
const Media = ({childType, mediaType}:MediaProps) => {
    const {id} = useParams();
    const imagePathWidth500 = `https://image.tmdb.org/t/p/w500/`;
    const imagePathWidth1000 = `https://image.tmdb.org/t/p/w1280/`;
 
    const{ data, isLoaded, error} = useApiSearchById(`${mediaType}/${id}`);

    return (
        <section className={mediaStyles['movie-page-section']}>
            {data && isLoaded? (
                <div className={mediaStyles['movie-container']}>
                    <img src={imagePathWidth1000+data.backdrop_path} alt="" />

                    {/* LEFT SIDE */}
                    <div className={mediaStyles['left']}>
                        <div className={mediaStyles['image-container']}>
                            <img src={`${imagePathWidth500}${data.poster_path}`} alt="" /> 
                        </div>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className={mediaStyles['right']}>
                        <div className={mediaStyles['title-and-details-container']}>
                            <div>

                                {/* TITLE CONTAINER */}
                                <div className={mediaStyles['title-container']}>
                                    <h1 className={mediaStyles['movie-title']}>{data.original_title ||data.name}</h1>
                                </div>

                                {/* DETAILS CONTAINER */}
                                <div className={mediaStyles['movie-details-container']}>
                                    <h2 className={mediaStyles['detail']}> 
                                    <div  className={mediaStyles['genres-container']}>
                                        {data.genres?.map((genre) => (
                                            <p key={data.id} className={mediaStyles['genre']} >{genre.name}</p>
                                        ))}
                                    </div>
                                    </h2>
                                    <div className={mediaStyles['divider']}></div>
                                    <h2 className={mediaStyles['detail']}><CalendarIcon/><span>{data.release_date}</span></h2>
                                    <div className={mediaStyles['divider']}></div>
                                    <h2 className={mediaStyles['detail']}><ClockIcon/> <span>{data.runtime}min</span></h2>
                                </div>
                            </div>
                            
                        </div>
                       
                        <div className={`${mediaStyles['movie-overview-container']}`}>
                            <p>{data.overview}</p>
                        </div>   
                        <div className={`${mediaStyles['rating-container']} ${data.vote_average<=6?mediaStyles['red-rating']:''}${data.vote_average>6?mediaStyles['orange-rating']:''} ${data.vote_average>=8?mediaStyles['green-rating']:''}`}>
                                <h3 className={mediaStyles['rating']}>{data.vote_average?.toFixed(1)}</h3>
                        </div>  
                    </div> 
                </div>  
            ):(
                <h1>Loading</h1>
            )}
            
            {/* SIMILAR MOVIES SECTION */}
            <div>
                <CategoryContainer header="SIMILAR TO THIS">
                    <Category url={`${mediaType}/${id}/similar?language=en-US`}  categoryType={childType} />
                </CategoryContainer> 
            </div>
        </section>
    )
}
export default Media;