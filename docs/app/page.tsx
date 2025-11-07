import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="max-w-5xl w-full">
        <h1 className="text-5xl font-bold mb-6">Dokumentacja Mailist</h1>
        <p className="text-xl text-gray-600 mb-8">
          Kompleksowa dokumentacja platformy email marketingu Mailist
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <Link
            href="/docs/getting-started"
            className="p-6 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors"
          >
            <h3 className="text-xl font-semibold mb-2">🚀 Szybki start</h3>
            <p className="text-gray-600">Zacznij korzystać z Mailist w 5 minut</p>
          </Link>

          <Link
            href="/docs/api"
            className="p-6 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors"
          >
            <h3 className="text-xl font-semibold mb-2">📡 API Reference</h3>
            <p className="text-gray-600">Pełna dokumentacja REST API</p>
          </Link>

          <Link
            href="/docs/guides"
            className="p-6 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors"
          >
            <h3 className="text-xl font-semibold mb-2">📚 Poradniki</h3>
            <p className="text-gray-600">Szczegółowe przewodniki krok po kroku</p>
          </Link>
        </div>
      </div>
    </main>
  );
}
