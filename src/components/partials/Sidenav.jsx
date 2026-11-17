import { useState } from 'react'
import { Link, NavLink } from "react-router-dom"

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

const linkClass = ({ isActive }) =>
  `group relative flex items-center gap-3 rounded-lg px-4 py-2.5 text-[15px] font-semibold transition-colors duration-200 ${
    isActive
      ? "bg-surface-2 text-ink before:absolute before:inset-y-2 before:left-0 before:w-[3px] before:rounded-full before:bg-secondary"
      : "text-ink-muted hover:bg-surface-2/60 hover:text-ink"
  }`;

const Sidenav = () => {
  // UI-only state: controls the slide-in drawer on small screens
  const [open, setOpen] = useState(false);

  const renderLinks = (links) =>
    links.map((l) => (
      <NavLink key={l.to} to={l.to} onClick={() => setOpen(false)} className={linkClass}>
        {({ isActive }) => (
          <>
            <i className={`${l.icon} text-xl transition-colors ${isActive ? "text-secondary" : "text-ink-faint group-hover:text-ink-soft"}`}></i>
            {l.label}
          </>
        )}
      </NavLink>
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
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col overflow-y-auto border-r border-line bg-surface px-5 py-6 transition-transform duration-300 md:sticky md:top-0 md:h-screen md:w-64 md:shrink-0 md:translate-x-0 lg:w-72 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-2">
          <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
            <span className="grid size-9 place-items-center rounded-lg bg-secondary text-lg text-white">
              <i className="ri-film-fill"></i>
            </span>
            <span className="font-display text-2xl font-bold tracking-tight text-ink">
              Movie<span className="text-secondary">Thrill</span>
            </span>
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
          <h1 className="mb-3 px-4 text-[11px] font-bold tracking-[0.22em] text-ink-faint uppercase">
            Browse
          </h1>
          {renderLinks(feedLinks)}
        </nav>

        <hr className="my-6 border-line" />

        <nav className="flex flex-col gap-1">
          <h1 className="mb-3 px-4 text-[11px] font-bold tracking-[0.22em] text-ink-faint uppercase">
            About the site
          </h1>
          {renderLinks(infoLinks)}
        </nav>

        <p className="mt-auto px-4 pt-8 text-xs leading-5 text-ink-faint">
          Data provided by TMDB.
        </p>
      </aside>
    </>
  )
}

export default Sidenav
