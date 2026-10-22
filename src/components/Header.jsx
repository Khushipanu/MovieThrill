import { Link } from 'react-router-dom';

const Header = ({data}) => {
  return (
    <div style={{
        backgroundImage:`linear-gradient(to top, #121118 0%, rgba(18,17,24,.55) 35%, rgba(0,0,0,.15) 70%),
        linear-gradient(to right, rgba(0,0,0,.8) 0%, rgba(0,0,0,.35) 50%, transparent 80%),
        url(https://image.tmdb.org/t/p/original/${data.backdrop_path || data.profile_path})`,
    backgroundPosition:"center top" ,
    backgroundSize:"cover",
    backgroundRepeat:"no-repeat"
    }}
    className="gutter flex min-h-[62vh] w-full flex-col items-start justify-end pt-28 pb-12 md:min-h-[70vh]">

      <div className="w-full max-w-3xl animate-fade-up">
        <span className="chip mb-5 text-xs font-medium tracking-wider uppercase">
          <i className="ri-fire-fill text-orange-400"></i> Trending today
        </span>

        <h1 className="font-display text-4xl leading-[1.05] font-extrabold tracking-tight text-white drop-shadow-lg sm:text-5xl lg:text-6xl">
          {data.title|| data.name || data.original_name || data.original_title}
        </h1>

        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-zinc-300 sm:text-base">
          {data.overview.slice(0,200)}...
          <Link to={`/${data.media_type}/details/${data.id}`} className="ml-1 font-semibold text-secondary-light hover:underline">more</Link>
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <span className="chip">
            <i className="ri-megaphone-fill text-amber-400"></i>
            {data.release_date || "12-01-2005"}
          </span>
          <span className="chip">
            <i className="ri-album-fill text-amber-400"></i>
            {data.media_type.toUpperCase()}
          </span>
        </div>

        <Link to={`/${data.media_type}/details/${data.id}/trailer`} className="btn-primary mt-8">
          <i className="ri-play-fill text-xl"></i>
          Watch Trailer
        </Link>
      </div>
    </div>
  )
}

export default Header
