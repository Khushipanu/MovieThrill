import axios from "../../utils/axios"
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'

const Topnav = () => {
    const [query, setQuery] = useState("");
    const [searches,setSearches] = useState([]);
      const getSearches=async()=>{
    try{
      const {data}=await axios.get(`/search/multi?query=${query}`);
      setSearches(data.results);

    }catch(err){
      console.log("error",err);
    }
  }
 useEffect(()=>{
  getSearches();
 },[query])
    return (
    <div className="relative flex w-full items-center py-3">
      <div className="group relative w-full max-w-xl">
        <div className="flex h-12 w-full items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 backdrop-blur-md transition duration-200 focus-within:border-secondary/70 focus-within:bg-white/[0.08] focus-within:ring-4 focus-within:ring-secondary/15">
          <i className="ri-search-line text-xl text-zinc-400 transition-colors group-focus-within:text-secondary-light"></i>
          <input onChange={(e)=>setQuery(e.target.value)}
            value={query}
            className="w-full min-w-0 bg-transparent text-[15px] text-zinc-100 outline-none placeholder:text-zinc-500" type="text"
            placeholder="Search movies, TV shows, people..." />
          {query.length > 0 &&(
            <i onClick={()=>setQuery("")}
              className="ri-close-line cursor-pointer rounded-full text-xl text-zinc-400 transition-colors hover:text-white"></i>
          )}
        </div>

        <div className={`absolute top-full left-0 z-50 mt-2 max-h-[60vh] w-full overflow-auto rounded-2xl border border-white/10 bg-surface/95 p-2 shadow-2xl shadow-black/60 backdrop-blur-xl ${searches.length > 0 ? "animate-fade-in" : "hidden"}`}>
          {searches.map((s,i)=>
             <Link to={`/${s.media_type}/details/${s.id}`}
              key={i}
              className="flex w-full items-center gap-4 rounded-xl p-2.5 text-sm font-medium text-zinc-300 transition-colors hover:bg-white/5 hover:text-white">
            <img
              className="h-14 w-14 shrink-0 rounded-lg object-cover ring-1 ring-white/10"
              loading="lazy"
              src=
              {s.backdrop_path || s.poster_path || s.profile_path
                ? `https://image.tmdb.org/t/p/original${s.backdrop_path || s.poster_path || s.profile_path}`
                : "/noimage.jpg"}
              alt="" />
            <span className="line-clamp-2">
                {s.title|| s.name || s.original_name || s.original_title}
            </span>
            {s.media_type && (
              <span className="ml-auto shrink-0 rounded-full bg-white/5 px-2.5 py-1 text-[11px] tracking-wider text-zinc-400 uppercase">
                {s.media_type}
              </span>
            )}
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default Topnav
