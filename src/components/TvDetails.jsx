import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { asyncloadtv, removeTv } from "../store/actions/tvActions";
import Loading from "./partials/Loading";
import HorizontalCards from "./partials/HorizontalCards";

const TvDetails = () => {
  const {pathname}=useLocation();
  const {id}=useParams();
  const {info}=useSelector((state)=>state.tv);
  const dispatch=useDispatch();
  const navigate=useNavigate();

  useEffect(()=>{
    dispatch(asyncloadtv(id));
    return()=>{
      dispatch(removeTv());
    };
  },[dispatch,id]);

  return info ? (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-primary pb-16">
      {/* Backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[90vh]"
        style={{
          backgroundImage:`linear-gradient(to bottom, rgba(18,17,24,.35) 0%, rgba(18,17,24,.8) 55%, #121118 92%),
          url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
          backgroundPosition:"center top",
          backgroundSize:"cover",
          backgroundRepeat:"no-repeat",
        }}
      ></div>

      <div className="gutter relative">
      <nav className="flex h-20 w-full items-center gap-3 text-zinc-200">
        <button
          onClick={()=>navigate(-1)}
          aria-label="Go back"
          className="ri-arrow-left-line icon-btn text-xl"
        ></button>

        <div className="ml-auto flex items-center gap-3">
        {info.detail.homepage && (
          <a className="icon-btn" title="Official website" target="_blank" rel="noreferrer" href={info.detail.homepage}>
            <i className="ri-external-link-fill"></i>
          </a>
        )}

        {info.externalid.wikidata_id && (
          <a
            target="_blank"
            rel="noreferrer"
            title="Wikidata"
            href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
            className="icon-btn"
          >
            <i className="ri-earth-fill"></i>
          </a>
        )}

        {info.externalid.imdb_id && (
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://www.imdb.com/title/${info.externalid.imdb_id}`}
            className="flex h-10 items-center rounded-full bg-[#f5c518] px-4 text-sm font-extrabold tracking-wide text-black uppercase transition hover:brightness-110"
          >
            imdb
          </a>
        )}
        </div>
      </nav>

      {/**part 2 */}
      <div className="mt-4 flex w-full animate-fade-up flex-col items-center gap-8 md:flex-row md:items-start lg:gap-12">
        <img
          className="aspect-[2/3] w-full max-w-[260px] shrink-0 rounded-2xl object-cover shadow-2xl shadow-black/60 ring-1 ring-white/10 sm:max-w-[300px]"
          src={info.detail.poster_path || info.detail.backdrop_path
            ? `https://image.tmdb.org/t/p/original/${info.detail.poster_path || info.detail.backdrop_path}`
            : "/noimage.jpg"}
          alt={info.detail.name || info.detail.original_name || "TV show poster"}
        />

        <div className="content w-full min-w-0 text-white">
          <h1 className="font-display text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            {info.detail.name || info.detail.original_name}
            <small className="ml-3 align-middle text-xl font-medium text-zinc-400 sm:text-2xl">
              ({info.detail.first_air_date?.split("-")[0] || "N/A"})
            </small>
          </h1>

          <div className="my-6 flex flex-wrap items-center gap-3">
            <div className="mr-2 flex items-center gap-3">
              <span
                className="grid size-16 shrink-0 place-items-center rounded-full p-[3px] shadow-lg"
                style={{
                  backgroundImage:`conic-gradient(#f59e0b ${(info.detail.vote_average * 10).toFixed(0)}%, rgba(255,255,255,.1) 0)`,
                }}
              >
                <span className="grid size-full place-items-center rounded-full bg-primary text-base font-bold text-white">
                  {(info.detail.vote_average * 10).toFixed(0)}%
                </span>
              </span>
              <span className="w-[60px] text-sm leading-tight font-semibold text-zinc-300">User Score</span>
            </div>
            <span className="chip">
              <i className="ri-calendar-line text-secondary-light"></i>
              {info.detail.first_air_date || "Air date unavailable"}
            </span>
            <span className="chip">
              <i className="ri-film-line text-secondary-light"></i>
              {info.detail.genres?.map((g)=>g.name).join(", ") || "Genres unavailable"}
            </span>
            <span className="chip">
              <i className="ri-stack-line text-secondary-light"></i>
              {info.detail.number_of_seasons} Seasons
            </span>
          </div>

          {info.detail.tagline && (
            <p className="border-l-2 border-secondary pl-4 text-lg font-medium text-zinc-300 italic sm:text-xl">
              {info.detail.tagline}
            </p>
          )}

          <h2 className="detail-heading">Overview</h2>
          <p className="max-w-3xl leading-7 text-zinc-300">
            {info.detail.overview || "No overview available"}
          </p>

          <h2 className="detail-heading">TV show translated</h2>
          <p className="mb-8 w-full text-sm leading-6 text-zinc-400">
            {info.translations?.join(", ") || "No translations available"}
          </p>

          {info.videos?.key && (
            <Link
              className="btn-primary"
              to={`${pathname}/trailer`}
            >
              <i className="ri-play-fill text-xl"></i> Play Trailer
            </Link>
          )}
        </div>
      </div>

      {/**part 3 */}
      {(info.watchproviders?.flatrate?.length>0 ||
        info.watchproviders?.rent?.length>0 ||
        info.watchproviders?.buy?.length>0) && (
        <div className="glass mt-12 flex w-full flex-col gap-y-5 rounded-2xl p-5 text-white sm:p-7 lg:w-[80%]">
          {info.watchproviders?.flatrate && (
            <div className="flex flex-col gap-4 border-b border-white/10 pb-5 last:border-0 last:pb-0 sm:flex-row sm:items-center">
              <h3 className="w-48 shrink-0 font-semibold text-zinc-200"><i className="ri-tv-2-line mr-2 text-secondary-light"></i>Available on Platform</h3>
              <div className="flex flex-wrap gap-3">
                {info.watchproviders.flatrate.map((w)=>(
                  <img title={w.provider_name} key={w.provider_id}
                    className="size-12 rounded-xl object-cover shadow-md ring-1 ring-white/10 transition-transform hover:scale-110"
                    src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                    alt={w.provider_name}/>
                ))}
              </div>
            </div>
          )}

          {info.watchproviders?.rent && (
            <div className="flex flex-col gap-4 border-b border-white/10 pb-5 last:border-0 last:pb-0 sm:flex-row sm:items-center">
              <h3 className="w-48 shrink-0 font-semibold text-zinc-200"><i className="ri-time-line mr-2 text-secondary-light"></i>Available on Rent</h3>
              <div className="flex flex-wrap gap-3">
                {info.watchproviders.rent.map((w)=>(
                  <img title={w.provider_name} key={w.provider_id}
                    className="size-12 rounded-xl object-cover shadow-md ring-1 ring-white/10 transition-transform hover:scale-110"
                    src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                    alt={w.provider_name}/>
                ))}
              </div>
            </div>
          )}

          {info.watchproviders?.buy && (
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <h3 className="w-48 shrink-0 font-semibold text-zinc-200"><i className="ri-shopping-bag-3-line mr-2 text-secondary-light"></i>Available to Buy</h3>
              <div className="flex flex-wrap gap-3">
                {info.watchproviders.buy.map((w)=>(
                  <img title={w.provider_name} key={w.provider_id}
                    className="size-12 rounded-xl object-cover shadow-md ring-1 ring-white/10 transition-transform hover:scale-110"
                    src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                    alt={w.provider_name}/>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      </div>

      {/**part 4 recommendation */}
      <section className="relative mt-16">
        <h2 className="section-title gutter mb-6">Recommendations & similar stuff</h2>
        <HorizontalCards data={info.recommendations.length ? info.recommendations : info.similar} title="tv" />
      </section>
      <Outlet />
    </div>
  ) : (
    <Loading />
  )
}

export default TvDetails
