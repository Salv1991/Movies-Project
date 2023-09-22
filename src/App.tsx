import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//LAYOUTS
import RootLayout from "./layouts/rootLayout/RootLayout";
//PAGES
import Home from "./home/Home";
import Media from "./pages/media/Media";
import Movies from "./pages/movies/Movies.tsx";
//ENUMS
import { SidebarCategories } from "./enums/sidebarCategories.ts";
import { CategoryType } from "./enums/categoryType.ts";
import { MediaType } from "./enums/mediaType.ts";
import Series from "./pages/series/Series.tsx";
//HOOKS
import useMediaQuery from "./hooks/useMediaQuery.ts";
import { Pages } from "./enums/pages.ts";
function App() {
  const[sidebarCategorySelected, setSidebarCategorySelected]  = useState(SidebarCategories.PlayingNow);
  const isAboveMediumScreens = useMediaQuery('(min-width:800px)');
  const [selectedPage, setSelectedPage] = useState<Pages>(Pages.Movies);
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootLayout selectedPage={selectedPage} />}>
            <Route index element={<Home setSelectedPage={setSelectedPage} isAboveMediumScreens={isAboveMediumScreens} setSidebarCategorySelected={setSidebarCategorySelected} sidebarCategorySelected={sidebarCategorySelected} />} />
            <Route path="/movies" element={<Movies setSelectedPage={setSelectedPage} isAboveMediumScreens={isAboveMediumScreens} setSidebarCategorySelected={setSidebarCategorySelected} sidebarCategorySelected={sidebarCategorySelected} />} />
            <Route path="/series" element={<Series setSelectedPage={setSelectedPage} isAboveMediumScreens={isAboveMediumScreens} setSidebarCategorySelected={setSidebarCategorySelected} sidebarCategorySelected={sidebarCategorySelected} />} />

            <Route path="movie/:id" element={<Media mediaType={MediaType.Movie} childType={CategoryType.Movie}/>} />
            <Route path="series/:id" element={<Media mediaType={MediaType.TV} childType={CategoryType.Series} />} />

          </Route>
        </Routes>
      </BrowserRouter> 
    </>
  )
}

export default App
