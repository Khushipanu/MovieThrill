import { Link } from "react-router-dom";

const HorizontalCards = ({data, title, person}) => {
  return (

      <div className="gutter flex w-full snap-x scroll-px-5 gap-5 sm:scroll-px-8 lg:scroll-px-12 overflow-x-auto overflow-y-hidden pt-2 pb-8">
        {data.map((d, i) => (
          <Link to={`/${d.media_type || title}/details/${d.id}`} key={`${d.id}-${i}`}
           className="group w-60 shrink-0 snap-start overflow-hidden rounded-2xl border border-white/5 bg-surface transition duration-300 hover:-translate-y-1 hover:border-secondary/40 hover:shadow-xl hover:shadow-secondary/15 sm:w-64">

            <div className="relative aspect-video overflow-hidden bg-surface-2">
              <img className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
               loading="lazy"
               src={d.backdrop_path || d.poster_path
                 ? `https://image.tmdb.org/t/p/original${d.backdrop_path || d.poster_path}`
                 : "/noimage.jpg"}
               alt={d.title || d.name || d.original_name || d.original_title || "Poster"} />
              <div className="absolute inset-0 bg-linear-to-t from-surface via-transparent to-transparent opacity-80"></div>
              <span className="absolute right-3 bottom-3 grid size-9 translate-y-2 place-items-center rounded-full bg-secondary text-lg text-white opacity-0 shadow-lg transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <i className="ri-arrow-right-up-line"></i>
              </span>
            </div>

             <div className="p-4 text-white">

            <h1 className="line-clamp-1 font-semibold text-white">
              {d.title || d.name || d.original_name || d.original_title}
            </h1>
            <p
              className={`mt-1.5 text-sm leading-relaxed text-zinc-400 ${person ? "line-clamp-3" : "line-clamp-2"}`}
            >
              {d.overview?.slice(0,50) || "No overview available"}...
              <span className="text-secondary-light"> more </span>
            </p>
             </div>

          </Link>
        ))}
      </div>

  );
};

export default HorizontalCards;
