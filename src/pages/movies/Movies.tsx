import {  useState, useEffect } from 'react';
//STYLES
import sidebarStyles from '../../styles/sideBarStyles.module.css';
//ENUMS
import { CategoryType } from '../../enums/categoryType';
import { MediaType } from '../../enums/mediaType';
import { Pages } from '../../enums/pages';
//HOOKS
import { useGenreListApi } from '../../hooks/useGenreListApi';
//COMPONENTS
import Category from '../../components/category/Category';
import { CategoryContainer } from '../../components/categoryContainer/CategoryContainer';
import GenresList from '../../components/genresList/GenresList';
import Sidebar from '../../components/sidebar/Sidebar';
import FiltersBar from '../../components/filtersBar/FiltersBar';
//TYPES
type Genre = {
    id: number;
    name: string;
}
type MoviesProps = {
    setSelectedPage: (value:Pages) => void;
    isAboveMediumScreens: boolean;
}

const Movies = ({setSelectedPage, isAboveMediumScreens}:MoviesProps) => {
    let ids = '&with_genres=';
    const[includeAdult, setIncludeAdult] = useState<boolean>(false);
    const [isClosed, setIsClosed]  = useState<boolean>(false);
    const{ data:genresList, isLoaded, error} = useGenreListApi(MediaType.Movie);
    const [sortByDescendedOrder, setSortByDescendedOrder] = useState<boolean>(true);
    const [sortByQuery, setSortByQuery] = useState<string>('popularity');
    const [genresSelected, setGenresSelected] = useState<Genre[]>([]);
    const [ filteredUrl, setFilteredUrl] = useState<string>(`discover/movie?include_adult=false&include_video=false&language=en-US&page=1&include_adult=${includeAdult}&sort_by=${sortByQuery}.${sortByDescendedOrder?'desc':'asc'}${genresSelected.length===0?'': ids.slice(0,-1)}`);

    useEffect(() => {
        setSelectedPage(Pages.Movies);
    },[]);
    useEffect(() => {
        genresSelected.forEach(genre => {
            ids+=genre.id+',';
        })  
        setFilteredUrl(`discover/movie?include_adult=false&include_video=false&language=en-US&page=1&include_adult=${includeAdult}&sort_by=${sortByQuery}.${sortByDescendedOrder?'desc':'asc'}${genresSelected.length===0?'': ids.slice(0,-1)}`);
    },[sortByDescendedOrder, sortByQuery, genresSelected, includeAdult]);
    
    return (
        <section className={` ${isAboveMediumScreens? sidebarStyles['page-content-with-sidebar'] : sidebarStyles['repsonsive-content']}`}>
        <div className={sidebarStyles.content}>

            {/* SIDEBAR */}
                <Sidebar isAboveMediumScreens={isAboveMediumScreens} >                      
                    <GenresList 
                        genresSelected= {genresSelected}
                        setGenresSelected= {setGenresSelected}
                        isLoaded={isLoaded}
                        error={error}
                        genresList={genresList}
                        isClosed={isClosed} 
                        setIsClosed={setIsClosed}            
                    />            
                </Sidebar>

            {/* MAIN CONTENT */}
                <h1 className={sidebarStyles['content-page-header']}>MOVIES</h1>
                    <CategoryContainer header={''}>

                       {/* FILTER BAR */}
                        <FiltersBar 
                            includeAdult={includeAdult} 
                            setIncludeAdult={setIncludeAdult}
                            sortByDescendedOrder={sortByDescendedOrder} 
                            setSortByQuery={setSortByQuery} 
                            setSortByDescendedOrder={setSortByDescendedOrder} 
                            genresSelected={genresSelected} 
                            setGenresSelected= {setGenresSelected} 
                        />

                        {/* FILTERED MOVIES */}
                        <Category url={filteredUrl} categoryType={CategoryType.Movie} />   

                    </CategoryContainer>
            </div>
        </section> 
    )
};

export default Movies;