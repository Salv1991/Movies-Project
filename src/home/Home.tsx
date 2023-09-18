import homeStyles from './homeStyles.module.css';
import Banner from './components/banner/Banner';
import { Urls } from '../enums/Urls';
import {CategoryContainer, ButtonsAndCategories} from '../components/categoryContainer/CategoryContainer';
import SearchById from '../components/searchById/SearchById';
import categoryStyles from '../styles/categoryStyles.module.css';
import { Genres } from '../enums/Genres';
import { useState } from 'react';
import sidebarStyles from '../styles/sideBarStyles.module.css';
import Category from '../components/category/Category';
//ENUMS
import { HomeCategories } from '../enums/HomeCategories';
import { CategoryTypeUrl } from '../enums/CategoryTypeUrl';
type HomeProps= {
    homeCategorySelected: HomeCategories;    
    setHomeCategorySelected: (value:HomeCategories) => void;
}
const Home = ({homeCategorySelected, setHomeCategorySelected}:HomeProps) => {
    const [] = useState();
    return(

        
        <section className={sidebarStyles['page-content-with-sidebar']}  >
            <div className={sidebarStyles.content}>
                <aside  className={sidebarStyles['sidebar-menu']}>
                    <ul className={sidebarStyles['sidebar-ul']}>
                        <li onClick={() => setHomeCategorySelected(HomeCategories.PlayingNow)} className={`${sidebarStyles['sidebar-li']} ${homeCategorySelected==='playing-now'?sidebarStyles['isActive']:''} `}><h2>Now Playing</h2></li>
                        <li onClick={() => setHomeCategorySelected(HomeCategories.Popular)} className={`${sidebarStyles['sidebar-li']}  ${homeCategorySelected==='popular'?sidebarStyles['isActive']:''}`}><h2>Popular</h2></li>
                        <li onClick={() => setHomeCategorySelected(HomeCategories.TopRated)} className={`${sidebarStyles['sidebar-li']}  ${homeCategorySelected==='top-rated'?sidebarStyles['isActive']:''}`}><h2>Top Rated</h2></li>
                        <li onClick={() => setHomeCategorySelected(HomeCategories.Celebrities)} className={`${sidebarStyles['sidebar-li']}  ${homeCategorySelected==='celebrities'?sidebarStyles['isActive']:''}`}><h2>Celebrities</h2></li>
                    </ul>
                </aside>
                <div>
                    
                </div>
                {homeCategorySelected===HomeCategories.PlayingNow && 
                    <CategoryContainer header='PLAYING NOW' path='/' >       
                        <ButtonsAndCategories 
                            url1= {Urls.NowPlayingMovies}
                            url2= {Urls.NowPlayingSeries}
                            type1={CategoryTypeUrl.Movie}
                            type2={CategoryTypeUrl.Series}
                        />
                    </CategoryContainer>
                } 

                {homeCategorySelected===HomeCategories.TopRated && 
                <CategoryContainer header='TOP RATED' path='/movies'>       
                    <ButtonsAndCategories 
                        url1= {Urls.MovieTopRated}
                        url2= {Urls.SeriesTopRated}
                        type1={CategoryTypeUrl.Movie}
                        type2={CategoryTypeUrl.Series}
                    />
                </CategoryContainer>
                }

                {homeCategorySelected===HomeCategories.Popular && 
                <CategoryContainer header='POPULAR' path='/'>       
                    <ButtonsAndCategories 
                        url1= {Urls.MoviePopular}
                        url2= {Urls.SeriesPopular}
                        type1={CategoryTypeUrl.Movie}
                        type2={CategoryTypeUrl.Series}
                    />
                </CategoryContainer>
                }   
            </div>

        </section>
    )
}
export default Home;