import { Link } from "react-router-dom";
import { FaArrowRight, FaBolt, FaShieldHeart } from "react-icons/fa6";

const Hero = () => {
  return (
    <section
      className="relative min-h-[92vh] flex items-center justify-center overflow-hidden"
      aria-label="Welcome to FlameOn"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=2400&q=80')",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
      />

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/80 via-black/60 to-black/85" />

      {/* Ambient glows (no animation, very cheap to render) */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
      >
        <div
          className="absolute -top-24 -left-24 h-[26rem] w-[26rem] rounded-full opacity-70 transform-gpu"
          style={{
            background:
              "radial-gradient(closest-side, rgba(250,204,21,0.27), rgba(250,204,21,0.10) 55%, transparent 70%)",
            filter: "blur(8px)",
          }}
        />
        <div
          className="absolute -bottom-24 -right-24 h-[30rem] w-[30rem] rounded-full opacity-60 transform-gpu"
          style={{
            background:
              "radial-gradient(closest-side, rgba(249,115,22,0.22), rgba(249,115,22,0.10) 55%, transparent 75%)",
            filter: "blur(10px)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl px-6 text-center text-white">
        {/* Headline */}
        <h1 className="mt-6 text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.05]">
          Flame
          <span className="relative inline-block">
            <span className="text-yellow-400 drop-shadow">On</span>
            {/* soft underline glow */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-1 left-0 right-0 mx-auto h-2 w-8/12 rounded-full bg-yellow-400/30 blur"
            />
          </span>
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-lg md:text-2xl text-gray-200">
          Street-style flavor with restaurant-grade finesse. Piping hot, made to
          order, and delivered blazing fast.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          {/* Shimmer button without heavy animation */}
          <Link
            to="/products"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 px-8 py-3 text-gray-900 font-bold shadow-lg shadow-orange-900/20 hover:shadow-xl hover:scale-[1.02] active:scale-[0.99] transition"
          >
            <span className="relative z-10">Explore Menu</span>
            <FaArrowRight className="relative z-10 transition group-hover:translate-x-0.5" />
            {/* shimmer sweep */}
            <span className="pointer-events-none absolute inset-0 -translate-x-[140%] bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 transition-transform duration-700 group-hover:translate-x-[140%] content-['']" />
          </Link>

          <a
            href="#featured"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white hover:bg-white/10 backdrop-blur transition"
          >
            Chef’s Picks
          </a>
        </div>

        {/* Trust badges */}
        <div className="mx-auto mt-10 grid w-full max-w-3xl grid-cols-2 gap-3 sm:grid-cols-3">
          {[
            { k: "30 min", v: "Avg. Delivery" },
            { k: "4.9 ★", v: "Foodie Rating" },
            { k: "100%", v: "Fresh Daily" },
          ].map((item) => (
            <div
              key={item.v}
              className="rounded-xl bg-white/10 p-4 text-sm backdrop-blur ring-1 ring-white/15"
            >
              <p className="text-2xl font-extrabold text-yellow-400">
                {item.k}
              </p>
              <p className="mt-1 text-gray-200">{item.v}</p>
            </div>
          ))}
        </div>

        {/* Safety / hygiene */}
        <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-gray-200 backdrop-blur ring-1 ring-white/15">
          <FaShieldHeart className="text-green-400" />
          FSSAI compliant • Contactless delivery available
        </div>
      </div>
    </section>
  );
};

export default Hero;
