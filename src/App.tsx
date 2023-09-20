import { useEffect, useState } from "react";
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

function App() {
  const[sidebarCategorySelected, setSidebarCategorySelected]  = useState(SidebarCategories.PlayingNow);
  
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Home setSidebarCategorySelected={setSidebarCategorySelected} sidebarCategorySelected={sidebarCategorySelected} />} />
            <Route path="/movies" element={<Movies setSidebarCategorySelected={setSidebarCategorySelected} sidebarCategorySelected={sidebarCategorySelected} />} />
            <Route path="/series" element={<Series setSidebarCategorySelected={setSidebarCategorySelected} sidebarCategorySelected={sidebarCategorySelected} />} />

            <Route path="movie/:id" element={<Media mediaType={MediaType.Movie} childType={CategoryType.Movie}/>} />
            <Route path="series/:id" element={<Media mediaType={MediaType.TV} childType={CategoryType.Series} />} />

          </Route>
        </Routes>
      </BrowserRouter> 
    </>
  )
}

export default App
