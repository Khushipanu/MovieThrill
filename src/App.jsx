import { Route, Routes } from 'react-router-dom'
import Home from './components/Home';
import Trending from './components/Trending';
import Popular from './components/Popular';
import Movies from './components/Movies';
import Tvshows from './components/Tvshows';
import People from './components/People';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import MovieDetails from './components/MovieDetails';
import TvDetails from './components/TvDetails';
import PersonDetails from './components/PersonDetails';
import Trailer from './components/partials/Trailer';
import Notfound from './components/partials/Notfound';

const App = () => {
  return (
    <div className="flex min-h-screen w-full bg-primary text-zinc-100">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/trending" element={<Trending/>}/>
        <Route path="/popular" element={<Popular/>}/>

        <Route path="/movies" element={<Movies/>}/>
        <Route path="/movie/details/:id" element={<MovieDetails/>}>
        <Route path="trailer" element={<Trailer/>}/>
        </Route>

       

        <Route path="/tvshows" element={<Tvshows/>}/>
        <Route path="/tv/details/:id" element={<TvDetails/>}>
        <Route path="trailer" element={<Trailer/>}/>
        </Route>


       
        <Route path="/people" element={<People/>}/>
        <Route path="/person/details/:id" element={<PersonDetails/>}/>


        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="*" element={<Notfound/>}/>


      </Routes>
      
    </div>
  )
}

export default App;
