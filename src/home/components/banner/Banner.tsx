import bannerStyles from './bannerStyles.module.css';

const Banner = () => {
    return(
        <div className={bannerStyles['banner-container']}>
            <div className={bannerStyles['banner-input-container']}>
                <h2>Millions of movies, TV shows and people to discover. Explore now.</h2>
                <input className={bannerStyles['banner-input']} placeholder='Search for movies...' type="text" />
            </div>
        </div>
    )
}
export default Banner;