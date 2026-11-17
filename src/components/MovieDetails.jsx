import { useSelector } from "react-redux";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { asyncloadmovie, removeMovie } from "../store/actions/movieActions";
import Loading from "./partials/Loading";
import HorizontalCards from "./partials/HorizontalCards";
import Notfound from "./partials/Notfound";
import useDetails from "../hooks/useDetails";

const MovieDetails = () => {
  const {pathname}=useLocation();
  const { id } = useParams();
  const { info } = useSelector((state) => state.movie);
  const navigate = useNavigate();
  const failed = useDetails(id, asyncloadmovie, removeMovie);

  if (failed) return <Notfound />;
  return info ? (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-primary pb-16">
      {/* Backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[90vh]"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(14,12,11,.35) 0%, rgba(14,12,11,.8) 55%, #0e0c0b 92%),
        url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
          backgroundPosition: "center top",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      ></div>

      <div className="gutter relative">
      <nav className="flex h-20 w-full items-center gap-3 text-ink">
        <button
          onClick={() => navigate(-1)}
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
          className="aspect-[2/3] w-full max-w-[260px] shrink-0 rounded-2xl object-cover shadow-2xl shadow-black/60 ring-1 ring-line sm:max-w-[300px]"
          src={info.detail.poster_path || info.detail.backdrop_path
            ? `https://image.tmdb.org/t/p/original/${info.detail.poster_path || info.detail.backdrop_path}`
            : "/noimage.jpg"}
          alt={info.detail.title || info.detail.original_title || "Movie poster"}
        />

        <div className="content w-full min-w-0 text-white">
          <h1 className="font-display text-3xl leading-tight font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {info.detail.name ||
              info.detail.title ||
              info.detail.original_name ||
              info.detail.original_title}
            <small className="ml-3 align-middle text-xl font-medium text-ink-muted sm:text-2xl">
              ({info.detail.release_date?.split("-")[0] || "N/A"})
            </small>
          </h1>

          <div className="my-6 flex flex-wrap items-center gap-3">
            <div className="mr-2 flex items-center gap-3">
              <span
                className="grid size-16 shrink-0 place-items-center rounded-full p-[3px] shadow-lg"
                style={{
                  backgroundImage: `conic-gradient(#e6b450 ${(info.detail.vote_average * 10).toFixed(0)}%, #2c2723 0)`,
                }}
              >
                <span className="grid size-full place-items-center rounded-full bg-primary text-base font-bold text-white">
                  {(info.detail.vote_average * 10).toFixed(0)}%
                </span>
              </span>
              <span className="w-[60px] text-sm leading-tight font-semibold text-ink-muted">User<br/>score</span>
            </div>
            <span className="chip"><i className="ri-calendar-line text-ink-muted"></i>{info.detail.release_date || "Release date unavailable"}</span>
            <span className="chip"><i className="ri-film-line text-ink-muted"></i>{info.detail.genres?.map((g)=>g.name).join(", ") || "Genres unavailable"}</span>
            {!!info.detail.runtime && (<span className="chip"><i className="ri-time-line text-ink-muted"></i>{Math.floor(info.detail.runtime/60)}h {info.detail.runtime%60}m</span>)}
          </div>

          {info.detail.tagline && (
            <p className="border-l-2 border-secondary pl-4 font-display text-lg font-medium text-ink-soft italic sm:text-xl">
              {info.detail.tagline}
            </p>
          )}

          <h2 className="detail-heading">Overview</h2>
          <p className="max-w-3xl leading-7 text-ink-soft">{info.detail.overview || "No overview available"}</p>

          <h2 className="detail-heading">Available in</h2>
          <p className="mb-8 w-full text-sm leading-6 text-ink-muted">{info.translations?.join(", ") || "No translations available"}</p>
          {info.videos?.key && (
            <Link className="btn-primary" to={`${pathname}/trailer`}>
              <i className="ri-play-fill text-xl"></i> Play Trailer
            </Link>
          )}

        </div>
      </div>
            {/**part 3 */}
            {(info.watchproviders?.flatrate?.length>0 ||
              info.watchproviders?.rent?.length>0 ||
              info.watchproviders?.buy?.length>0
            ) && (
        <div className="mt-12 border border-line bg-surface/80 backdrop-blur-md flex w-full flex-col gap-y-5 rounded-2xl p-5 text-white sm:p-7 lg:w-[80%]">
        {info.watchproviders && info.watchproviders.flatrate && (
          <div className="flex flex-col gap-4 border-b border-line pb-5 last:border-0 last:pb-0 sm:flex-row sm:items-center">
            <h3 className="w-48 shrink-0 font-semibold text-ink"><i className="ri-tv-2-line mr-2 text-ink-muted"></i>Available on Platform</h3>
            <div className="flex flex-wrap gap-3">
              {info.watchproviders.flatrate.map((w) => (
              <img
                title={w.provider_name}
                key={w.provider_id}
                alt={w.provider_name}
                className="size-12 rounded-xl object-cover shadow-md ring-1 ring-white/10 transition-transform hover:scale-110"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
              />
              ))}
            </div>
          </div>
        )}

        {info.watchproviders && info.watchproviders.rent && (
          <div className="flex flex-col gap-4 border-b border-line pb-5 last:border-0 last:pb-0 sm:flex-row sm:items-center">
            <h3 className="w-48 shrink-0 font-semibold text-ink"><i className="ri-time-line mr-2 text-ink-muted"></i>Available on Rent</h3>
            <div className="flex flex-wrap gap-3">
              {info.watchproviders.rent.map((w) => (
              <img
                title={w.provider_name}
                key={w.provider_id}
                alt={w.provider_name}
                className="size-12 rounded-xl object-cover shadow-md ring-1 ring-white/10 transition-transform hover:scale-110"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
              />
              ))}
            </div>
          </div>
        )}

        {info.watchproviders && info.watchproviders.buy && (
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <h3 className="w-48 shrink-0 font-semibold text-ink"><i className="ri-shopping-bag-3-line mr-2 text-ink-muted"></i>Available to Buy</h3>
            <div className="flex flex-wrap gap-3">
              {info.watchproviders.buy.map((w) => (
              <img
                title={w.provider_name}
                key={w.provider_id}
                alt={w.provider_name}
                className="size-12 rounded-xl object-cover shadow-md ring-1 ring-white/10 transition-transform hover:scale-110"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
              />
              ))}
            </div>
          </div>
        )}
      </div>
            ) }
      </div>

            {/**part 4 recommendation */}
         <section className="relative mt-16">
             <h2 className="section-title gutter mb-5">
              More like this
            </h2>
              <HorizontalCards data={info.recommendations.length?
                 info.recommendations:info.similar} title="movie" />
         </section>
         <Outlet />

    </div>
  ) : (
    <Loading />
  );
};

export default MovieDetails;
