import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';

//STYLES
import movieStyles from './movieStyles.module.css';

const Movie = () => {
    const imagePathWidth500 = `https://image.tmdb.org/t/p/w500/`;
    const [movieData, setMovieData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/1008042?language=en-US&api_key=${import.meta.env.VITE_API_KEY_MOVIESTMDB}`)
        .then(response => response.json())
        .then(data=> setMovieData(data))
        setIsLoaded(true);
        console.log(movieData)
    },[]);

    const {id} = useParams();
    return (
        <section className={movieStyles['movie-page-section']}>
            {isLoaded? (
                <div className={movieStyles['movie-container']}>
                    <div className={movieStyles['left']}>
                        <img src={`${imagePathWidth500}${movieData.poster_path}`} alt="" /> 
                    </div>

                    <div className={movieStyles['right']}>
                        <div className={movieStyles['title-container']}>
                            <div>
                                <h1 className={movieStyles['movie-title']}>{movieData.original_title}</h1>
                                <p>{movieData.tagline}</p>
                            </div>
                            <div>
                                Rating
                            </div>  
                        </div>
                        <div className={movieStyles['movie-details']}>
                            <div>
                                <p>{movieData.overview}</p>
                            </div>   
                        </div>
                    </div> 
                </div>  
            ):(
                <h1>Loading</h1>
            )
                  
            }
        </section>
    )
}
export default Movie;