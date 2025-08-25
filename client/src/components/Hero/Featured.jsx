import { Link } from "react-router-dom";
import { FaFireFlameCurved } from "react-icons/fa6";

export default function Featured() {
  const featuredItems = [
    {
      name: "Classic Cheeseburger",
      image: "https://images.unsplash.com/photo-1550317138-10000687a72b",
      price: 199,
      tag: "Best Seller",
    },
    {
      name: "Pepperoni Pizza",
      price: 299,
      image:
        "https://www.tastingtable.com/img/gallery/best-frozen-pizzas-ranked/intro-1641312916.webp",
      tag: "Wood-Fired",
    },
    {
      name: "Blueberry Cheesecake",
      price: 229,
      image:
        "https://www.allrecipes.com/thmb/KVEVO21SkBwAWPD-PJiehL0i9sY=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/7934-Blueberry-Cheesecake-ddmfs-107-4x3-1-b923ba1512404beaa1766396d6ce07c6.jpg",
      tag: "Chef’s Pick",
    },
  ];

  return (
    <section id="featured" className="bg-gray-50 py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-yellow-100 px-3 py-1 text-yellow-800 text-xs sm:text-sm font-semibold">
            <FaFireFlameCurved /> Trending Now
          </span>
          <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900">
            Featured <span className="text-yellow-500">Dishes</span>
          </h2>
          <p className="mt-2 text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
            Handpicked crowd-favorites—perfect for first-timers and regulars
            alike.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredItems.map((dish) => (
            <article
              key={dish.name}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 transition hover:shadow-2xl hover:-translate-y-1"
            >
              {/* Tag */}
              <div className="absolute left-3 top-3 z-10 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 px-3 py-1 text-xs sm:text-sm font-bold text-gray-900 shadow">
                {dish.tag || "Featured"}
              </div>

              {/* Image */}
              <div className="relative">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="h-40 sm:h-48 md:h-56 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>

              {/* Card Content */}
              <div className="p-4 sm:p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                    {dish.name}
                  </h3>
                  <span className="shrink-0 rounded-full bg-yellow-100 px-3 py-1 text-xs sm:text-sm font-bold text-yellow-800">
                    ₹{dish.price.toLocaleString("en-IN")}
                  </span>
                </div>

                {/* Footer */}
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-xs sm:text-sm text-gray-500">
                    Est.{" "}
                    <span className="font-semibold text-gray-700">
                      25–35 min
                    </span>
                  </div>
                  <Link
                    to="/products"
                    className="rounded-full border border-gray-200 bg-white px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-gray-900 hover:border-yellow-400 hover:bg-yellow-50 transition"
                    aria-label={`View more ${dish.name} and similar dishes`}
                  >
                    View More
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <Link
            to="/products"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-bold text-gray-900 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.99] transition"
          >
            View Full Menu
          </Link>
        </div>
      </div>
    </section>
  );
}
