import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//LAYOUTS
import RootLayout from "./layouts/rootLayout/RootLayout";
//COMPONENTS
import Home from "./home/Home";
import Movie from "./pages/movie/Movie";
//enums
import { HomeCategories } from "./enums/HomeCategories";

function App() {
  const[homeCategorySelected, setHomeCategorySelected]  = useState(HomeCategories.PlayingNow);
  
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Home setHomeCategorySelected={setHomeCategorySelected} homeCategorySelected={homeCategorySelected} />} />

            <Route path="movie/:id" element={<Movie />} />
          </Route>
        </Routes>
      </BrowserRouter> 
    </>
  )
}

export default App
