import {  useState } from 'react';

//STYLES
import sidebarStyles from '../../styles/sideBarStyles.module.css';
//ENUMS
import { CategoryType } from '../../enums/categoryType';
import { Urls } from '../../enums/urls';
import { SidebarCategories } from '../../enums/sidebarCategories';

//COMPONENTS
import Category from '../../components/category/Category';
import { CategoryContainer } from '../../components/categoryContainer/CategoryContainer';
import GenresList from '../../components/genresList/GenresList';
import Sidebar from '../../components/sidebar/Sidebar';
import { useGenreListApi } from '../../hooks/useGenreListApi';
import { useEffect} from 'react';
import { Pages } from '../../enums/pages';
import { MediaType } from '../../enums/mediaType';
type MoviesProps = {
    setSelectedPage: (value:Pages) => void;
    isAboveMediumScreens: boolean;
    sidebarCategorySelected: SidebarCategories;    
    setSidebarCategorySelected: (value:SidebarCategories) => void;
}
const Movies = ({setSelectedPage, isAboveMediumScreens,sidebarCategorySelected, setSidebarCategorySelected}:MoviesProps) => {
    const [isClosed, setIsClosed]  = useState<boolean>(false);
    const [selectedGenreId, setSelectedGenreId] = useState<number>(28);
    const [selectedGenreName, setSelectedGenreName] = useState<string>('Action');
    const{ data:genresList, isLoaded, error} = useGenreListApi(MediaType.Movie);
    useEffect(() => {
            setSelectedPage(Pages.Movies);
            setSidebarCategorySelected(SidebarCategories.PlayingNow);
            /* setSelectedGenreId(28);
            setSelectedGenreName('ACTION');
         */
      },[]);
    
    return (
        <section className={` ${isAboveMediumScreens? sidebarStyles['page-content-with-sidebar'] : sidebarStyles['repsonsive-content']}`}>
        <div className={sidebarStyles.content}>

            {/* SIDEBAR */}
                <Sidebar isAboveMediumScreens={isAboveMediumScreens} >
                    <ul className={sidebarStyles['sidebar-ul']}>
                        <li onClick={() => setSidebarCategorySelected(SidebarCategories.PlayingNow)} className={`${sidebarStyles['sidebar-li']} ${sidebarCategorySelected===SidebarCategories.PlayingNow?sidebarStyles['isActive']:''} `}><h2>Playing Now</h2></li>
                        <li onClick={() => setSidebarCategorySelected(SidebarCategories.Upcoming)} className={`${sidebarStyles['sidebar-li']}  ${sidebarCategorySelected===SidebarCategories.Upcoming?sidebarStyles['isActive']:''}`}><h2>Upcoming</h2></li>
                        <li onClick={() => setSidebarCategorySelected(SidebarCategories.Popular)} className={`${sidebarStyles['sidebar-li']}  ${sidebarCategorySelected===SidebarCategories.Popular?sidebarStyles['isActive']:''}`}><h2>Popular</h2></li>
                        <li onClick={() => setSidebarCategorySelected(SidebarCategories.TopRated)} className={`${sidebarStyles['sidebar-li']}  ${sidebarCategorySelected===SidebarCategories.TopRated?sidebarStyles['isActive']:''}`}><h2>Top Rated</h2></li>       
                    </ul>
                    <GenresList 
                        isLoaded={isLoaded}
                        error={error}
                        genresList={genresList}
                        selectedGenreId={selectedGenreId}
                        isClosed={isClosed} 
                        setIsClosed={setIsClosed} 
                        setSelectedGenreId={setSelectedGenreId} 
                        setSelectedGenreName={setSelectedGenreName} 
                        sidebarCategorySelected={sidebarCategorySelected} 
                        setSidebarCategorySelected={setSidebarCategorySelected} 
                    />
                </Sidebar>

            {/* MAIN CONTENT */}
                <h1 className={sidebarStyles['content-page-header']}>MOVIES</h1>
                {sidebarCategorySelected===SidebarCategories.PlayingNow && 
                    <CategoryContainer header='PLAYING NOW'>
                        <Category url={Urls.NowPlayingMovies} categoryType={CategoryType.Movie} />   
                    </CategoryContainer>
                } 

                {sidebarCategorySelected===SidebarCategories.TopRated && 
                <CategoryContainer header='TOP RATED'>       
                    <Category url={Urls.MovieTopRated} categoryType={CategoryType.Movie} />    
                </CategoryContainer>
                }

                {sidebarCategorySelected===SidebarCategories.Popular && 
                <CategoryContainer header='POPULAR' >       
                     <Category url={Urls.MoviePopular} categoryType={CategoryType.Movie} />   
                </CategoryContainer>
                }
                {sidebarCategorySelected===SidebarCategories.Upcoming && 
                <CategoryContainer header='UPCOMING' >       
                    <Category url={Urls.UpComingMovies} categoryType={CategoryType.Movie} />   
                </CategoryContainer>
                }
                {sidebarCategorySelected===SidebarCategories.None && 
                <CategoryContainer header={selectedGenreName.toUpperCase()} >       
                    <Category url={`discover/movie?include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${selectedGenreId}`} categoryType={CategoryType.Movie} />   
                </CategoryContainer>
                }     
            </div>

        </section> 
    )
};

export default Movies;