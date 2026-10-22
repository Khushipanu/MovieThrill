import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { asyncloadperson, removePerson } from "../store/actions/personActions";
import Loading from "./partials/Loading";
import HorizontalCards from "./partials/HorizontalCards";

const PersonDetails = () => {
  const {id}=useParams();
  const {info}=useSelector((state)=>state.person);
  const dispatch=useDispatch();
  const navigate=useNavigate();

  useEffect(()=>{
    dispatch(asyncloadperson(id));
    return()=>{
      dispatch(removePerson());
    };
  },[dispatch,id]);

  return info ? (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-primary pb-16">
      {/* Backdrop (blurred profile photo) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[80vh] overflow-hidden">
        <div
          className="absolute inset-0 scale-110 opacity-50 blur-2xl"
          style={{
            backgroundImage:`url(https://image.tmdb.org/t/p/original/${info.detail.profile_path})`,
            backgroundPosition:"center",
            backgroundSize:"cover",
            backgroundRepeat:"no-repeat",
          }}
        ></div>
        <div className="absolute inset-0 bg-linear-to-b from-primary/30 via-primary/80 via-55% to-primary to-92%"></div>
      </div>

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
            href={`https://www.imdb.com/name/${info.externalid.imdb_id}`}
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
          src={info.detail.profile_path
            ? `https://image.tmdb.org/t/p/original/${info.detail.profile_path}`
            : "/noimage.jpg"}
          alt={info.detail.name || "Person profile"}
        />

        <div className="content w-full min-w-0 text-white">
          <h1 className="font-display text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            {info.detail.name}
          </h1>

          <div className="my-6 flex flex-wrap items-center gap-3">
            <span className="chip">
              <i className="ri-briefcase-line text-secondary-light"></i>
              {info.detail.known_for_department || "Department unavailable"}
            </span>
            <span className="chip">
              <i className="ri-cake-2-line text-secondary-light"></i>
              Born: {info.detail.birthday || "Unavailable"}
            </span>
            {info.detail.deathday && (
              <span className="chip">
                <i className="ri-candle-line text-secondary-light"></i>
                Died: {info.detail.deathday}
              </span>
            )}
            <span className="chip">
              <i className="ri-map-pin-line text-secondary-light"></i>
              {info.detail.place_of_birth || "Birthplace unavailable"}
            </span>
          </div>

          <h2 className="detail-heading">Biography</h2>
          <p className="max-w-3xl leading-7 whitespace-pre-line text-zinc-300">
            {info.detail.biography || "No biography available"}
          </p>
        </div>
      </div>
      </div>

      {/**part 3 known work */}
      <section className="relative mt-16">
        <h2 className="section-title gutter mb-6">Known for</h2>
        <HorizontalCards data={info.combinedcredits} person />
      </section>
    </div>
  ) : (
    <Loading />
  )
}

export default PersonDetails
