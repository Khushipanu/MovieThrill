import { Link } from "react-router-dom";

const year = (c) => (c.release_date || c.first_air_date || "").split("-")[0];

const Cards = ({ data, title }) => {
  return (
    <div className="gutter grid w-full grid-cols-2 gap-x-5 gap-y-8 pt-6 pb-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6">
      {data.map((c, i) => (
        <Link
          to={`/${c.media_type || title}/details/${c.id}`}
          className="group block animate-fade-up"
          key={`${c.id}-${i}`}
        >
          <div className="relative aspect-[2/3] overflow-hidden rounded-xl bg-surface ring-1 ring-line transition duration-300 group-hover:ring-ink-faint">
            <img
              className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
              loading="lazy"
              src={
                c.poster_path || c.backdrop_path || c.profile_path
                  ? `https://image.tmdb.org/t/p/w500${c.poster_path || c.backdrop_path || c.profile_path}`
                  : "/noimage.jpg"
              }
              alt={c.name || c.title || c.original_name || c.original_title || "Poster"}
            />

            {!!c.vote_average && (
              <div className="absolute top-2.5 left-2.5 flex items-center gap-1 rounded-md bg-primary/85 px-2 py-1 text-xs font-bold text-gold backdrop-blur-sm">
                <i className="ri-star-fill"></i>
                {c.vote_average.toFixed(1)}
              </div>
            )}
          </div>

          <h3 className="mt-3 line-clamp-2 text-sm leading-snug font-semibold text-ink-soft transition-colors group-hover:text-ink sm:text-[15px]">
            {c.name || c.title || c.original_name || c.original_title}
          </h3>
          <p className="mt-1 text-xs font-medium text-ink-faint capitalize">
            {[year(c), c.media_type || (title !== "all" ? title : "")].filter(Boolean).join(" · ") ||
              c.known_for_department}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default Cards;
