import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//LAYOUTS
import RootLayout from "./layouts/rootLayout/RootLayout";

//PAGES
import Home from "./home/Home";
import Media from "./pages/media/Media";
import Movies from "./pages/movies/Movies.tsx";
import Searched from "./pages/searched/Searched.tsx";
import Series from "./pages/series/Series.tsx";
import Person from "./pages/person/Person.tsx";
import Error from "./pages/errorPage/Error.tsx";

//ENUMS
import { SidebarCategories } from "./enums/sidebarCategories.ts";
import { CategoryType } from "./enums/categoryType.ts";
import { MediaType } from "./enums/mediaType.ts";
import { Pages } from "./enums/pages.ts";

//HOOKS
import useMediaQuery from "./hooks/useMediaQuery.ts";

function App() {
  const[sidebarCategorySelected, setSidebarCategorySelected]  = useState(SidebarCategories.PlayingNow);
  const isAboveMediumScreens = useMediaQuery('(min-width:1050px)');
  const [selectedPage, setSelectedPage] = useState<Pages>(Pages.Movies);
  const [categoryPageNumber, setCategoryPageNumber] = useState<number>(1);
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootLayout selectedPage={selectedPage} />}>
            <Route index element={<Home categoryPageNumber={categoryPageNumber} setCategoryPageNumber={setCategoryPageNumber} setSelectedPage={setSelectedPage} isAboveMediumScreens={isAboveMediumScreens} setSidebarCategorySelected={setSidebarCategorySelected} sidebarCategorySelected={sidebarCategorySelected} />} />
            <Route path="movies" element={<Movies categoryPageNumber={categoryPageNumber} setCategoryPageNumber={setCategoryPageNumber} setSelectedPage={setSelectedPage} isAboveMediumScreens={isAboveMediumScreens}   />} />
            <Route path="series" element={<Series categoryPageNumber={categoryPageNumber} setCategoryPageNumber={setCategoryPageNumber} setSelectedPage={setSelectedPage} isAboveMediumScreens={isAboveMediumScreens}   />} />
            <Route path="searched/:query" element={<Searched categoryPageNumber={categoryPageNumber} setCategoryPageNumber={setCategoryPageNumber} setSelectedPage={setSelectedPage} isAboveMediumScreens={isAboveMediumScreens} />} />
            <Route path="movie/:id" element={<Media categoryPageNumber={categoryPageNumber} setCategoryPageNumber={setCategoryPageNumber} setSelectedPage={setSelectedPage} mediaType={MediaType.Movie} childType={CategoryType.Movie}/>} />
            <Route path="series/:id" element={<Media categoryPageNumber={categoryPageNumber} setCategoryPageNumber={setCategoryPageNumber} setSelectedPage={setSelectedPage} mediaType={MediaType.TV} childType={CategoryType.Series} />} />
            <Route path="person/:id" element={<Person  />} />
            <Route path="*" element={<Error />}/>
          </Route>
        </Routes>
      </BrowserRouter> 
    </>
  )
}

export default App
