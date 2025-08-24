import { FaFire } from "react-icons/fa";

export default function FlameLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <FaFire
        className="text-orange-500 animate-pulse"
        size={64}
        style={{
          filter: "drop-shadow(0 0 10px #f97316)",
        }}
      />
    </div>
  );
}
