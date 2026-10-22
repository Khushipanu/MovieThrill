import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Notfound from "./Notfound";

const Trailer = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const category = pathname.includes("movie") ? "movie" : "tv";
  const ytvideo = useSelector((state) => state[category].info?.videos);
  return (
    <div className="fixed inset-0 z-[100] flex h-screen w-full animate-fade-in items-center justify-center bg-black/85 p-4 backdrop-blur-md sm:p-10">
      <button
        onClick={() => navigate(-1)}
        aria-label="Close trailer"
        className="ri-close-fill icon-btn absolute top-5 right-5 z-[101] size-12 text-3xl"
      ></button>

      {ytvideo? (
        <div className="aspect-video w-full max-w-6xl animate-fade-up overflow-hidden rounded-2xl bg-black shadow-2xl shadow-secondary/20 ring-1 ring-white/10">
          <ReactPlayer
            height="100%"
            width="100%"
            controls
            playing
            src={`https://www.youtube.com/watch?v=${ytvideo.key}`}
          />
        </div>
      ):<Notfound/>}
    </div>
  )
};

export default Trailer;
