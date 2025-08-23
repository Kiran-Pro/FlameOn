function Input({ icon: Icon, ...props }) {
  return (
    <label className="relative block">
      {Icon && (
        <Icon className="absolute left-3 top-3.5 text-gray-400" size={18} />
      )}
      <input
        {...props}
        className="w-full bg-white/20 border border-white/30 rounded-lg pl-10 pr-4 py-3 
        text-white placeholder-gray-300 focus:ring-2 focus:ring-yellow-400 outline-none"
      />
    </label>
  );
}

export default Input;
