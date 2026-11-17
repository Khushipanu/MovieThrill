import { Link } from "react-router-dom";

const Header = ({ data }) => {
  const title = data.title || data.name || data.original_name || data.original_title;
  const date = data.release_date || data.first_air_date;
  const type = data.media_type || "movie";
  const overview = data.overview || "";

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(to top, #0e0c0b 0%, rgba(14,12,11,.6) 35%, rgba(14,12,11,.1) 70%),
        linear-gradient(to right, rgba(14,12,11,.85) 0%, rgba(14,12,11,.35) 50%, transparent 80%),
        url(https://image.tmdb.org/t/p/original${data.backdrop_path || data.poster_path})`,
        backgroundPosition: "center top",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="gutter flex min-h-[62vh] w-full flex-col items-start justify-end pt-28 pb-12 md:min-h-[70vh]"
    >
      <div className="w-full max-w-3xl animate-fade-up">
        <p className="eyebrow mb-4">Trending today</p>

        <h1 className="font-display text-4xl leading-[1.05] font-bold tracking-tight text-ink drop-shadow-lg sm:text-5xl lg:text-6xl">
          {title}
        </h1>

        {overview && (
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-ink-soft sm:text-base">
            {overview.length > 200 ? `${overview.slice(0, 200)}…` : overview}
            <Link to={`/${type}/details/${data.id}`} className="ml-1 font-semibold text-secondary-light hover:underline">
              more
            </Link>
          </p>
        )}

        <div className="mt-5 flex flex-wrap items-center gap-3">
          {date && (
            <span className="chip">
              <i className="ri-calendar-line text-ink-muted"></i>
              {date}
            </span>
          )}
          {!!data.vote_average && (
            <span className="chip">
              <i className="ri-star-fill text-gold"></i>
              {data.vote_average.toFixed(1)}
            </span>
          )}
          <span className="tag">{type}</span>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link to={`/${type}/details/${data.id}/trailer`} className="btn-primary">
            <i className="ri-play-fill text-xl"></i>
            Watch trailer
          </Link>
          <Link to={`/${type}/details/${data.id}`} className="btn-outline">
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
