import axios from "../../utils/axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Topnav = () => {
  const [query, setQuery] = useState("");
  const [searches, setSearches] = useState([]);

  useEffect(() => {
    const q = query.trim();
    if (!q) return;

    // wait until the user pauses typing, and drop stale responses
    let ignore = false;
    const timer = setTimeout(async () => {
      try {
        const { data } = await axios.get("/search/multi", { params: { query: q } });
        if (!ignore) setSearches(data.results || []);
      } catch (err) {
        console.error("Search failed", err);
      }
    }, 300);

    return () => {
      ignore = true;
      clearTimeout(timer);
    };
  }, [query]);

  const clear = () => {
    setQuery("");
    setSearches([]);
  };
  const results = query.trim() ? searches : [];

  return (
    <div className="relative flex w-full items-center py-3">
      <div className="group relative w-full max-w-xl">
        <div className="flex h-12 w-full items-center gap-3 rounded-full border border-line bg-surface/80 px-5 backdrop-blur-md transition duration-200 focus-within:border-secondary/70 focus-within:bg-surface">
          <i className="ri-search-line text-xl text-ink-faint transition-colors group-focus-within:text-secondary"></i>
          <input
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Escape" && clear()}
            value={query}
            className="w-full min-w-0 bg-transparent text-[15px] text-ink outline-none placeholder:text-ink-faint"
            type="search"
            aria-label="Search"
            placeholder="Search movies, shows, people…"
          />
          {query.length > 0 && (
            <button onClick={clear} aria-label="Clear search" className="text-xl text-ink-faint transition-colors hover:text-ink">
              <i className="ri-close-line"></i>
            </button>
          )}
        </div>

        {results.length > 0 && (
          <div className="absolute top-full left-0 z-50 mt-2 max-h-[60vh] w-full animate-fade-in overflow-auto rounded-2xl border border-line bg-surface p-2 shadow-2xl shadow-black/60">
            {results.map((s) => (
              <Link
                to={`/${s.media_type}/details/${s.id}`}
                key={`${s.media_type}-${s.id}`}
                onClick={clear}
                className="flex w-full items-center gap-4 rounded-xl p-2.5 text-sm font-medium text-ink-soft transition-colors hover:bg-surface-2 hover:text-ink"
              >
                <img
                  className="h-14 w-14 shrink-0 rounded-lg object-cover"
                  loading="lazy"
                  src={
                    s.backdrop_path || s.poster_path || s.profile_path
                      ? `https://image.tmdb.org/t/p/w185${s.backdrop_path || s.poster_path || s.profile_path}`
                      : "/noimage.jpg"
                  }
                  alt=""
                />
                <span className="line-clamp-2">{s.title || s.name || s.original_name || s.original_title}</span>
                {s.media_type && <span className="tag ml-auto">{s.media_type}</span>}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Topnav;
