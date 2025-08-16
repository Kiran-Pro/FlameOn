export default function Highlights() {
  const items = [
    {
      title: "Fresh Ingredients",
      desc: "Only the best, locally sourced ingredients.",
      icon: "🥗",
    },
    {
      title: "Fast Delivery",
      desc: "Hot & fresh, delivered right to your door.",
      icon: "⚡",
    },
    {
      title: "Affordable Prices",
      desc: "Delicious meals that don’t break the bank.",
      icon: "💸",
    },
    {
      title: "Loved by Foodies",
      desc: "Rated 4.9/5 by our amazing customers.",
      icon: "⭐",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-10">
          Why <span className="text-yellow-500">FLameOn?</span>
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          {items.map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
