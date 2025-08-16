import { Link } from "react-router-dom";

export default function Featured() {
  const featuredItems = [
    {
      name: "Classic Cheeseburger",
      image: "https://images.unsplash.com/photo-1550317138-10000687a72b",
      price: "₹199",
    },
    {
      name: "Pepperoni Pizza",
      image: "https://images.unsplash.com/photo-1601924638867-3ec2c8fef8d5",
      price: "₹299",
    },
    {
      name: "Chocolate Milkshake",
      image: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f",
      price: "₹149",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-10">
          Featured <span className="text-yellow-500">Dishes</span>
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {featuredItems.map((dish) => (
            <div
              key={dish.name}
              className="bg-gray-50 rounded-xl shadow-md hover:shadow-xl transition overflow-hidden"
            >
              <img
                src={dish.image}
                alt={dish.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{dish.name}</h3>
                <p className="text-yellow-600 font-bold">{dish.price}</p>
              </div>
            </div>
          ))}
        </div>
        <Link
          to="/products"
          className="mt-10 inline-block bg-yellow-500 text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-yellow-400 transition"
        >
          View Full Menu
        </Link>
      </div>
    </section>
  );
}
