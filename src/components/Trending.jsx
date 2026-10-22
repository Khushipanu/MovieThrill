import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Topnav from './partials/Topnav';
import Dropdown from './partials/Dropdown';
import Cards from './partials/Cards';
import Loading from './partials/Loading';
import axios from '../utils/axios';
import InfiniteScroll from "react-infinite-scroll-component"


const Trending = () => {
  const navigate=useNavigate();
  const [category, setCategory] = useState("all");
  const [duration,setDuration]=useState("day");
  const [trending,setTrending]=useState([]);
  const [page,setPage]=useState(1);
  const [hasMore,setHasMore]=useState(true);
      document.title="MovieThrill | Trending"+ category.toLocaleUpperCase;


     const getTrending=async()=>{
      try{
        const {data}=await axios.get(`/trending/${category}/${duration}?page=${page}`);
        if(data.results.length>0){
        setTrending((prev)=>[...prev,...data.results])
        setPage((prev)=>prev+1);
       }else{
        setHasMore(false);
       }

      }catch(err){
        console.log("error",err)

      }
    }
    const refreshHandler=()=>{
      if(trending.length===0){
        getTrending();
      }else{
         setPage((prev)=>prev+1);
         setTrending([]);
         getTrending();

      }

    }
    useEffect(()=>{
      refreshHandler()
    },[category,duration])
  

  return trending.length>0? (
    <div className="min-h-screen w-full">
      <div className="page-header gutter">
        <h1 onClick={()=>navigate(-1)} className="page-title">
          <i className="ri-arrow-left-line icon-btn"></i>
          Trending
        </h1>
       <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center">
         <Topnav/>
         <div className="flex gap-3">
          <Dropdown title="category"
         option={["movie","tv","all"]}
         func={(e)=>setCategory(e.target.value)}/>

         <Dropdown title="duration"
         option={["week","day"]}
         func={(e)=>setDuration(e.target.value)}/>
         </div>
       </div>
      </div>
       <InfiniteScroll dataLength={trending.length}
       next={getTrending}
       hasMore={hasMore}
       loader={<div className="flex justify-center py-10"><span className="spinner"></span></div>}
       >
        <Cards data={trending} title={category}/>

      </InfiniteScroll>


      
    </div>
  ):<Loading/>
}

export default Trending
