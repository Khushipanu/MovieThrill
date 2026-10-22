import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Topnav from './partials/Topnav';
import Dropdown from './partials/Dropdown';
import Cards from './partials/Cards';
import Loading from './partials/Loading';
import axios from '../utils/axios';
import InfiniteScroll from "react-infinite-scroll-component"


const People = () => {
  const navigate=useNavigate();
  const [people,setPeople]=useState([]);
  const [page,setPage]=useState(1);
  const [hasMore,setHasMore]=useState(true);

      document.title="MovieThrill | people"


     const getPeople=async()=>{
      try{
        const {data}=await axios.get(`/person/popular?page=${page}`);
        console.log("data",data)
        if(data.results.length>0){
        setPeople((prev)=>[...prev,...data.results])
        setPage((prev)=>prev+1);
       }else{
        setHasMore(false);
       }

      }catch(err){
        console.log("error",err)

      }
    }
    const refreshHandler=()=>{
      if(people.length===0){
        getPeople();
      }else{
         setPage((prev)=>prev+1);
         setPeople([]);
         getPeople();

      }

    }
    useEffect(()=>{
      refreshHandler()
    },[])
  

  return people.length>0? (
    <div className="min-h-screen w-full">
      <div className="page-header gutter">
        <h1 onClick={()=>navigate(-1)}
         className="page-title">
          <i className="ri-arrow-left-line icon-btn"></i>
          People
        </h1>
       <div className="flex w-full items-center">
         <Topnav/>
       </div>
      </div>
       <InfiniteScroll dataLength={people.length}
       next={getPeople}
       hasMore={hasMore}
       loader={<div className="flex justify-center py-10"><span className="spinner"></span></div>}
       >
        <Cards data={people} title="person"/>

      </InfiniteScroll>


      
    </div>
  ):<Loading/>
}

export default People
