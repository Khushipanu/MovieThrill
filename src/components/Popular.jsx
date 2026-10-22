import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Topnav from './partials/Topnav';
import Dropdown from './partials/Dropdown';
import Cards from './partials/Cards';
import Loading from './partials/Loading';
import axios from '../utils/axios';
import InfiniteScroll from "react-infinite-scroll-component"

const Popular = () => {
     document.title="MovieThrill | Popular"
  const navigate=useNavigate();
  const [category, setCategory] = useState("movie");
  const [popular,setPopular]=useState([]);
  const [page,setPage]=useState(1);
  const [hasMore,setHasMore]=useState(true);
  const getPopular=async()=>{
    try{
        const {data}=await axios.get(`${category}/popular?page=${page}`);
        if(data.results.length>0){
            setPopular((prev)=>[...prev,...data.results]);
            setPage((prev)=>prev+1)
        }else{
            setHasMore(false);
        }
    }catch(err){
        console.log("error",err);

    }
  }
  const refreshHandler=()=>{
    if(popular.length===0){
        getPopular();
    }else{
        setPage((prev)=>prev+1);
        setPopular([]);
        getPopular();
    }
  }
  useEffect(()=>{
    refreshHandler();
  },[category])
  return popular.length>0? (
    <div className="min-h-screen w-full">
         <div className="page-header gutter">
          <h1 onClick={()=>navigate(-1)} className="page-title">
          <i className="ri-arrow-left-line icon-btn"></i>
          Popular
        </h1>
       <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center">
         <Topnav/>
          <Dropdown title="category"
         option={["movie","tv"]}
         func={(e)=>setCategory(e.target.value)}/>
       </div>
      </div>
       <InfiniteScroll dataLength={popular.length}
       next={getPopular}
       hasMore={hasMore}
       loader={<div className="flex justify-center py-10"><span className="spinner"></span></div>}
       >
        <Cards data={popular} title={category}/>

      </InfiniteScroll>
       
    </div>
  ):(<Loading/>)
}

export default Popular
