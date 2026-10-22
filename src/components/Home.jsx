import React from 'react'
import Sidenav from './partials/Sidenav'
import Topnav from './partials/Topnav'
import { useEffect } from 'react'
import axios from "../utils/axios"
import Header from './Header'
import { useState } from 'react'
import HorizontalCards from './partials/HorizontalCards'
import Dropdown from './partials/Dropdown'
import Loading from './partials/Loading'

const Home = () => {
    document.title="MovieThrill | Home page"
    const [wallpaper, setWallpaper] = useState(null);
    const [trending,setTrending]=useState([]);
    const [category, setCategory] = useState("all");

    const getHeaderWallpaper=async()=>{
      try{
        const {data}=await axios.get(`/trending/all/day`)
       let randomData= data.results[Math.floor(Math.random()* data.results.length)]
        setWallpaper(randomData);
      }catch(err){
        console.log("error",err);

      }
    }
    const getTrending=async()=>{
      try{
        const {data}=await axios.get(`/trending/${category}/day`);
        setTrending(data.results);

      }catch(err){
        console.log("error",err)

      }
    }
   useEffect(() => {
    document.title = "MovieThrill | Home page";
    getTrending();
    !wallpaper && getHeaderWallpaper();
  }, [category]);
 
  return wallpaper && trending.length>0?(
   <>
   <Sidenav/>
   <div className="relative min-w-0 flex-1 overflow-x-hidden">
    <div className="gutter absolute inset-x-0 top-0 z-30 pl-16 md:pl-8 lg:pl-12">
      <Topnav/>
    </div>
    <Header data={wallpaper}/>

     <div className="gutter mt-6 mb-5 flex items-center justify-between gap-4">
        <h1 className="section-title">Trending</h1>
        <Dropdown title="Filter" option={['tv','movie','all']}
        //dropdown se jo bhi value aaegi , hamari category ko change kregi
        func={(e)=>setCategory(e.target.value)}

        />

      </div>
    <HorizontalCards data={trending}/>

   </div>
   </>
  ): (<Loading/>)

}

export default Home
