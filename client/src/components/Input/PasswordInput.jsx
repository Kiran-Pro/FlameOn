import { FiLock, FiEye, FiEyeOff } from "react-icons/fi";

function PasswordInput({ name, value, onChange, placeholder, show, setShow }) {
  return (
    <label className="relative block">
      <FiLock className="absolute left-3 top-3.5 text-gray-400" size={18} />
      <input
        type={show ? "text" : "password"}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className="w-full bg-white/20 border border-white/30 rounded-lg pl-10 pr-10 py-3 text-white placeholder-gray-300 focus:ring-2 focus:ring-yellow-400 outline-none"
      />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        className="absolute right-3 top-3.5 text-gray-300 hover:text-white"
      >
        {show ? <FiEyeOff size={18} /> : <FiEye size={18} />}
      </button>
    </label>
  );
}

export default PasswordInput;
