import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Topnav from './partials/Topnav';
import Cards from './partials/Cards';
import Loading from './partials/Loading';
import axios from '../utils/axios';
import InfiniteScroll from "react-infinite-scroll-component"

const Movies = () => {
        const navigate=useNavigate();
        const category="popular";
        const [movie,setMovie]=useState([])
        const [page, setPage] = useState(1);
        const [hasMore, setHasMore] = useState(true);

        const getMovies=async()=>{
            try{
                const {data}=await axios.get(`/movie/${category}?page=${page}`);
                console.log("hi",data);
                if(data.results.length>0){
                    setMovie((prev)=>[...prev,...data.results]);
                    setPage((prev)=>prev+1);
                }else{
                setHasMore(false);
                }

             }catch(err){
               console.log("error",err);

            }
        }
        useEffect(()=>{
            document.title="MovieThrill | movies";
            let ignore=false;

            const loadFirstPage=async()=>{
              try{
                const {data}=await axios.get(`/movie/${category}?page=1`);
                if(!ignore){
                  setMovie(data.results);
                  setPage(2);
                  setHasMore(data.page < data.total_pages);
                }
              }catch(err){
                console.log("error",err);
              }
            }

            loadFirstPage();
            return()=>{
              ignore=true;
            }
        },[category])

    

  return movie.length>0? (
    <div className="min-h-screen w-full">
            <div className="page-header gutter">
          <h1 onClick={()=>navigate(-1)}
            className="page-title">
          <i className="ri-arrow-left-line icon-btn"></i>
          Movies <small className="rounded-full bg-white/5 px-2.5 py-1 font-sans text-xs font-medium tracking-wider text-zinc-400 uppercase">{category}</small>
        </h1>
       <div className="flex w-full items-center">
         <Topnav/>
       </div>
      </div>
       <InfiniteScroll dataLength={movie.length}
       next={getMovies}
       hasMore={hasMore}
       loader={<div className="flex justify-center py-10"><span className="spinner"></span></div>}
       >
        <Cards data={movie} title="movie"/>

      </InfiniteScroll>
      
    </div>
  ):(
    <Loading/>
  )
}

export default Movies
