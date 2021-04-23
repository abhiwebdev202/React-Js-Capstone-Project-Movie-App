import React, {useState, useEffect} from 'react';
import MovieList from './components/MovieList';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieAppHeading from './components/MovieAppHeading';
import SearchBox from './components/SearchBox';
import AddFavorites from './components/AddFavorites';
import RemoveFavorites from './components/RemoveFavorites';

const App = () =>{
  const [movies, setMovies] = useState([])
  const [favorites, setFavorites] = useState([])
  const [searchValue, setSearchValue] = useState('')

const getMovieRequest = async (searchValue) =>{
  const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=d10a17d2`

  const response = await fetch(url)
  const responseJson = await response.json()

  if (responseJson.Search){
    setMovies(responseJson.Search)
  }
}

useEffect(()=>{
  getMovieRequest(searchValue)
}, [searchValue])

useEffect(() => {
  const movieFavorites = JSON.parse(localStorage.getItem('react-movie-app-favorites')
  )
  setFavorites(movieFavorites)
}, [])

const saveToLocalStorage = (items) => {
  localStorage.setItem('react-movie-app-favorites', JSON.stringify(items))
}

const addFavoriteMovie = (movie) => {
  const newFavoriteList = [...favorites, movie]
  setFavorites(newFavoriteList)
  saveToLocalStorage(newFavoriteList)
}
const removeFavoriteMovie = (movie) => {
  const newFavoriteList = favorites.filter((favoriteMovie) => 
    favoriteMovie.imdbID !== movie.imdbID
  )
  setFavorites(newFavoriteList)
  saveToLocalStorage(newFavoriteList)
}
  return (
    <div className='container-fluid movie-app'>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieAppHeading heading='Movies'/>
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
      </div>
      <div className='row'>
        <MovieList movies={movies} favoriteComponent={AddFavorites} handleFavoritesClick={addFavoriteMovie}/>
      </div>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieAppHeading heading='Favorites'/>
      </div>
      <div className='row'>
        <MovieList movies={favorites} favoriteComponent={RemoveFavorites} 
        handleFavoritesClick={removeFavoriteMovie}/>
      </div>
    </div>
  );
}
  
export default App;
