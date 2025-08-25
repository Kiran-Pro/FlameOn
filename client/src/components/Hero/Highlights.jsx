import { FaBowlFood, FaBolt, FaWallet, FaStar } from "react-icons/fa6";

export default function Highlights() {
  const items = [
    {
      title: "Fresh Ingredients",
      desc: "Locally sourced veggies, daily-cut meats & house sauces.",
      icon: <FaBowlFood className="h-6 w-6 sm:h-7 sm:w-7" />,
      accent: "from-green-400 to-emerald-500",
    },
    {
      title: "Fast Delivery",
      desc: "Your order lands hot in ~30 minutes on average.",
      icon: <FaBolt className="h-6 w-6 sm:h-7 sm:w-7" />,
      accent: "from-yellow-400 to-orange-500",
    },
    {
      title: "Pocket Friendly",
      desc: "Premium taste without premium pricing.",
      icon: <FaWallet className="h-6 w-6 sm:h-7 sm:w-7" />,
      accent: "from-sky-400 to-indigo-500",
    },
    {
      title: "Loved by Foodies",
      desc: "4.9/5 rating across 2k+ happy customers.",
      icon: <FaStar className="h-6 w-6 sm:h-7 sm:w-7" />,
      accent: "from-orange-400 to-pink-500",
    },
  ];

  return (
    <section className="relative py-12 sm:py-16">
      {/* Soft background + dot texture */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50" />
        <div className="absolute inset-0 opacity-[0.35] bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.06)_1px,transparent_1px)] bg-[length:16px_16px]" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900">
            Why <span className="text-yellow-500">FlameOn?</span>
          </h2>
          <p className="mt-3 text-gray-600 text-sm sm:text-base">
            We obsess over freshness, speed, and flavor—so your cravings get the
            VIP treatment, every single time.
          </p>
        </div>

        {/* Cards Grid */}
        <div
          role="list"
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {items.map(({ title, desc, icon, accent }) => (
            <div
              role="listitem"
              key={title}
              className="group relative h-full rounded-2xl"
            >
              {/* Hover glow */}
              <div
                className={`pointer-events-none absolute -inset-[1px] -z-10 rounded-2xl opacity-0 blur-md transition duration-500 group-hover:opacity-100 bg-gradient-to-br ${accent}`}
              />

              {/* Card body */}
              <div className="h-full rounded-2xl bg-white p-5 sm:p-6 shadow-sm ring-1 ring-gray-100 transition duration-300 group-hover:-translate-y-1 group-hover:shadow-xl motion-reduce:transform-none">
                {/* Icon capsule */}
                <div
                  className={`mx-auto flex h-12 w-12 items-center justify-center rounded-xl text-white shadow-sm ring-1 ring-black/5 bg-gradient-to-br ${accent}`}
                  aria-hidden="true"
                >
                  {icon}
                </div>

                {/* Title */}
                <h3 className="mt-4 text-base sm:text-lg font-semibold text-gray-900">
                  {title}
                </h3>
                <div
                  className={`mt-2 h-1 w-8 sm:w-10 rounded-full bg-gradient-to-r ${accent} opacity-70 group-hover:opacity-100 transition`}
                  aria-hidden="true"
                />

                {/* Description */}
                <p className="mt-3 text-gray-600 text-sm sm:text-base">
                  {desc}
                </p>
              </div>

              {/* Corner sheen */}
              <div className="pointer-events-none absolute -top-1 -right-1 h-16 w-16 sm:h-20 sm:w-20 rounded-bl-[3rem] bg-gradient-to-br from-white/80 to-transparent opacity-0 transition duration-300 group-hover:opacity-60" />
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="pointer-events-none absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
    </section>
  );
}
