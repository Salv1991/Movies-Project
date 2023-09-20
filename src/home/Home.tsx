import homeStyles from './homeStyles.module.css';
import Banner from './components/banner/Banner';
import { Urls } from '../enums/urls';
import {CategoryContainer, ButtonsAndCategories} from '../components/categoryContainer/CategoryContainer';
import SearchById from '../components/searchById/SearchById';
import categoryStyles from '../styles/categoryStyles.module.css';
import { Genres } from '../enums/genres';
import { useState } from 'react';
import sidebarStyles from '../styles/sideBarStyles.module.css';
import Category from '../components/category/Category';
//ENUMS
import { SidebarCategories } from '../enums/sidebarCategories';
import { CategoryType } from '../enums/categoryType'
type HomeProps= {
    sidebarCategorySelected: SidebarCategories;    
    setSidebarCategorySelected: (value:SidebarCategories) => void;
}
const Home = ({sidebarCategorySelected, setSidebarCategorySelected}:HomeProps) => {
    const [] = useState();
    return(

        
        <section className={sidebarStyles['page-content-with-sidebar']}  >
            <div className={sidebarStyles.content}>
                <aside  className={sidebarStyles['sidebar-menu']}>
                    <ul className={sidebarStyles['sidebar-ul']}>
                        <li onClick={() => setSidebarCategorySelected(SidebarCategories.PlayingNow)} className={`${sidebarStyles['sidebar-li']} ${sidebarCategorySelected==='playing-now'?sidebarStyles['isActive']:''} `}><h2>Playing Now</h2></li>
                        <li onClick={() => setSidebarCategorySelected(SidebarCategories.Popular)} className={`${sidebarStyles['sidebar-li']}  ${sidebarCategorySelected==='popular'?sidebarStyles['isActive']:''}`}><h2>Popular</h2></li>
                        <li onClick={() => setSidebarCategorySelected(SidebarCategories.TopRated)} className={`${sidebarStyles['sidebar-li']}  ${sidebarCategorySelected==='top-rated'?sidebarStyles['isActive']:''}`}><h2>Top Rated</h2></li>
                        <li onClick={() => setSidebarCategorySelected(SidebarCategories.Celebrities)} className={`${sidebarStyles['sidebar-li']}  ${sidebarCategorySelected==='celebrities'?sidebarStyles['isActive']:''}`}><h2>Celebrities</h2></li>
                    </ul>
                </aside>
                
                {sidebarCategorySelected===SidebarCategories.PlayingNow && 
                    <CategoryContainer header='PLAYING NOW'  >       
                        <ButtonsAndCategories 
                            url1= {Urls.NowPlayingMovies}
                            url2= {Urls.NowPlayingSeries}
                            type1={CategoryType.Movie}
                            type2={CategoryType.Series}
                        />
                    </CategoryContainer>
                } 

                {sidebarCategorySelected===SidebarCategories.TopRated && 
                <CategoryContainer header='TOP RATED'>       
                    <ButtonsAndCategories 
                        url1= {Urls.MovieTopRated}
                        url2= {Urls.SeriesTopRated}
                        type1={CategoryType.Movie}
                        type2={CategoryType.Series}
                    />
                </CategoryContainer>
                }

                {sidebarCategorySelected===SidebarCategories.Popular && 
                <CategoryContainer header='POPULAR' >       
                    <ButtonsAndCategories 
                        url1= {Urls.MoviePopular}
                        url2= {Urls.SeriesPopular}
                        type1={CategoryType.Movie}
                        type2={CategoryType.Series}
                    />
                </CategoryContainer>
                }   
            </div>

        </section>
    )
}
export default Home;