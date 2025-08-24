export default function Forbidden() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4">
      <h1 className="text-6xl font-extrabold text-red-500">403</h1>
      <h2 className="text-2xl font-bold text-gray-800 mt-2">Access Denied</h2>
      <p className="text-gray-600 mt-2">
        You don’t have permission to view this page.
      </p>
      <a
        href="/"
        className="mt-6 px-6 py-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600 transition"
      >
        Go Home
      </a>
    </div>
  );
}
