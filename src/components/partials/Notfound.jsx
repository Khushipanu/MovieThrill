import { Link, useNavigate } from "react-router-dom"

const Notfound = () => {
  const navigate=useNavigate();

  return (
    <div className="relative h-screen w-full overflow-hidden bg-primary">
      <img
        className="absolute inset-0 w-full h-full object-cover"
        src="/notfound.avif"
        alt="Page not found"
      />

      <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/60 to-primary"></div>

      <div className="relative z-10 flex w-full h-full items-center justify-center px-5">
        <div className="max-w-2xl animate-fade-up rounded-3xl border border-white/10 bg-black/45 px-7 py-10 text-center text-white shadow-2xl backdrop-blur-md sm:px-12 sm:py-14">
          <h1 className="bg-linear-to-br from-secondary-light to-fuchsia-400 bg-clip-text font-display text-7xl font-black text-transparent sm:text-9xl">404</h1>
          <h2 className="mt-3 font-display text-2xl font-bold sm:text-4xl">
            This scene is missing
          </h2>
          <p className="mx-auto mt-4 max-w-lg leading-7 text-zinc-300">
            The page or trailer you are looking for is unavailable, removed, or has moved somewhere else.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <button
              onClick={()=>navigate(-1)}
              className="btn-outline"
            >
              <i className="ri-arrow-left-line"></i>
              Go Back
            </button>

            <Link
              to="/"
              className="btn-primary"
            >
              <i className="ri-home-4-line"></i>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Notfound
