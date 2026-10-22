import { Link } from 'react-router-dom'

const Cards = ({data,title}) => {
  return (
    <div className="gutter grid w-full grid-cols-2 gap-x-5 gap-y-8 pt-6 pb-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6">

       {data.map((c,i)=> (
       <Link to={`/${c.media_type || title}/details/${c.id}`} className="group block animate-fade-up"
        key={`${c.id}-${i}`}>
         <div className="relative aspect-[2/3] overflow-hidden rounded-2xl bg-surface shadow-lg shadow-black/40 ring-1 ring-white/5 transition duration-300 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-secondary/20 group-hover:ring-secondary/60">
           <img className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              loading="lazy"
              src=
              {c.poster_path || c.backdrop_path || c.profile_path
                ? `https://image.tmdb.org/t/p/original${c.poster_path || c.backdrop_path || c.profile_path}`
                : "/noimage.jpg"}
              alt={c.name || c.title || c.original_name || c.original_title || "Poster"}/>

           <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent opacity-0 transition duration-300 group-hover:opacity-100"></div>

           <span className="absolute inset-0 m-auto grid size-14 scale-75 place-items-center rounded-full bg-secondary/90 text-2xl text-white opacity-0 shadow-xl backdrop-blur transition duration-300 group-hover:scale-100 group-hover:opacity-100">
             <i className="ri-arrow-right-up-line"></i>
           </span>

           {!!c.vote_average && (
             <div className="absolute top-2.5 right-2.5 flex items-center gap-1 rounded-full bg-black/65 px-2.5 py-1 text-xs font-semibold text-amber-300 ring-1 ring-white/10 backdrop-blur-md">
               <i className="ri-star-fill"></i>
               {(c.vote_average * 10).toFixed(0)}%
             </div>
           )}
         </div>

       <h1 className="mt-3 line-clamp-2 text-sm leading-snug font-semibold text-zinc-200 transition-colors group-hover:text-white sm:text-base">
                {c.name || c.title || c.original_name || c.original_title}
       </h1>

       </Link>))}

    </div>
  )
}

export default Cards
