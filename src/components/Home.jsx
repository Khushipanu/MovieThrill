import { useEffect, useState } from "react";
import Sidenav from "./partials/Sidenav";
import Topnav from "./partials/Topnav";
import axios from "../utils/axios";
import Header from "./Header";
import HorizontalCards from "./partials/HorizontalCards";
import Dropdown from "./partials/Dropdown";
import Loading from "./partials/Loading";

const Home = () => {
  const [wallpaper, setWallpaper] = useState(null);
  const [trending, setTrending] = useState([]);
  const [category, setCategory] = useState("all");

  useEffect(() => {
    document.title = "MovieThrill | Home";
  }, []);

  // Hero: pick a random trending movie/show that actually has a backdrop
  useEffect(() => {
    axios
      .get("/trending/all/day")
      .then(({ data }) => {
        const withImage = data.results.filter((r) => r.backdrop_path && r.media_type !== "person");
        const pool = withImage.length ? withImage : data.results;
        setWallpaper(pool[Math.floor(Math.random() * pool.length)]);
      })
      .catch((err) => console.error("Failed to load hero", err));
  }, []);

  useEffect(() => {
    let ignore = false;
    axios
      .get(`/trending/${category}/day`)
      .then(({ data }) => !ignore && setTrending(data.results))
      .catch((err) => console.error("Failed to load trending", err));
    return () => {
      ignore = true;
    };
  }, [category]);

  return wallpaper && trending.length > 0 ? (
    <>
      <Sidenav />
      <div className="relative min-w-0 flex-1 overflow-x-hidden">
        <div className="gutter absolute inset-x-0 top-0 z-30 pl-16 md:pl-8 lg:pl-12">
          <Topnav />
        </div>
        <Header data={wallpaper} />

        <div className="gutter mt-6 mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow mb-1.5">Right now</p>
            <h2 className="section-title">Trending</h2>
          </div>
          <Dropdown title="Filter" option={["all", "movie", "tv"]} value={category} func={(e) => setCategory(e.target.value)} />
        </div>
        <HorizontalCards data={trending} />
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Home;
