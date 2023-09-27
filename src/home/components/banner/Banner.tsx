import bannerStyles from './bannerStyles.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Banner = () => {
    const navigate = useNavigate();
    const[query, setQuery] = useState('');
    const handleSubmit = (e:any) => {
        e.preventDefault();
        if(query==='') return;
        navigate(`/searched/${query}`);

    }
    return(
        <div className={bannerStyles['banner-container']}>
            <div className={bannerStyles['banner-input-container']}>
                <h2>Millions of movies, TV shows and people to discover. Explore now.</h2>
                <form onSubmit={(e)=>handleSubmit(e)}>
                    <input 
                        onChange={(e)=>setQuery(e.target.value)} 
                        className={bannerStyles['banner-input']} 
                        placeholder='Search for movies, series, actors...' 
                        type="text" 
                    />
                </form>

            </div>
        </div>
    )
}
export default Banner;