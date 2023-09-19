import {useEffect} from 'react';
const SearchSimilar = () => {
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/667538/similar?language=en-US&page=1&api_key=${import.meta.env.VITE_API_KEY_MOVIESTMDB}`)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
    })
    return (
        <h1>Similar</h1>
    )
}

export default SearchSimilar;