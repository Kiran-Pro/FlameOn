import { Link } from "react-router-dom";
import { FaArrowRight, FaShieldHeart } from "react-icons/fa6";

const Hero = () => {
  return (
    <section
      className="relative min-h-[92vh] flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8"
      aria-label="Welcome to FlameOn"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=2400&q=80')",
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/80 via-black/60 to-black/85" />

      {/* Ambient glows */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
      >
        <div
          className="absolute -top-20 -left-20 h-64 w-64 md:h-96 md:w-96 rounded-full opacity-70"
          style={{
            background:
              "radial-gradient(closest-side, rgba(250,204,21,0.27), rgba(250,204,21,0.10) 55%, transparent 70%)",
            filter: "blur(8px)",
          }}
        />
        <div
          className="absolute -bottom-20 -right-20 h-72 w-72 md:h-[30rem] md:w-[30rem] rounded-full opacity-60"
          style={{
            background:
              "radial-gradient(closest-side, rgba(249,115,22,0.22), rgba(249,115,22,0.10) 55%, transparent 75%)",
            filter: "blur(10px)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl text-center text-white">
        {/* Headline */}
        <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight">
          Flame
          <span className="relative inline-block">
            <span className="text-yellow-400 drop-shadow">On</span>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-1 left-0 right-0 mx-auto h-2 w-8/12 rounded-full bg-yellow-400/30 blur"
            />
          </span>
        </h1>

        <p className="mx-auto mt-4 max-w-xl sm:max-w-2xl text-base sm:text-lg md:text-xl text-gray-200">
          Street-style flavor with restaurant-grade finesse. Piping hot, made to
          order, and delivered blazing fast.
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row sm:justify-center gap-3">
          <Link
            to="/products"
            className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 px-6 py-3 sm:px-8 font-bold text-gray-900 shadow-lg shadow-orange-900/20 hover:shadow-xl hover:scale-[1.02] active:scale-[0.99] transition"
          >
            <span className="relative z-10">Explore Menu</span>
            <FaArrowRight className="relative z-10 transition group-hover:translate-x-0.5" />
            <span className="pointer-events-none absolute inset-0 -translate-x-[140%] bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 transition-transform duration-700 group-hover:translate-x-[140%]" />
          </Link>

          <a
            href="#featured"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white hover:bg-white/10 backdrop-blur transition"
          >
            Chef’s Picks
          </a>
        </div>

        {/* Trust badges */}
        <div className="mx-auto mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 max-w-md sm:max-w-3xl">
          {[
            { k: "30 min", v: "Avg. Delivery" },
            { k: "4.9 ★", v: "Foodie Rating" },
            { k: "100%", v: "Fresh Daily" },
            { k: "Top 10", v: "City’s Best" },
          ].map((item) => (
            <div
              key={item.v}
              className="rounded-xl bg-white/10 p-3 sm:p-4 text-xs sm:text-sm backdrop-blur ring-1 ring-white/15"
            >
              <p className="text-xl sm:text-2xl font-extrabold text-yellow-400">
                {item.k}
              </p>
              <p className="mt-1 text-gray-200">{item.v}</p>
            </div>
          ))}
        </div>

        {/* Safety / hygiene */}
        <div className="mt-6 inline-flex flex-wrap items-center gap-2 rounded-full bg-white/10 px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-200 backdrop-blur ring-1 ring-white/15">
          <FaShieldHeart className="text-green-400" />
          FSSAI compliant • Contactless delivery available
        </div>
      </div>
    </section>
  );
};

export default Hero;
