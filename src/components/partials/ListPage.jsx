import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Topnav from "./Topnav";
import Dropdown from "./Dropdown";
import Cards from "./Cards";
import usePagedList from "../../hooks/usePagedList";

/**
 * Shared layout for the listing pages (Trending, Popular, Movies, TV shows, People).
 * `filters` is a list of { title, option, value, onChange } dropdowns.
 */
const ListPage = ({ heading, tag, endpoint, cardType, filters = [], docTitle }) => {
  const navigate = useNavigate();
  const { items, hasMore, loadMore, error } = usePagedList(endpoint);

  useEffect(() => {
    document.title = `MovieThrill | ${docTitle || heading}`;
  }, [docTitle, heading]);

  const spinner = (
    <div className="flex justify-center py-16">
      <span className="spinner"></span>
    </div>
  );

  return (
    <div className="min-h-screen w-full">
      <div className="page-header gutter">
        <div className="flex shrink-0 items-center gap-3">
          <button onClick={() => navigate(-1)} aria-label="Go back" className="icon-btn">
            <i className="ri-arrow-left-line"></i>
          </button>
          <h1 className="page-title">
            {heading}
            {tag && <span className="tag">{tag.replaceAll("_", " ")}</span>}
          </h1>
        </div>

        <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center">
          <Topnav />
          {filters.length > 0 && (
            <div className="flex gap-3">
              {filters.map((f) => (
                <Dropdown key={f.title} title={f.title} option={f.option} value={f.value} func={(e) => f.onChange(e.target.value)} />
              ))}
            </div>
          )}
        </div>
      </div>

      {error ? (
        <div className="gutter flex flex-col items-center gap-4 py-24 text-center text-ink-muted">
          <i className="ri-wifi-off-line text-4xl text-secondary"></i>
          <p>Couldn&apos;t load this list. Check your connection and try again.</p>
          <button className="btn-outline" onClick={() => window.location.reload()}>
            <i className="ri-refresh-line"></i> Retry
          </button>
        </div>
      ) : items.length === 0 ? (
        spinner
      ) : (
        <InfiniteScroll dataLength={items.length} next={loadMore} hasMore={hasMore} loader={spinner}>
          <Cards data={items} title={cardType} />
        </InfiniteScroll>
      )}
    </div>
  );
};

export default ListPage;
