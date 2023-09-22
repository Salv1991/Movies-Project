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
type SeriesProps = {
    setSelectedPage: (value:Pages) => void;
    isAboveMediumScreens:boolean;
    sidebarCategorySelected: SidebarCategories;    
    setSidebarCategorySelected: (value:SidebarCategories) => void;
}
const Series = ({setSelectedPage, isAboveMediumScreens, sidebarCategorySelected, setSidebarCategorySelected}:SeriesProps) => {
    const [isClosed, setIsClosed]  = useState<boolean>(false);
    const [selectedGenreId, setSelectedGenreId] = useState<number>(10759);
    const [selectedGenreName, setSelectedGenreName] = useState<string>('ACTION & ADVENTURE');
    const{ data:genresList, isLoaded, error} = useGenreListApi(MediaType.TV);
    useEffect(() => {
        setSelectedPage(Pages.TVSeries);
        setSidebarCategorySelected(SidebarCategories.PlayingNow);
        /* setSelectedGenreId(10759);
        setSelectedGenreName('ACTION & ADVENTURE'); */
    
    },[]);
    
    return (
        <section className={` ${isAboveMediumScreens? sidebarStyles['page-content-with-sidebar'] : sidebarStyles['repsonsive-content']}`}>
        <div className={sidebarStyles.content}>
            
            <Sidebar isAboveMediumScreens={isAboveMediumScreens}  >
                    <ul className={sidebarStyles['sidebar-ul']}>
                        <li onClick={() => setSidebarCategorySelected(SidebarCategories.PlayingNow)} className={`${sidebarStyles['sidebar-li']} ${sidebarCategorySelected===SidebarCategories.PlayingNow?sidebarStyles['isActive']:''} `}><h2>Playing Now</h2></li>
                        <li onClick={() => setSidebarCategorySelected(SidebarCategories.Upcoming)} className={`${sidebarStyles['sidebar-li']}  ${sidebarCategorySelected===SidebarCategories.Upcoming?sidebarStyles['isActive']:''}`}><h2>Airing this Week</h2></li>
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
                <h1 className={sidebarStyles['content-page-header']}>TV SERIES</h1>
                {sidebarCategorySelected===SidebarCategories.PlayingNow && 
                    <CategoryContainer header='PLAYING NOW'>
                        <Category url={Urls.NowPlayingSeries} categoryType={CategoryType.Series} />   
                    </CategoryContainer>
                } 

                {sidebarCategorySelected===SidebarCategories.TopRated && 
                <CategoryContainer header='TOP RATED'>       
                    <Category url={Urls.SeriesTopRated} categoryType={CategoryType.Series} />    
                </CategoryContainer>
                }

                {sidebarCategorySelected===SidebarCategories.Popular && 
                <CategoryContainer header='POPULAR' >       
                     <Category url={Urls.SeriesPopular} categoryType={CategoryType.Series} />   
                </CategoryContainer>
                }
                {sidebarCategorySelected===SidebarCategories.Upcoming && 
                <CategoryContainer header='Airing this Week' >       
                    <Category url={Urls.AiringThisWeek} categoryType={CategoryType.Series} />   
                </CategoryContainer>
                }
                {sidebarCategorySelected===SidebarCategories.None && 
                <CategoryContainer header={selectedGenreName.toUpperCase()} >       
                    <Category url={`discover/tv?include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${selectedGenreId}`} categoryType={CategoryType.Series} />   
                </CategoryContainer>
                }     
            </div>

        </section> 
    )
};

export default Series;