import { Salad, Zap, Wallet, Star } from "lucide-react";

export default function Highlights() {
  const items = [
    {
      title: "Fresh Ingredients",
      desc: "Only the best, locally sourced ingredients.",
      icon: <Salad size={36} className="text-green-500" />,
    },
    {
      title: "Fast Delivery",
      desc: "Hot & fresh, delivered right to your door.",
      icon: <Zap size={36} className="text-yellow-500" />,
    },
    {
      title: "Affordable Prices",
      desc: "Delicious meals that don’t break the bank.",
      icon: <Wallet size={36} className="text-blue-500" />,
    },
    {
      title: "Loved by Foodies",
      desc: "Rated 4.9/5 by our amazing customers.",
      icon: <Star size={36} className="text-orange-500" />,
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-10">
          Why <span className="text-yellow-500">FlameOn?</span>
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          {items.map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl hover:-translate-y-2 transition"
            >
              <div className="mb-4 flex justify-center">{item.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
