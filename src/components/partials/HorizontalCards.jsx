import { Link } from "react-router-dom";

const HorizontalCards = ({ data, title, person }) => {
  if (!data?.length) {
    return <p className="gutter pb-8 text-sm text-ink-faint">Nothing to show here yet.</p>;
  }

  return (
    <div className="gutter flex w-full snap-x scroll-px-5 gap-5 overflow-x-auto overflow-y-hidden pt-2 pb-8 sm:scroll-px-8 lg:scroll-px-12">
      {data.map((d, i) => (
        <Link
          to={`/${d.media_type || title}/details/${d.id}`}
          key={`${d.id}-${i}`}
          className="group w-60 shrink-0 snap-start overflow-hidden rounded-xl border border-line bg-surface transition duration-300 hover:border-ink-faint sm:w-64"
        >
          <div className="relative aspect-video overflow-hidden bg-surface-2">
            <img
              className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
              loading="lazy"
              src={
                d.backdrop_path || d.poster_path
                  ? `https://image.tmdb.org/t/p/w780${d.backdrop_path || d.poster_path}`
                  : "/noimage.jpg"
              }
              alt={d.title || d.name || d.original_name || d.original_title || "Poster"}
            />
            {!!d.vote_average && (
              <span className="absolute top-2.5 left-2.5 flex items-center gap-1 rounded-md bg-primary/85 px-2 py-1 text-xs font-bold text-gold backdrop-blur-sm">
                <i className="ri-star-fill"></i>
                {d.vote_average.toFixed(1)}
              </span>
            )}
          </div>

          <div className="p-4">
            <h3 className="line-clamp-1 font-semibold text-ink">{d.title || d.name || d.original_name || d.original_title}</h3>
            {person && d.character ? (
              <p className="mt-1.5 line-clamp-2 text-sm text-ink-muted">as {d.character}</p>
            ) : (
              <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-ink-muted">
                {d.overview || "No overview available."}
              </p>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default HorizontalCards;
