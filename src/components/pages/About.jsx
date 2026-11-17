import { useEffect } from "react";
import { Link } from "react-router-dom";

const sections = [
  {
    icon: "ri-movie-2-line",
    title: "Discover the World of Movies",
    text: "Movies have the power to entertain, inspire, and connect people across the world. Whether you enjoy action-packed adventures, emotional dramas, exciting thrillers, or lighthearted comedies, there is always something new to discover.",
  },
  {
    icon: "ri-sparkling-2-line",
    title: "What We Offer",
    text: "MovieThrill provides information about popular movies, trending TV shows, ratings, release dates, and the talented actors behind your favorite stories. Our goal is to make movie discovery simple, enjoyable, and accessible for everyone.",
  },
  {
    icon: "ri-heart-3-line",
    title: "Our Purpose",
    text: "We believe that every great movie deserves to be discovered. MovieThrill is designed to help cinema enthusiasts explore different genres, learn about their favorite films, and stay informed about what's happening in the world of entertainment.",
  },
];

const About = () => {
  useEffect(() => {
    document.title = "MovieThrill | About";
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-primary text-white">

      <div className="relative mx-auto max-w-5xl px-6 py-10 md:py-14">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-ink-muted transition-colors hover:text-ink">
          <i className="ri-arrow-left-line icon-btn"></i>
          Back to home
        </Link>

        {/* Main Heading */}
        <div className="mt-12 mb-14 max-w-3xl animate-fade-up">
          <p className="eyebrow mb-4">About us</p>
          <h1 className="font-display text-4xl font-extrabold tracking-tight md:text-6xl">
            About <span className="text-secondary">MovieThrill</span>
          </h1>

          <p className="mt-6 text-lg leading-8 text-ink-soft">
            Welcome to MovieThrill, a place where movie lovers
            can discover and explore the fascinating world
            of cinema. From the latest blockbusters to
            timeless classics, we bring movie information
            together in one convenient place.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {sections.map((s, i) => (
            <section
              key={s.title}
              style={{ animationDelay: `${(i + 1) * 100}ms` }}
              className="glass animate-fade-up rounded-2xl p-6 transition duration-300 hover:border-ink-faint"
            >
              <span className="grid size-12 place-items-center rounded-lg bg-surface-2 text-2xl text-secondary">
                <i className={s.icon}></i>
              </span>
              <h2 className="mt-5 mb-3 font-display text-xl font-semibold">
                {s.title}
              </h2>
              <p className="text-sm leading-7 text-ink-muted">{s.text}</p>
            </section>
          ))}
        </div>

        {/* Closing Text */}
        <div className="mt-16 border-t border-line pt-8">
          <p className="text-sm leading-7 text-ink-faint">
            MovieThrill — Explore stories, discover cinema,
            and celebrate the magic of movies.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
