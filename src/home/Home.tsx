

import {CategoryContainer, ButtonsAndCategories} from '../components/categoryContainer/CategoryContainer';
import sidebarStyles from '../styles/sideBarStyles.module.css';
//ENUMS
import { SidebarCategories } from '../enums/sidebarCategories';
import { CategoryType } from '../enums/categoryType'
import { UrlsPresets } from '../enums/urlPresets';
//HOOKS
import Sidebar from '../components/sidebar/Sidebar';
import { Pages } from '../enums/pages';
import {useEffect} from 'react';
import Banner from './components/banner/Banner';
type HomeProps= {
    setSelectedPage:(value:Pages) => void;
    sidebarCategorySelected: SidebarCategories;    
    setSidebarCategorySelected: (value:SidebarCategories) => void;
    isAboveMediumScreens: boolean;
}
const Home = ({setSelectedPage, isAboveMediumScreens,sidebarCategorySelected, setSidebarCategorySelected}:HomeProps) => {
    useEffect(()=> {
        setSelectedPage(Pages.Homepage);
        setSidebarCategorySelected(SidebarCategories.PlayingNow);
    },[]);

    return(
        <section className={` ${isAboveMediumScreens? sidebarStyles['page-content-with-sidebar'] : sidebarStyles['responsive-content']}`}>
            <div className={sidebarStyles.content}>
                <Sidebar isAboveMediumScreens={isAboveMediumScreens}  >
                    <ul className={sidebarStyles['sidebar-ul']}>
                        <li onClick={() => setSidebarCategorySelected(SidebarCategories.PlayingNow)} className={`${sidebarStyles['sidebar-li']} ${sidebarCategorySelected===SidebarCategories.PlayingNow?sidebarStyles['isActive']:''} `}><h2>Playing Now</h2></li>
                        <li onClick={() => setSidebarCategorySelected(SidebarCategories.Popular)} className={`${sidebarStyles['sidebar-li']}  ${sidebarCategorySelected===SidebarCategories.Popular?sidebarStyles['isActive']:''}`}><h2>Popular</h2></li>
                        <li onClick={() => setSidebarCategorySelected(SidebarCategories.TopRated)} className={`${sidebarStyles['sidebar-li']}  ${sidebarCategorySelected===SidebarCategories.TopRated?sidebarStyles['isActive']:''}`}><h2>Top Rated</h2></li>
                    </ul>
                </Sidebar>
                <Banner />
                {sidebarCategorySelected===SidebarCategories.PlayingNow && 
                    <CategoryContainer header='PLAYING NOW'  >       
                        <ButtonsAndCategories 
                            url1= {UrlsPresets.NowPlayingMovies}
                            url2= {UrlsPresets.NowPlayingSeries}
                            type1={CategoryType.Movie}
                            type2={CategoryType.Series}
                        />
                    </CategoryContainer>
                } 
                {sidebarCategorySelected===SidebarCategories.TopRated && 
                <CategoryContainer header='TOP RATED'>       
                    <ButtonsAndCategories 
                        url1= {UrlsPresets.MovieTopRated}
                        url2= {UrlsPresets.SeriesTopRated}
                        type1={CategoryType.Movie}
                        type2={CategoryType.Series}
                    />
                </CategoryContainer>
                }

                {sidebarCategorySelected===SidebarCategories.Popular && 
                <CategoryContainer header='POPULAR' >       
                    <ButtonsAndCategories 
                        url1= {UrlsPresets.MoviePopular}
                        url2= {UrlsPresets.SeriesPopular}
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