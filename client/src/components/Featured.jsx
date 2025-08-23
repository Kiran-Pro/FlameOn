import { Link } from "react-router-dom";

export default function Featured() {
  const featuredItems = [
    {
      name: "Classic Cheeseburger",
      image: "https://images.unsplash.com/photo-1550317138-10000687a72b",
      price: 199,
    },
    {
      name: "Pepperoni Pizza",
      price: 299,
      image:
        "https://www.tastingtable.com/img/gallery/best-frozen-pizzas-ranked/intro-1641312916.webp",
    },
    {
      name: "Blueberry Cheesecake",
      price: 229,
      image:
        "https://www.allrecipes.com/thmb/KVEVO21SkBwAWPD-PJiehL0i9sY=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/7934-Blueberry-Cheesecake-ddmfs-107-4x3-1-b923ba1512404beaa1766396d6ce07c6.jpg",
      category: "Desserts",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-10">
          Featured <span className="text-yellow-500">Dishes</span>
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {featuredItems.map((dish) => (
            <div
              key={dish.name}
              className="relative bg-gray-50 rounded-xl shadow-md hover:shadow-xl transition overflow-hidden"
            >
              <div className="absolute top-3 left-3 bg-yellow-500 text-white px-3 py-1 text-sm rounded-full shadow">
                Featured
              </div>

              <img
                src={dish.image}
                alt={dish.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{dish.name}</h3>
                <p className="text-yellow-600 font-bold">
                  ₹{dish.price.toLocaleString("en-IN")}
                </p>
              </div>
            </div>
          ))}
        </div>
        <Link
          to="/products"
          className="mt-10 inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-8 py-3 rounded-full font-semibold shadow hover:scale-105 transition transform"
        >
          View Full Menu
        </Link>
      </div>
    </section>
  );
}
