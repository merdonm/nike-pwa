export default function CategoryFilter({ setCategory }) {
  return (
    <div className="flex gap-3 mb-8">
      {["All", "Running", "Casual"].map((cat) => (
        <button
          key={cat}
          onClick={() => setCategory(cat)}
          className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-sm transition"
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
