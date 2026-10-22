import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Topnav from './partials/Topnav';
import Dropdown from './partials/Dropdown';
import Cards from './partials/Cards';
import Loading from './partials/Loading';
import axios from '../utils/axios';
import InfiniteScroll from "react-infinite-scroll-component"


const Tvshows = () => {
  const navigate=useNavigate();
  const [category, setCategory] = useState("airing_today");
  const [duration,setDuration]=useState("day");
  const [tvshow,setTvShow]=useState([]);
  const [page,setPage]=useState(1);
  const [hasMore,setHasMore]=useState(true);

      document.title="MovieThrill | tvshows"+ category.toLocaleUpperCase;


     const getTv=async()=>{
      try{
        const {data}=await axios.get(`/tv/${category}?page=${page}`);
        console.log("data",data)
        if(data.results.length>0){
        setTvShow((prev)=>[...prev,...data.results])
        setPage((prev)=>prev+1);
       }else{
        setHasMore(false);
       }

      }catch(err){
        console.log("error",err)

      }
    }
    const refreshHandler=()=>{
      if(tvshow.length===0){
        getTv();
      }else{
         setPage((prev)=>prev+1);
         setTvShow([]);
         getTv();

      }

    }
    useEffect(()=>{
      refreshHandler()
    },[category,duration])
  

  return tvshow.length>0? (
    <div className="min-h-screen w-full">
      <div className="page-header gutter">
        <h1 onClick={()=>navigate(-1)} className="page-title">
          <i className="ri-arrow-left-line icon-btn"></i>
          TV shows
        </h1>
       <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center">
         <Topnav/>
         <div className="flex gap-3">
          <Dropdown title="category"
         option={["movie","tv","all"]}
         func={(e)=>setCategory(e.target.value)}/>

         <Dropdown title="duration"
         option={["airing_today","on_the_air","popular","top_rated"]}
         func={(e)=>setDuration(e.target.value)}/>
         </div>
       </div>
      </div>
       <InfiniteScroll dataLength={tvshow.length}
       next={getTv}
       hasMore={hasMore}
       loader={<div className="flex justify-center py-10"><span className="spinner"></span></div>}
       >
        <Cards data={tvshow} title="tv"/>

      </InfiniteScroll>


      
    </div>
  ):<Loading/>
}

export default Tvshows
