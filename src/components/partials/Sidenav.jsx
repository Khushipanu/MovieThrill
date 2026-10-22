import { useState } from 'react'
import { Link } from "react-router-dom"

const feedLinks = [
  { to: "/trending", icon: "ri-fire-line", label: "Trending" },
  { to: "/popular", icon: "ri-magic-line", label: "Popular" },
  { to: "/movies", icon: "ri-folder-video-line", label: "Movies" },
  { to: "/tvshows", icon: "ri-tv-line", label: "TV shows" },
  { to: "/people", icon: "ri-team-line", label: "People" },
];

const infoLinks = [
  { to: "/about", icon: "ri-information-line", label: "About" },
  { to: "/contact", icon: "ri-phone-line", label: "Contact Us" },
];

const linkClass =
  "group flex items-center gap-3 rounded-xl px-4 py-3 text-[15px] font-medium text-zinc-400 transition-all duration-200 hover:translate-x-1 hover:bg-secondary hover:text-white hover:shadow-lg hover:shadow-secondary/25";

const Sidenav = () => {
  // UI-only state: controls the slide-in drawer on small screens
  const [open, setOpen] = useState(false);

  const renderLinks = (links) =>
    links.map((l) => (
      <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className={linkClass}>
        <i className={`${l.icon} text-xl text-zinc-500 transition-colors group-hover:text-white`}></i>
        {l.label}
      </Link>
    ));

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="icon-btn fixed top-5 left-4 z-40 md:hidden"
      >
        <i className="ri-menu-2-line"></i>
      </button>

      {/* Mobile backdrop */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-50 animate-fade-in bg-black/60 backdrop-blur-sm md:hidden"
        ></div>
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col overflow-y-auto border-r border-white/5 bg-surface px-5 py-6 transition-transform duration-300 md:sticky md:top-0 md:h-screen md:w-64 md:shrink-0 md:translate-x-0 lg:w-72 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-2">
          <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
            <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-secondary to-fuchsia-500 text-xl text-white shadow-lg shadow-secondary/30">
              <i className="ri-remix-line"></i>
            </span>
            <span className="font-display text-2xl font-bold tracking-tight text-white">MovieThrill</span>
          </Link>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="icon-btn md:hidden"
          >
            <i className="ri-close-line"></i>
          </button>
        </div>

        <nav className="mt-10 flex flex-col gap-1">
          <h1 className="mb-3 px-4 text-xs font-semibold tracking-[0.2em] text-zinc-500 uppercase">
            New Feeds
          </h1>
          {renderLinks(feedLinks)}
        </nav>

        <hr className="my-6 border-white/5" />

        <nav className="flex flex-col gap-1">
          <h1 className="mb-3 px-4 text-xs font-semibold tracking-[0.2em] text-zinc-500 uppercase">
            Website Information
          </h1>
          {renderLinks(infoLinks)}
        </nav>

        <p className="mt-auto px-4 pt-8 text-xs leading-5 text-zinc-600">
          Data provided by TMDB.
        </p>
      </aside>
    </>
  )
}

export default Sidenav
