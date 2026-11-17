import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const inputClass =
  "w-full rounded-lg border border-line bg-primary px-4 py-3 text-ink outline-none placeholder:text-ink-faint transition focus:border-secondary";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    document.title = "MovieThrill | Contact Us";
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Replace with your actual contact email
    const contactEmail = "khushipanu007@example.com";

    const subject = encodeURIComponent(
      `MovieThrill Contact - ${form.name}`
    );

    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    );

    window.location.href =
      `mailto:${contactEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-primary text-white">

      <div className="relative mx-auto max-w-5xl px-6 py-10 md:py-14">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-ink-muted transition-colors hover:text-ink">
          <i className="ri-arrow-left-line icon-btn"></i>
          Back to home
        </Link>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1.15fr]">
          {/* Main Heading */}
          <div className="animate-fade-up">
            <p className="eyebrow mb-4">Get in touch</p>
            <h1 className="font-display text-4xl font-extrabold tracking-tight md:text-5xl">
              Contact Us
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-ink-soft">
              Have a question, suggestion, or feedback?
              We'd love to hear from you! Whether it's
              about your favorite movies, TV shows,
              or your experience with MovieThrill, feel free
              to get in touch.
            </p>

            <div className="mt-8 flex flex-col gap-3">
              <div className="flex items-center gap-4 text-sm text-ink-muted">
                <span className="grid size-11 place-items-center rounded-lg bg-surface-2 text-xl text-secondary">
                  <i className="ri-chat-smile-2-line"></i>
                </span>
                Feedback and suggestions are always welcome
              </div>
              <div className="flex items-center gap-4 text-sm text-ink-muted">
                <span className="grid size-11 place-items-center rounded-lg bg-surface-2 text-xl text-secondary">
                  <i className="ri-film-line"></i>
                </span>
                Questions about movies, shows or the site
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <section className="animate-fade-up rounded-2xl border border-line bg-surface p-6 [animation-delay:120ms] sm:p-8">

            <h2 className="font-display text-2xl font-semibold">
              Send Us a Message
            </h2>

            <p className="mt-2 mb-8 text-sm leading-6 text-ink-muted">
              Fill out the form below to get in touch
              with us. We appreciate your feedback
              and suggestions.
            </p>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* Name */}
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-ink-soft">
                  Your Name
                </label>

                <input
                  id="name"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  className={inputClass}
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-ink-soft">
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  required
                  className={inputClass}
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-ink-soft">
                  Your Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  rows="6"
                  required
                  className={`${inputClass} resize-none`}
                ></textarea>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="btn-primary w-full sm:w-auto"
              >
                <i className="ri-send-plane-fill"></i>
                Send Message
              </button>

            </form>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-16 border-t border-line pt-8">
          <p className="text-sm leading-7 text-ink-faint">
            MovieThrill — Connecting movie lovers through
            the magic of cinema.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Contact;
