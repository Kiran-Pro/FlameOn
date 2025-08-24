import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section
      className="relative h-[95vh] flex items-center justify-center text-center text-white overflow-hidden"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"></div>
      <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-400/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-24 right-12 w-28 h-28 bg-red-500/20 rounded-full blur-3xl animate-ping"></div>

      <div className="relative z-10 max-w-3xl px-4">
        <h1 className="text-6xl md:text-7xl font-extrabold drop-shadow-xl tracking-wide">
          Flame<span className="text-yellow-400">On</span>
        </h1>
        <p className="mt-6 text-xl md:text-2xl text-gray-200 font-light italic animate-fadeIn">
          Your one stop destination for the best food in town.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-6">
          <Link
            to="/products"
            className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-8 py-3 rounded-full font-bold shadow-lg hover:scale-105 transition transform"
          >
            Explore Menu
          </Link>
        </div>
      </div>

      <div className="absolute bottom-0 w-full h-48 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
    </section>
  );
};

export default Hero;
